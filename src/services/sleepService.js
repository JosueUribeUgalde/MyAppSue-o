/**
 * SERVICIO: SEGUIMIENTO DE SUEÑO
 * 
 * Maneja toda la lógica relacionada con los datos de sueño en Firestore.
 * CRUD completo para registros de sueño del usuario.
 * 
 * Funciones disponibles:
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

const SLEEP_COLLECTION = 'registros_sueno'; // Colección según tu modelo

/**
 * Guardar un nuevo registro de sueño
 * @param {string} userId - ID del usuario
 * @param {Object} sleepData - Datos del sueño
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const saveSleepRecord = async (userId, sleepData) => {
  try {
    const sleepRecord = {
      userId,
      bedTime: sleepData.bedTime,
      wakeTime: sleepData.wakeTime,
      duration: sleepData.duration, // en horas
      quality: sleepData.quality || null, // 1-100
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
 * @param {string} userId - ID del usuario
 * @param {number} limit - Límite de registros (opcional)
 * @returns {Promise<Object>} - Registros de sueño
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
 * @param {string} recordId - ID del registro
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object>} - Resultado de la operación
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
 * @param {string} recordId - ID del registro
 * @returns {Promise<Object>} - Resultado de la operación
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
 * @param {Array} records - Array de registros de sueño
 * @returns {Object} - Estadísticas calculadas
 */
// Convierte cadenas como "7h 30m" o "6h" a número de horas
const parsearHoras = (horasTotales) => {
  if (!horasTotales) return 0;
  const match = String(horasTotales).match(/(\d+)h\s*(\d*)m?/);
  if (!match) return parseFloat(horasTotales) || 0;
  const horas = parseInt(match[1]) || 0;
  const minutos = parseInt(match[2]) || 0;
  return horas + minutos / 60;
};

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
 * @param {string} userId - ID del usuario
 * @param {string} fechaSueno - Fecha en formato YYYY-MM-DD
 * @returns {Promise<Object>} - { existe: boolean, registro: Object|null }
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
 * Guardar registro de sueño con el modelo completo
 * Función adaptada al modelo de base de datos especificado
 * @param {Object} datosDelFormulario - Datos del formulario de sueño
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const guardarRegistroSueno = async (datosDelFormulario) => {
  try {
    // 1. Verificamos que haya un usuario logueado (requerido por tu modelo)
    const usuarioActual = auth.currentUser;
    if (!usuarioActual) {
      throw new Error("No hay usuario autenticado");
    }

    // 2. Apuntamos a la colección 'registros_sueno'
    // Firestore creará esta colección automáticamente si no existe
    const refColeccion = collection(db, "registros_sueno");

    // 3. Guardamos el documento mapeando los campos EXACTAMENTE a tu modelo
    const docRef = await addDoc(refColeccion, {
      id_usuario: usuarioActual.uid, // ID seguro de Auth
      fecha_sueno: datosDelFormulario.fecha_sueno,
      hora_dormir: datosDelFormulario.hora_dormir,
      hora_despertar: datosDelFormulario.hora_despertar,
      horas_totales: datosDelFormulario.horas_totales,
      id_calidad: datosDelFormulario.id_calidad,
      calidad_texto: datosDelFormulario.calidad_texto,
      calidad_emoji: datosDelFormulario.calidad_emoji,
      notas: datosDelFormulario.notas || "",
      origen: "app_movil",
      fecha_creacion: serverTimestamp(), // Hora exacta controlada por el servidor
      fecha_actualizacion: serverTimestamp()
    });

    console.log("¡Registro guardado con éxito! ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al guardar en la base de datos: ", error);
    return { success: false, error: error.message };
  }
};
