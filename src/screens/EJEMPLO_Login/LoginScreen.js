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
import { CustomButton, CustomInput } from '../components';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validateRequired } from '../utils/validators';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // Hook personalizado de autenticación
  const { signIn, loading } = useAuth();

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar email
    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar contraseña
    const passwordValidation = validateRequired(password, 'La contraseña');
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar inicio de sesión
  const handleLogin = async () => {
    // Limpiar errores previos
    setErrors({});
    
    // Validar
    if (!validateForm()) {
      return;
    }

    // Intentar iniciar sesión
    const result = await signIn(email, password);
    
    if (result.success) {
      Alert.alert('Éxito', '¡Bienvenido!');
      // Navegar a Home
      // navigation.navigate('Home');
    } else {
      Alert.alert('Error', result.error || 'No se pudo iniciar sesión');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido de vuelta</Text>
      </View>

      <View style={styles.formContainer}>
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
          error={errors.password}
        />

        {/* Botón de Login usando componente reutilizable */}
        <CustomButton
          title="Iniciar Sesión"
          onPress={handleLogin}
          size="large"
          loading={loading}
          style={styles.loginButton}
        />

        {/* Botón secundario para registro */}
        <CustomButton
          title="¿No tienes cuenta? Regístrate"
          onPress={() => navigation.navigate('Signup')}
          variant="outline"
          size="medium"
          style={styles.signupButton}
        />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
