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
import { validateEmail, validateRequired } from '../../utils/validators';
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
      Alert.alert('¡Éxito!', 'Bienvenido de vuelta');
      // La navegación será manejada automáticamente por AppNavigator
    } else {
      // Mensajes de error más amigables
      let errorMessage = 'No se pudo iniciar sesión';
      
      if (result.error?.includes('user-not-found')) {
        errorMessage = 'No existe una cuenta con este correo';
      } else if (result.error?.includes('wrong-password')) {
        errorMessage = 'Contraseña incorrecta';
      } else if (result.error?.includes('invalid-email')) {
        errorMessage = 'Correo electrónico inválido';
      } else if (result.error?.includes('invalid-credential')) {
        errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña';
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }} edges={['top']}>
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
          title={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          onPress={handleLogin}
          size="large"
          disabled={loading}
          style={styles.loginButton}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
