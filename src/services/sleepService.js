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
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const SLEEP_COLLECTION = 'sleepRecords';

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
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const records = [];
    
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
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
export const calculateWeeklyStats = (records) => {
  if (!records || records.length === 0) {
    return {
      averageDuration: 0,
      averageQuality: 0,
      totalNights: 0,
    };
  }

  const totalDuration = records.reduce((sum, record) => sum + (record.duration || 0), 0);
  const totalQuality = records.reduce((sum, record) => sum + (record.quality || 0), 0);

  return {
    averageDuration: (totalDuration / records.length).toFixed(1),
    averageQuality: Math.round(totalQuality / records.length),
    totalNights: records.length,
  };
};
