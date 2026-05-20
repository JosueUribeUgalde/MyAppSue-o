/**
 * PALETA DE COLORES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todos los colores utilizados en la app.
 * Facilita el mantenimiento y permite cambiar el tema fácilmente.
 * Uso: import { COLORS, DARK_COLORS } from '@/constants';
 */

// TEMA CLARO (DEFAULT)
export const COLORS = {
  // Colores primarios
  primary: '#22313F',
  primaryDark: '#121A22',
  primaryLight: '#E8EEF0',
  
  // Colores secundarios
  secondary: '#3E8E86',
  secondaryDark: '#286D67',
  secondaryLight: '#DDF2EF',
  
  // Colores de fondo
  background: '#F7F8F4',
  backgroundDark: '#111315',
  surface: '#FFFFFF',
  surfaceDark: '#1C2023',
  surfaceElevated: '#FFFFFF',
  
  // Colores de texto
  text: '#1C252C',
  textSecondary: '#66727B',
  textLight: '#FFFFFF',
  textDark: '#101315',
  
  // Colores de acento
  accent: '#D6A843',
  accentDark: '#A77B1D',
  coral: '#C96B5A',
  
  // Estados
  success: '#2E8B57',
  warning: '#D6A843',
  error: '#C96B5A',
  info: '#3E8E86',
  
  // Sueño específico
  deepSleep: '#4A465F',
  lightSleep: '#CAD7D4',
  rem: '#7F76A8',
  awake: '#D6A843',
  
  // Utilidades
  border: '#E2E7E5',
  borderStrong: '#C7D0CC',
  disabled: '#C6CCC9',
  shadow: '#16201E',
  overlay: 'rgba(0,0,0,0.5)', // Overlay semi-transparente
  
  // Gradientes (arrays para uso con LinearGradient)
  gradientNight: ['#101315', '#22313F', '#3E8E86'],
  gradientDay: ['#22313F', '#3E8E86', '#D6A843'],
};

// TEMA OSCURO
export const DARK_COLORS = {
  // Colores primarios
  primary: '#68B7AE',
  primaryDark: '#3E8E86',
  primaryLight: '#203A38',
  
  // Colores secundarios
  secondary: '#68B7AE',
  secondaryDark: '#3E8E86',
  secondaryLight: '#203A38',
  
  // Colores de fondo
  background: '#101112',
  backgroundDark: '#08090A',
  surface: '#181A1B',
  surfaceDark: '#111315',
  surfaceElevated: '#202326',
  
  // Colores de texto
  text: '#F1F0EA',
  textSecondary: '#A9B0AD',
  textLight: '#FFFFFF',
  textDark: '#111315',
  
  // Colores de acento
  accent: '#E0B85A',
  accentDark: '#B88F31',
  coral: '#E08473',
  
  // Estados
  success: '#34D399',        // Verde más brillante
  warning: '#FBBF24',        // Amarillo advertencia brillante
  error: '#F87171',          // Rojo más brillante
  info: '#60A5FA',           // Azul información brillante
  
  // Sueño específico
  deepSleep: '#8A83B7',
  lightSleep: '#68B7AE',
  rem: '#B3A8D8',
  awake: '#E0B85A',
  
  // Utilidades
  border: '#2D3336',
  borderStrong: '#465056',
  disabled: '#687075',
  shadow: '#000000',         // Sombras
  overlay: 'rgba(0,0,0,0.7)', // Overlay más oscuro
  
  // Gradientes
  gradientNight: ['#08090A', '#181A1B', '#3E8E86'],
  gradientDay: ['#EDEBE4', '#68B7AE', '#E0B85A'],
};

export const INTERFACE_COLOR_OPTIONS = [
  {
    id: 'ocean',
    label: 'Océano',
    light: {
      primary: '#22313F',
      primaryDark: '#121A22',
      primaryLight: '#E8EEF0',
      secondary: '#3E8E86',
      secondaryDark: '#286D67',
      secondaryLight: '#DDF2EF',
      info: '#3E8E86',
      gradientNight: ['#101315', '#22313F', '#3E8E86'],
      gradientDay: ['#22313F', '#3E8E86', '#D6A843'],
    },
    dark: {
      primary: '#68B7AE',
      primaryDark: '#3E8E86',
      primaryLight: '#203A38',
      secondary: '#68B7AE',
      secondaryDark: '#3E8E86',
      secondaryLight: '#203A38',
      info: '#68B7AE',
      gradientNight: ['#08090A', '#181A1B', '#3E8E86'],
      gradientDay: ['#EDEBE4', '#68B7AE', '#E0B85A'],
    },
  },
  {
    id: 'lavender',
    label: 'Lavanda',
    light: {
      primary: '#4D4368',
      primaryDark: '#2D263E',
      primaryLight: '#ECE8F4',
      secondary: '#7F76A8',
      secondaryDark: '#5D5481',
      secondaryLight: '#EFECF7',
      info: '#7F76A8',
      gradientNight: ['#14111A', '#4D4368', '#7F76A8'],
      gradientDay: ['#4D4368', '#7F76A8', '#D6A843'],
    },
    dark: {
      primary: '#B3A8D8',
      primaryDark: '#8A83B7',
      primaryLight: '#302B42',
      secondary: '#B3A8D8',
      secondaryDark: '#8A83B7',
      secondaryLight: '#302B42',
      info: '#B3A8D8',
      gradientNight: ['#0C0A10', '#1D1928', '#8A83B7'],
      gradientDay: ['#EDEBE4', '#B3A8D8', '#E0B85A'],
    },
  },
  {
    id: 'forest',
    label: 'Bosque',
    light: {
      primary: '#294236',
      primaryDark: '#16251D',
      primaryLight: '#E6EFEA',
      secondary: '#4F8B6B',
      secondaryDark: '#356149',
      secondaryLight: '#E2F1E9',
      info: '#4F8B6B',
      gradientNight: ['#101512', '#294236', '#4F8B6B'],
      gradientDay: ['#294236', '#4F8B6B', '#D6A843'],
    },
    dark: {
      primary: '#7BCFA4',
      primaryDark: '#4F8B6B',
      primaryLight: '#21392D',
      secondary: '#7BCFA4',
      secondaryDark: '#4F8B6B',
      secondaryLight: '#21392D',
      info: '#7BCFA4',
      gradientNight: ['#080B09', '#151D18', '#4F8B6B'],
      gradientDay: ['#EDEBE4', '#7BCFA4', '#E0B85A'],
    },
  },
  {
    id: 'sky',
    label: 'Cielo',
    light: {
      primary: '#244761',
      primaryDark: '#142838',
      primaryLight: '#E4EEF5',
      secondary: '#4F8FAF',
      secondaryDark: '#326A86',
      secondaryLight: '#E3F2F7',
      info: '#4F8FAF',
      gradientNight: ['#0E1419', '#244761', '#4F8FAF'],
      gradientDay: ['#244761', '#4F8FAF', '#D6A843'],
    },
    dark: {
      primary: '#82C7E6',
      primaryDark: '#4F8FAF',
      primaryLight: '#203647',
      secondary: '#82C7E6',
      secondaryDark: '#4F8FAF',
      secondaryLight: '#203647',
      info: '#82C7E6',
      gradientNight: ['#070A0D', '#172431', '#4F8FAF'],
      gradientDay: ['#EDEBE4', '#82C7E6', '#E0B85A'],
    },
  },
  {
    id: 'rose',
    label: 'Coral',
    light: {
      primary: '#633934',
      primaryDark: '#3C211E',
      primaryLight: '#F2E8E6',
      secondary: '#C96B5A',
      secondaryDark: '#914839',
      secondaryLight: '#F8E7E3',
      info: '#C96B5A',
      gradientNight: ['#16100F', '#633934', '#C96B5A'],
      gradientDay: ['#633934', '#C96B5A', '#D6A843'],
    },
    dark: {
      primary: '#E89382',
      primaryDark: '#C96B5A',
      primaryLight: '#452924',
      secondary: '#E89382',
      secondaryDark: '#C96B5A',
      secondaryLight: '#452924',
      info: '#E89382',
      gradientNight: ['#0D0807', '#241816', '#C96B5A'],
      gradientDay: ['#EDEBE4', '#E89382', '#E0B85A'],
    },
  },
];

export const DEFAULT_INTERFACE_COLOR_ID = INTERFACE_COLOR_OPTIONS[0].id;
