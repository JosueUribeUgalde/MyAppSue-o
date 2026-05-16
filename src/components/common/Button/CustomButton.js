/**
 * COMPONENTE: BOTÓN PERSONALIZADO
 * 
 * Botón reutilizable con variantes (primary, secondary, outline)
 * y tamaños configurables (small, medium, large).
 * 
 * Props:
 * - title: texto del botón
 * - onPress: función al presionar
 * - variant: 'primary' | 'secondary' | 'outline'
 * - size: 'small' | 'medium' | 'large'
 * - disabled: boolean
 * - loading: boolean
 */

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SIZES } from '../../../constants';

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle
}) => {
  const { colors } = useTheme();
  
  // Crear estilos dinámicos basados en el tema
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: SIZES.padding.lg,
      paddingVertical: SIZES.padding.md,
      borderRadius: SIZES.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button_primary: {
      backgroundColor: colors.primary,
    },
    button_secondary: {
      backgroundColor: colors.secondary,
    },
    button_outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    button_small: {
      paddingHorizontal: SIZES.padding.md,
      paddingVertical: SIZES.padding.sm,
    },
    button_medium: {
      paddingHorizontal: SIZES.padding.lg,
      paddingVertical: SIZES.padding.md,
    },
    button_large: {
      paddingHorizontal: SIZES.padding.xl,
      paddingVertical: SIZES.padding.lg,
    },
    button_disabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: SIZES.font.regular,
      fontWeight: '600',
    },
    buttonText_primary: {
      color: colors.textLight,
    },
    buttonText_secondary: {
      color: colors.textLight,
    },
    buttonText_outline: {
      color: colors.primary,
    },
    buttonText_small: {
      fontSize: SIZES.font.small,
    },
    buttonText_medium: {
      fontSize: SIZES.font.regular,
    },
    buttonText_large: {
      fontSize: SIZES.font.large,
    },
  });

  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    styles[`buttonText_${variant}`],
    styles[`buttonText_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textLight} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
