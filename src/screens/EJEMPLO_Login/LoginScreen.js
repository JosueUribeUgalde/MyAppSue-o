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
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, CustomInput } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { resetPassword } from '../../services/authService';
import {
  PASSWORD_POLICY,
  getPasswordRequirements,
  validateEmail,
  validatePassword,
  validateRequired,
} from '../../utils/validators';
import styles from './styles';

const LoginScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [authError, setAuthError] = useState('');
  const [sendingRecoveryEmail, setSendingRecoveryEmail] = useState(false);
  
  // Hook personalizado de autenticación
  const { signIn, signUp, loading } = useAuth();
  const { colors } = useTheme();
  const passwordRequirements = getPasswordRequirements(password);

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
    } else if (isRegistering) {
      const strongPasswordValidation = validatePassword(password);
      if (!strongPasswordValidation.isValid) {
        newErrors.password = strongPasswordValidation.message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordReset = async () => {
    setErrors({});
    setAuthError('');
    setRecoveryMessage('');
    setRecoveryError('');

    if (!validateEmail(email)) {
      setErrors({ email: 'Escribe un correo válido' });
      return;
    }

    setSendingRecoveryEmail(true);
    const result = await resetPassword(email.trim());
    setSendingRecoveryEmail(false);

    if (result.success) {
      setRecoveryMessage('Te enviamos un enlace para recuperar tu contraseña. Revisa tu correo.');
    } else {
      setRecoveryError('No se pudo enviar el enlace. Verifica el correo e intenta de nuevo.');
    }
  };

  // Manejar inicio de sesión o registro
  const handleSubmit = async () => {
    // Limpiar errores previos
    setErrors({});
    setAuthError('');
    
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

        setAuthError(errorMessage);
      }
    } catch (error) {
      setAuthError('Ocurrió un error inesperado. Intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.brandMark, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="moon" size={30} color={colors.primary} />
        </View>
        <Text style={[styles.appName, { color: colors.textSecondary }]}>SleepTrack</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          {isRecoveringPassword ? 'Recuperar contraseña' : isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {isRecoveringPassword
            ? 'Recibe un enlace para volver a entrar'
            : isRegistering
              ? 'Registra tu usuario para guardar tus datos'
              : 'Bienvenido de vuelta'}
        </Text>
      </View>

      <View style={[styles.formContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {isRegistering && !isRecoveringPassword && (
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
          onChangeText={(value) => {
            setEmail(value);
            setAuthError('');
            setRecoveryMessage('');
            setRecoveryError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        {!isRecoveringPassword && (
          <>
            <CustomInput
              label="Contraseña"
              placeholder="********"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setAuthError('');
              }}
              secureTextEntry
              showPasswordToggle
              error={errors.password}
              maxLength={PASSWORD_POLICY.maxLength}
            />
            {isRegistering ? (
              <View style={[styles.passwordPolicyBox, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.passwordPolicyTitle, { color: colors.text }]}>
                  La contraseña debe incluir:
                </Text>
                <View style={styles.passwordRequirementGrid}>
                  {passwordRequirements.map((requirement) => (
                    <View key={requirement.id} style={styles.passwordRequirement}>
                      <Ionicons
                        name={requirement.isMet ? 'checkmark-circle' : 'ellipse-outline'}
                        size={16}
                        color={requirement.isMet ? colors.success : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.passwordRequirementText,
                          { color: requirement.isMet ? colors.text : colors.textSecondary },
                        ]}
                      >
                        {requirement.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
          </>
        )}

        {recoveryMessage ? (
          <View style={[styles.statusBox, { backgroundColor: colors.success + '20' }]}>
            <Text style={[styles.statusText, { color: colors.success }]}>
              {recoveryMessage}
            </Text>
          </View>
        ) : null}

        {recoveryError ? (
          <View style={[styles.statusBox, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.statusText, { color: colors.error }]}>
              {recoveryError}
            </Text>
          </View>
        ) : null}

        {authError ? (
          <View style={[styles.statusBox, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.statusText, { color: colors.error }]}>
              {authError}
            </Text>
          </View>
        ) : null}

        {/* Botón de Login usando componente reutilizable */}
        {isRecoveringPassword ? (
          <CustomButton
            title={sendingRecoveryEmail ? "Enviando..." : "Enviar enlace"}
            onPress={handlePasswordReset}
            size="large"
            disabled={sendingRecoveryEmail}
            style={styles.loginButton}
          />
        ) : (
          <CustomButton
            title={loading ? "Procesando..." : isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
            onPress={handleSubmit}
            size="large"
            disabled={loading}
            style={styles.loginButton}
          />
        )}

        <CustomButton
          title={isRecoveringPassword ? "Volver a iniciar sesión" : isRegistering ? "Ya tengo cuenta" : "Crear cuenta"}
          onPress={() => {
            if (isRecoveringPassword) {
              setIsRecoveringPassword(false);
              setIsRegistering(false);
            } else {
              setIsRegistering(!isRegistering);
            }
            setErrors({});
            setAuthError('');
            setRecoveryMessage('');
            setRecoveryError('');
            setSendingRecoveryEmail(false);
            // Limpiar campos al cambiar de modo
            setDisplayName('');
            setPassword('');
          }}
          variant="outline"
          size="large"
          disabled={loading}
          style={styles.signupButton}
        />

        {!isRegistering && !isRecoveringPassword && (
          <TouchableOpacity
            onPress={() => {
              setIsRecoveringPassword(true);
              setErrors({});
              setAuthError('');
              setPassword('');
              setRecoveryMessage('');
              setRecoveryError('');
            }}
            activeOpacity={0.7}
            disabled={loading}
            style={styles.forgotPasswordLink}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
              Olvidé mi contraseña
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
