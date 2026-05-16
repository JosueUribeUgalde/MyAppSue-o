// LoginScreen.js

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles';

const LoginScreen = () => {

  const { signIn, signUp, loading } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {

    if (!email || !password) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }

    if (!email.includes('@')) {

      Alert.alert(
        'Error',
        'Ingresa un correo válido'
      );

      return;
    }

    if (isRegistering) {

      if (!displayName) {

        Alert.alert(
          'Error',
          'Ingresa tu nombre'
        );

        return;
      }

      if (password !== confirmPassword) {

        Alert.alert(
          'Error',
          'Las contraseñas no coinciden'
        );

        return;
      }
    }

    let result;

    if (isRegistering) {

      result = await signUp(
        email,
        password,
        displayName
      );

    } else {

      result = await signIn(
        email,
        password
      );
    }

    if (!result.success) {

      Alert.alert(
        'Error',
        isRegistering
          ? 'No se pudo crear la cuenta'
          : 'Correo o contraseña incorrectos'
      );
    }
  };

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.logoContainer}>

            <Ionicons
              name="moon-outline"
              size={38}
              color="#FFFFFF"
            />

          </View>

          <Text style={styles.title}>

            {isRegistering
              ? 'Crear cuenta'
              : 'Bienvenido'}

          </Text>

          <Text style={styles.subtitle}>

            {isRegistering
              ? 'Comienza a registrar tu sueño hoy'
              : 'Inicia sesión para continuar'}

          </Text>

        </View>

        {/* CARD */}
        <View style={styles.card}>

          {/* NOMBRE */}
          {isRegistering && (

            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Nombre
              </Text>

              <View style={styles.inputContainer}>

                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#9CA3AF"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Tu nombre"
                  placeholderTextColor="#9CA3AF"
                  value={displayName}
                  onChangeText={setDisplayName}
                />

              </View>

            </View>

          )}

          {/* EMAIL */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Email
            </Text>

            <View style={styles.inputContainer}>

              <Ionicons
                name="mail-outline"
                size={20}
                color="#9CA3AF"
              />

              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

            </View>

          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Contraseña
            </Text>

            <View style={styles.inputContainer}>

              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
              />

              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >

                <Ionicons
                  name={
                    showPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={20}
                  color="#9CA3AF"
                />

              </TouchableOpacity>

            </View>

          </View>

          {/* CONFIRM PASSWORD */}
          {isRegistering && (

            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Confirmar contraseña
              </Text>

              <View style={styles.inputContainer}>

                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                />

                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={20}
                    color="#9CA3AF"
                  />

                </TouchableOpacity>

              </View>

            </View>

          )}

          {/* FORGOT */}
          {!isRegistering && (

            <TouchableOpacity>

              <Text style={styles.forgot}>
                ¿Olvidaste tu contraseña?
              </Text>

            </TouchableOpacity>

          )}

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >

            <Text style={styles.buttonText}>

              {loading
                ? 'Cargando...'
                : isRegistering
                ? 'Crear cuenta'
                : 'Iniciar sesión'}

            </Text>

          </TouchableOpacity>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>

          <Text style={styles.footerText}>

            {isRegistering
              ? '¿Ya tienes cuenta?'
              : '¿No tienes cuenta?'}

          </Text>

          <TouchableOpacity
            onPress={() =>
              setIsRegistering(!isRegistering)
            }
          >

            <Text style={styles.register}>

              {isRegistering
                ? ' Inicia sesión'
                : ' Regístrate'}

            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default LoginScreen;