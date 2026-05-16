/**
 * NAVEGACIÓN: AppNavigator
 * 
 * Configuración de navegación de la aplicación.
 * Define las rutas y estructura de navegación.
 * Maneja la autenticación mostrando Login o las pantallas principales.
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { SIZES } from '../constants';
import LoginScreen from '../screens/EJEMPLO_Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SleepTrackingScreen from '../screens/SleepTracking/SleepTrackingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import TipsScreen from '../screens/Tips/TipsScreen';

/**
 * Navegador principal de la aplicación
 * Maneja la autenticación y navegación entre pantallas
 */
const AppNavigator = () => {
  const { user, loading } = useAuth();
  const { colors } = useTheme();
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [guestUser, setGuestUser] = useState(null);

  useEffect(() => {
    if (user) {
      setGuestUser(null);
      setCurrentScreen('Home');
    }
  }, [user]);

  const handleGuestLogin = () => {
    setGuestUser({
      uid: 'guest',
      displayName: 'Invitado',
      email: 'Modo sin cuenta',
      isGuest: true,
    });
    setCurrentScreen('Home');
  };

  const handleGuestLogout = () => {
    setGuestUser(null);
    setCurrentScreen('Home');
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Cargando...
        </Text>
      </View>
    );
  }

  // Si no hay usuario autenticado, mostrar Login
  if (!user && !guestUser) {
    return <LoginScreen onContinueWithoutAccount={handleGuestLogin} />;
  }

  // Función para cambiar de pantalla
  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  // Renderizar la pantalla actual
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate }} />;
      case 'SleepTracking':
        return <SleepTrackingScreen navigation={{ navigate }} />;
      case 'Statistics':
        return <StatisticsScreen navigation={{ navigate }} />;
      case 'History':
        return <HistoryScreen navigation={{ navigate }} />;
      case 'Tips':
        return <TipsScreen navigation={{ navigate }} />;
      case 'Profile':
        return (
          <ProfileScreen
            navigation={{ navigate }}
            authUser={user || guestUser}
            onGuestLogout={handleGuestLogout}
          />
        );
      default:
        return <HomeScreen navigation={{ navigate }} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: SIZES.padding.lg,
    fontSize: SIZES.font.regular,
  },
});

export default AppNavigator;

/**
 * EJEMPLO DE CONFIGURACIÓN CON REACT NAVIGATION:
 * 
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * 
 * const Tab = createBottomTabNavigator();
 * 
 * const AppNavigator = () => {
 *   return (
 *     <NavigationContainer>
 *       <Tab.Navigator>
 *         <Tab.Screen name="Home" component={HomeScreen} />
 *         <Tab.Screen name="SleepTracking" component={SleepTrackingScreen} />
 *         <Tab.Screen name="Profile" component={ProfileScreen} />
 *       </Tab.Navigator>
 *     </NavigationContainer>
 *   );
 * };
 */
