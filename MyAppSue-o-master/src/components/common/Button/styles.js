/**
 * ESTILOS DEL BOTÓN PERSONALIZADO
 * 
 * Define todos los estilos para las variantes y tamaños del botón.
 * Separado del componente para mejor organización.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  // Estilos base del botón
  button: {
    borderRadius: SIZES.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  // Variantes
  button_primary: {
    backgroundColor: COLORS.primary,
  },
  
  button_secondary: {
    backgroundColor: COLORS.secondary,
  },
  
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: SIZES.borderWidth.medium,
    borderColor: COLORS.primary,
  },
  
  button_disabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  
  // Tamaños
  button_small: {
    height: SIZES.button.small.height,
    paddingHorizontal: SIZES.button.small.paddingHorizontal,
  },
  
  button_medium: {
    height: SIZES.button.medium.height,
    paddingHorizontal: SIZES.button.medium.paddingHorizontal,
  },
  
  button_large: {
    height: SIZES.button.large.height,
    paddingHorizontal: SIZES.button.large.paddingHorizontal,
  },
  
  // Estilos de texto
  buttonText: {
    fontWeight: '600',
  },
  
  buttonText_primary: {
    color: COLORS.textLight,
  },
  
  buttonText_secondary: {
    color: COLORS.textLight,
  },
  
  buttonText_outline: {
    color: COLORS.primary,
  },
  
  buttonText_small: {
    fontSize: SIZES.font.small,
  },
  
  buttonText_medium: {
    fontSize: SIZES.font.medium,
  },
  
  buttonText_large: {
    fontSize: SIZES.font.large,
  },
});

export default styles;
