/**
 * TAMAÑOS Y ESPACIADOS DE LA APLICACIÓN
 * 
 * Define tamaños de fuentes, espaciados, bordes y dimensiones
 * para mantener consistencia visual en toda la app.
 * Uso: import { SIZES } from '@/constants';
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  // Dimensiones de la ventana
  width,
  height,
  
  // Tamaños de fuente
  font: {
    xSmall: 10,
    small: 12,
    medium: 14,
    regular: 16,
    large: 18,
    xLarge: 20,
    xxLarge: 24,
    xxxLarge: 32,
    heading: 28,
    title: 36,
  },
  
  // Espaciados/Padding/Margin
  padding: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Bordes
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
    full: 9999,
  },
  
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 3,
  },
  
  // Tamaños de iconos
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
  },
  
  // Tamaños de botones
  button: {
    small: {
      height: 36,
      paddingHorizontal: 16,
    },
    medium: {
      height: 44,
      paddingHorizontal: 20,
    },
    large: {
      height: 52,
      paddingHorizontal: 24,
    },
  },
  
  // Tamaños de inputs
  input: {
    height: 54,
    borderRadius: 14,
  },
};
