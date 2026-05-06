/**
 * NAVEGACIÓN: AppNavigator
 * 
 * Configuración de navegación de la aplicación.
 * Define las rutas y estructura de navegación.
 * Maneja la autenticación mostrando Login o las pantallas principales.
 */

import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../constants';
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
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 16, fontSize: 16, color: COLORS.textSecondary }}>
          Cargando...
        </Text>
      </View>
    );
  }

  // Si no hay usuario autenticado, mostrar Login
  if (!user) {
    return <LoginScreen />;
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
        return <ProfileScreen navigation={{ navigate }} />;
      default:
        return <HomeScreen navigation={{ navigate }} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

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
