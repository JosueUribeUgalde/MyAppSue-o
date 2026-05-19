/**
 * EJEMPLO DE USO - PANTALLA DE LOGIN
 * 
 * Este archivo demuestra cómo integrar todos los elementos
 * de la nueva estructura en una pantalla funcional.
 * 
 * Características demostradas:
 * - Uso de constantes (COLORS, SIZES)
 * - Uso de componentes reutilizables
 * - Uso de hooks personalizados
 * - Uso de validadores
 * - Separación de estilos
 * - Integración con servicios de Firebase
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomInput } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { validateEmail, validateRequired } from '../../utils/validators';
import styles from './styles';

const LoginScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // Hook personalizado de autenticación
  const { signIn, signUp, loading } = useAuth();
  const { colors } = useTheme();

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (isRegistering) {
      const nameValidation = validateRequired(displayName, 'El nombre');
      if (!nameValidation.isValid) {
        newErrors.displayName = nameValidation.message;
      }
    }
    
    // Validar email
    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar contraseña
    const passwordValidation = validateRequired(password, 'La contraseña');
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar inicio de sesión o registro
  const handleSubmit = async () => {
    // Limpiar errores previos
    setErrors({});
    
    // Validar
    if (!validateForm()) {
      return;
    }

    try {
      const result = isRegistering
        ? await signUp(email, password, displayName)
        : await signIn(email, password);
      
      if (result.success) {
        Alert.alert(
          '¡Éxito!', 
          isRegistering 
            ? 'Cuenta creada correctamente. ¡Bienvenido!' 
            : 'Bienvenido de vuelta'
        );
        // La navegación será manejada automáticamente por AppNavigator
      } else {
        // Mensaje genérico de error
        const errorMessage = isRegistering 
          ? 'No se pudo crear la cuenta. Verifica los datos e intenta nuevamente.'
          : 'Credenciales incorrectas. Verifica tu correo y contraseña.';
        
        Alert.alert('Error de Autenticación', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado. Intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {isRegistering ? 'Registra tu usuario para guardar tus datos' : 'Bienvenido de vuelta'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        {isRegistering && (
          <CustomInput
            label="Nombre"
            placeholder="Tu nombre"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
            error={errors.displayName}
          />
        )}

        {/* Input de Email usando componente reutilizable */}
        <CustomInput
          label="Email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        {/* Input de Contraseña */}
        <CustomInput
          label="Contraseña"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showPasswordToggle
          error={errors.password}
        />

        {/* Botón de Login usando componente reutilizable */}
        <CustomButton
          title={loading ? "Procesando..." : isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
          onPress={handleSubmit}
          size="large"
          disabled={loading}
          style={styles.loginButton}
        />

        <CustomButton
          title={isRegistering ? "Ya tengo cuenta" : "Crear cuenta"}
          onPress={() => {
            setIsRegistering(!isRegistering);
            setErrors({});
            // Limpiar campos al cambiar de modo
            setDisplayName('');
            setEmail('');
            setPassword('');
          }}
          variant="outline"
          size="large"
          disabled={loading}
          style={styles.signupButton}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
