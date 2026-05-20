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
 * - showPasswordToggle: mostrar botón de ojo para contraseñas
 * - error: mensaje de error
 * - label: etiqueta del campo
 */

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useTheme } from '../../../contexts/ThemeContext';

const CustomInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  showPasswordToggle = false,
  error = '',
  label = '',
  style,
  ...props 
}) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Determinar si debe ocultar el texto
  const shouldHideText = secureTextEntry && !isPasswordVisible;
  
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            showPasswordToggle && styles.inputWithIcon,
            { 
              color: colors.text,
              backgroundColor: colors.surfaceElevated || colors.surface,
              borderColor: error ? colors.error : colors.border,
            }
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={shouldHideText}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
