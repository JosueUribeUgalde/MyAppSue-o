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
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants';
import styles from './styles';

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
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.textLight} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
