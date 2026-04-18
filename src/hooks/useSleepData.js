/**
 * HOOK: useSleepData
 * 
 * Hook personalizado para gestionar datos de sueño del usuario.
 * Proporciona acceso a registros y funciones CRUD.
 * 
 * Retorna:
 * - records: Array de registros de sueño
 * - loading: Estado de carga
 * - error: Mensaje de error si existe
 * - addRecord: Función para agregar registro
 * - updateRecord: Función para actualizar registro
 * - deleteRecord: Función para eliminar registro
 * - refreshRecords: Función para recargar datos
 * - stats: Estadísticas calculadas
 */

import { useState, useEffect } from 'react';
import {
  getSleepRecords,
  saveSleepRecord,
  updateSleepRecord,
  deleteSleepRecord,
  calculateWeeklyStats,
} from '../services/sleepService';

export const useSleepData = (userId) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Cargar registros al montar el componente
  useEffect(() => {
    if (userId) {
      loadRecords();
    }
  }, [userId]);

  // Recalcular estadísticas cuando cambien los registros
  useEffect(() => {
    if (records.length > 0) {
      const calculatedStats = calculateWeeklyStats(records);
      setStats(calculatedStats);
    }
  }, [records]);

  const loadRecords = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getSleepRecords(userId);
    
    if (result.success) {
      setRecords(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const addRecord = async (sleepData) => {
    const result = await saveSleepRecord(userId, sleepData);
    
    if (result.success) {
      await loadRecords(); // Recargar registros
    }
    
    return result;
  };

  const updateRecord = async (recordId, updates) => {
    const result = await updateSleepRecord(recordId, updates);
    
    if (result.success) {
      await loadRecords(); // Recargar registros
    }
    
    return result;
  };

  const deleteRecord = async (recordId) => {
    const result = await deleteSleepRecord(recordId);
    
    if (result.success) {
      await loadRecords(); // Recargar registros
    }
    
    return result;
  };

  const refreshRecords = () => {
    loadRecords();
  };

  return {
    records,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    refreshRecords,
    stats,
  };
};
