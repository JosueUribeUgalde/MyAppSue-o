/**
 * SERVICIO: SEGUIMIENTO DE SUEÑO
 * * Maneja toda la lógica relacionada con los datos de sueño en Firestore.
 * CRUD completo para registros de sueño del usuario.
 * * Funciones disponibles:
 * - saveSleepRecord: Guardar un registro de sueño
 * - getSleepRecords: Obtener registros del usuario
 * - updateSleepRecord: Actualizar un registro
 * - deleteSleepRecord: Eliminar un registro
 * - getWeeklyStats: Obtener estadísticas semanales
 */

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';
// ✅ CORREGIDO: Se cambia el nombre del import si tu archivo pasó a llamarse claudeService o se mantiene geminiService pero con la lógica interna de Claude
import { generarTipConIA } from './geminiService';

const SLEEP_COLLECTION = 'registros_sueno';

/**
 * Convierte cadenas como "7h 30m" o "6h" a número decimal de horas
 */
const parsearHoras = (horasTotales) => {
    if (!horasTotales) return 0;
    const match = String(horasTotales).match(/(\d+)h\s*(\d*)m?/);
    if (!match) return parseFloat(horasTotales) || 0;
    const horas = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    return horas + minutes / 60;
};

/**
 * Guardar un nuevo registro de sueño (Versión Original / Retrocompatibilidad)
 * Corregido para usar 'id_usuario' en lugar de 'userId' y no romper las consultas
 */
export const saveSleepRecord = async (userId, sleepData) => {
    try {
        const sleepRecord = {
            id_usuario: userId, // <-- Cambiado a id_usuario para unificar tu base de datos
            bedTime: sleepData.bedTime || '',
            wakeTime: sleepData.wakeTime || '',
            duration: sleepData.duration || 0,
            quality: sleepData.quality || null,
            notes: sleepData.notes || '',
            createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, SLEEP_COLLECTION), sleepRecord);
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Obtener todos los registros de sueño de un usuario
 */
export const getSleepRecords = async (userId, limit = 30) => {
    try {
        const q = query(
            collection(db, SLEEP_COLLECTION),
            where('id_usuario', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        const records = [];

        querySnapshot.forEach((docSnap) => {
            records.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Ordenar por fecha_creacion descendente en el cliente
        records.sort((a, b) => {
            const dateA = a.fecha_creacion?.toDate?.() ?? new Date(a.fecha_creacion ?? 0);
            const dateB = b.fecha_creacion?.toDate?.() ?? new Date(b.fecha_creacion ?? 0);
            return dateB - dateA;
        });

        return { success: true, data: records };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Actualizar un registro de sueño existente
 */
export const updateSleepRecord = async (recordId, updates) => {
    try {
        const recordRef = doc(db, SLEEP_COLLECTION, recordId);
        await updateDoc(recordRef, {
            ...updates,
            updatedAt: Timestamp.now(),
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Eliminar un registro de sueño
 */
export const deleteSleepRecord = async (recordId) => {
    try {
        await deleteDoc(doc(db, SLEEP_COLLECTION, recordId));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Calcular estadísticas semanales de sueño
 */
export const calculateWeeklyStats = (records) => {
    if (!records || records.length === 0) {
        return {
            averageDuration: 0,
            averageQuality: 0,
            totalNights: 0,
        };
    }

    const totalDuration = records.reduce((sum, record) => sum + parsearHoras(record.horas_totales), 0);
    const totalQuality = records.reduce((sum, record) => sum + (record.id_calidad || 0), 0);

    return {
        averageDuration: (totalDuration / records.length).toFixed(1),
        averageQuality: (totalQuality / records.length).toFixed(1),
        totalNights: records.length,
    };
};

/**
 * Verificar si ya existe un registro para una fecha específica
 */
export const verificarRegistroDuplicado = async (userId, fechaSueno) => {
    try {
        const q = query(
            collection(db, SLEEP_COLLECTION),
            where('id_usuario', '==', userId),
            where('fecha_sueno', '==', fechaSueno)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const registro = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
            return { success: true, existe: true, registro };
        }

        return { success: true, existe: false, registro: null };
    } catch (error) {
        console.error("Error al verificar duplicados:", error);
        return { success: false, error: error.message, existe: false };
    }
};

/**
 * Guardar registro de sueño con el modelo completo e integración de Claude IA (vía service wrapper)
 */
export const guardarRegistroSueno = async (datosDelFormulario) => {
    try {
        const usuarioActual = auth.currentUser;
        if (!usuarioActual) {
            throw new Error("No hay usuario autenticado");
        }

        // 1. Extraemos y preparamos las variables limpias para la IA
        const horasNumericas = parsearHoras(datosDelFormulario.horas_totales);
        const metaDeSuenoUsuario = 8;
        const calidadTexto = datosDelFormulario.calidad_texto || "Regular";

        console.log("🤖 [sleepService] Solicitando análisis a Claude...");

        // 2. Ejecutamos la petición de IA pasando la fecha del formulario para resolver el bug del caché duplicado
        let tipGeneradoPorIA = "";
        try {
            // ✅ CORREGIDO: Se inyecta 'datosDelFormulario.fecha_sueno' como 4to parámetro
            tipGeneradoPorIA = await generarTipConIA(
                horasNumericas,
                metaDeSuenoUsuario,
                calidadTexto,
                datosDelFormulario.fecha_sueno
            );
        } catch (iaError) {
            console.warn("⚠️ Error al generar tip con IA, se guardará el registro sin tip:", iaError);
            tipGeneradoPorIA = "¡Buen intento! Recuerda mantener un horario de sueño constante.";
        }

        // 3. Guardamos el documento mapeando los campos EXACTAMENTE a tu modelo unificado
        const refColeccion = collection(db, SLEEP_COLLECTION);
        const docRef = await addDoc(refColeccion, {
            id_usuario: usuarioActual.uid,
            fecha_sueno: datosDelFormulario.fecha_sueno,
            hora_dormir: datosDelFormulario.hora_dormir,
            hora_despertar: datosDelFormulario.hora_despertar,
            horas_totales: datosDelFormulario.horas_totales,
            id_calidad: datosDelFormulario.id_calidad,
            calidad_texto: datosDelFormulario.calidad_texto,
            calidad_emoji: datosDelFormulario.calidad_emoji,
            notas: datosDelFormulario.notas || "",
            recomendacion_tip: tipGeneradoPorIA, // <-- Se guarda la recomendación exclusiva de esta noche
            origen: "app_movil",
            fecha_creacion: serverTimestamp(),
            fecha_actualizacion: serverTimestamp()
        });

        console.log("¡Registro guardado con éxito! ID: ", docRef.id) ;
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error al guardar en la base de datos: ", error);
        return { success: false, error: error.message };
    }
};