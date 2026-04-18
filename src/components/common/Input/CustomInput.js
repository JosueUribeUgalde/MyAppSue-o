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
import { COLORS } from '../../../constants';

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
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.textSecondary}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
