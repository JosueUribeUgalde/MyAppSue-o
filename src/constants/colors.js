/**
 * PALETA DE COLORES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todos los colores utilizados en la app.
 * Facilita el mantenimiento y permite cambiar el tema fácilmente.
 * Uso: import { COLORS } from '@/constants';
 */

export const COLORS = {
  // Colores primarios - Tema de sueño/noche
  primary: '#4A90E2',        // Azul principal
  primaryDark: '#2E5C8A',    // Azul oscuro
  primaryLight: '#7CB9F5',   // Azul claro
  
  // Colores secundarios
  secondary: '#9B59B6',      // Púrpura (relacionado con sueño)
  secondaryDark: '#6C3483',  // Púrpura oscuro
  secondaryLight: '#D7BDE2', // Púrpura claro
  
  // Colores de fondo
  background: '#F5F7FA',     // Fondo principal claro
  backgroundDark: '#1A1A2E', // Fondo oscuro (modo noche)
  surface: '#FFFFFF',        // Superficie de tarjetas
  surfaceDark: '#16213E',    // Superficie oscura
  
  // Colores de texto
  text: '#2C3E50',           // Texto principal
  textSecondary: '#7F8C8D',  // Texto secundario
  textLight: '#FFFFFF',      // Texto claro
  textDark: '#1A1A1A',       // Texto muy oscuro
  
  // Estados
  success: '#27AE60',        // Verde - éxito
  warning: '#F39C12',        // Naranja - advertencia
  error: '#E74C3C',          // Rojo - error
  info: '#3498DB',           // Azul - información
  
  // Sueño específico
  deepSleep: '#2C3E50',      // Sueño profundo
  lightSleep: '#7CB9F5',     // Sueño ligero
  rem: '#9B59B6',            // Sueño REM
  awake: '#F39C12',          // Despierto
  
  // Utilidades
  border: '#E0E0E0',         // Bordes
  disabled: '#BDC3C7',       // Elementos deshabilitados
  overlay: 'rgba(0,0,0,0.5)', // Overlay semi-transparente
  
  // Gradientes (arrays para uso con LinearGradient)
  gradientNight: ['#1A1A2E', '#16213E', '#0F3460'],
  gradientDay: ['#4A90E2', '#7CB9F5', '#B8E6FF'],
};
