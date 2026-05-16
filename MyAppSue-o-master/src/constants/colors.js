/**
 * PALETA DE COLORES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todos los colores utilizados en la app.
 * Facilita el mantenimiento y permite cambiar el tema fácilmente.
 * Uso: import { COLORS } from '@/constants';
 */

export const COLORS = {
  // Colores primarios - Morado principal
  primary: '#969AB4',        // Morado lavanda principal
  primaryDark: '#6B6F8A',    // Morado oscuro
  primaryLight: '#B8BCCE',   // Morado claro
  
  // Colores secundarios
  secondary: '#0179A5',      // Azul cian
  secondaryDark: '#015A7F',  // Azul oscuro
  secondaryLight: '#4DA3C4', // Azul claro
  
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
  
  // Colores de acento
  accent: '#E2B95C',         // Amarillo dorado
  accentDark: '#C49A3D',     // Dorado oscuro
  coral: '#D4655B',          // Coral/rojo suave
  
  // Estados
  success: '#27AE60',        // Verde - éxito
  warning: '#E2B95C',        // Amarillo dorado - advertencia
  error: '#D4655B',          // Coral - error
  info: '#0179A5',           // Azul cian - información
  
  // Sueño específico
  deepSleep: '#6B6F8A',      // Sueño profundo (morado oscuro)
  lightSleep: '#B8BCCE',     // Sueño ligero (morado claro)
  rem: '#969AB4',            // Sueño REM (morado principal)
  awake: '#E2B95C',          // Despierto (amarillo dorado)
  
  // Utilidades
  border: '#E0E0E0',         // Bordes
  disabled: '#BDC3C7',       // Elementos deshabilitados
  shadow: '#000000',         // Sombras
  overlay: 'rgba(0,0,0,0.5)', // Overlay semi-transparente
  
  // Gradientes (arrays para uso con LinearGradient)
  gradientNight: ['#1A1A2E', '#6B6F8A', '#969AB4'],
  gradientDay: ['#969AB4', '#B8BCCE', '#E2B95C'],
};
