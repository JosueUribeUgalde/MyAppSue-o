/**
 * PALETA DE COLORES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todos los colores utilizados en la app.
 * Facilita el mantenimiento y permite cambiar el tema fácilmente.
 * Uso: import { COLORS, DARK_COLORS } from '@/constants';
 */

// TEMA CLARO (DEFAULT)
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

// TEMA OSCURO
export const DARK_COLORS = {
  // Colores primarios - Morado principal (más vibrantes en oscuro)
  primary: '#A5A9C5',        // Morado lavanda más claro
  primaryDark: '#6B6F8A',    // Morado medio
  primaryLight: '#C5C9DD',   // Morado muy claro
  
  // Colores secundarios
  secondary: '#4DA3C4',      // Azul cian más claro
  secondaryDark: '#0179A5',  // Azul medio
  secondaryLight: '#7BC3DC', // Azul muy claro
  
  // Colores de fondo
  background: '#0F0F1E',     // Fondo principal muy oscuro
  backgroundDark: '#0A0A15', // Fondo aún más oscuro
  surface: '#1A1A2E',        // Superficie de tarjetas oscura
  surfaceDark: '#16213E',    // Superficie más oscura
  
  // Colores de texto
  text: '#E8EAED',           // Texto principal claro
  textSecondary: '#9CA3AF',  // Texto secundario gris
  textLight: '#FFFFFF',      // Texto muy claro
  textDark: '#6B7280',       // Texto oscuro/deshabilitado
  
  // Colores de acento
  accent: '#F5C563',         // Amarillo dorado más brillante
  accentDark: '#E2B95C',     // Dorado medio
  coral: '#E87D72',          // Coral más brillante
  
  // Estados
  success: '#34D399',        // Verde más brillante
  warning: '#FBBF24',        // Amarillo advertencia brillante
  error: '#F87171',          // Rojo más brillante
  info: '#60A5FA',           // Azul información brillante
  
  // Sueño específico
  deepSleep: '#8B8FB0',      // Sueño profundo más claro
  lightSleep: '#C5C9DD',     // Sueño ligero muy claro
  rem: '#A5A9C5',            // Sueño REM
  awake: '#F5C563',          // Despierto dorado brillante
  
  // Utilidades
  border: '#374151',         // Bordes grises oscuros
  disabled: '#6B7280',       // Elementos deshabilitados
  shadow: '#000000',         // Sombras
  overlay: 'rgba(0,0,0,0.7)', // Overlay más oscuro
  
  // Gradientes
  gradientNight: ['#0A0A15', '#1A1A2E', '#6B6F8A'],
  gradientDay: ['#6B6F8A', '#969AB4', '#E2B95C'],
};
