/**
 * COMPONENTE: INPUT PERSONALIZADO
 * 
 * Campo de texto reutilizable con estilos y validación.
 * 
 * Props:
 * - placeholder: texto placeholder
 * - value: valor del input
 * - onChangeText: función para cambios
 * - secureTextEntry: para contraseñas
 * - error: mensaje de error
 * - label: etiqueta del campo
 */

import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';
import { useTheme } from '../../../contexts/ThemeContext';

const CustomInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  error = '',
  label = '',
  style,
  ...props 
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input, 
          error ? styles.inputError : null,
          { color: colors.text, backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
