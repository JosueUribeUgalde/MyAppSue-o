/**
 * NAVEGACIÓN: AppNavigator
 * 
 * Configuración de navegación de la aplicación.
 * Define las rutas y estructura de navegación.
 * 
 * NOTA: Este es un ejemplo básico. Para usar navegación real,
 * instala: npm install @react-navigation/native @react-navigation/bottom-tabs
 * 
 * Para ahora, exporta un componente simple que maneja las pantallas.
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import SleepTrackingScreen from '../screens/SleepTracking/SleepTrackingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import TipsScreen from '../screens/Tips/TipsScreen';

/**
 * Navegador simple de la aplicación
 * En producción, reemplazar con React Navigation
 */
const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Función para cambiar de pantalla (temporal)
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
