/**
 * UTILIDADES: Funciones de ayuda generales
 * 
 * Funciones auxiliares reutilizables en toda la aplicación.
 * Facilita la lógica común y evita duplicación de código.
 */

import { COLORS } from '../constants';

/**
 * Formatear una fecha a string legible
 * @param {Date|Timestamp} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = date.toDate ? date.toDate() : new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('es-ES', options);
};

/**
 * Formatear hora a string (HH:MM)
 * @param {Date|Timestamp} time - Hora a formatear
 * @returns {string} - Hora formateada
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  const t = time.toDate ? time.toDate() : new Date(time);
  return t.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Calcular duración de sueño en horas
 * @param {Date} bedTime - Hora de dormir
 * @param {Date} wakeTime - Hora de despertar
 * @returns {number} - Duración en horas
 */
export const calculateSleepDuration = (bedTime, wakeTime) => {
  if (!bedTime || !wakeTime) return 0;
  
  const bed = new Date(bedTime);
  const wake = new Date(wakeTime);
  const diff = wake - bed;
  const hours = diff / (1000 * 60 * 60);
  
  return Math.max(0, hours);
};

/**
 * Formatear duración en horas a string legible
 * @param {number} hours - Duración en horas
 * @returns {string} - String formateado (ej: "7.5h")
 */
export const formatDuration = (hours) => {
  if (!hours) return '0h';
  return `${hours.toFixed(1)}h`;
};

/**
 * Obtener color según la calidad del sueño
 * @param {number} quality - Calidad del sueño (0-100)
 * @returns {string} - Color hexadecimal
 */
export const getQualityColor = (quality) => {
  if (quality >= 80) return COLORS.success;
  if (quality >= 60) return COLORS.warning;
  return COLORS.error;
};

/**
 * Truncar texto largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Validar si una fecha es de hoy
 * @param {Date} date - Fecha a validar
 * @returns {boolean} - True si es hoy
 */
export const isToday = (date) => {
  const today = new Date();
  const checkDate = date.toDate ? date.toDate() : new Date(date);
  
  return today.toDateString() === checkDate.toDateString();
};

/**
 * Obtener saludo según la hora del día
 * @returns {string} - Saludo apropiado
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return '¡Buenos días!';
  if (hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
};
