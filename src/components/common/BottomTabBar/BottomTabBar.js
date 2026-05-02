/**
 * COMPONENTE: BottomTabBar
 * 
 * Barra de navegación inferior de la aplicación.
 * Se muestra en la parte inferior de todas las pantallas.
 * 
 * Props:
 * - navigation: objeto de navegación para cambiar entre pantallas
 * - currentScreen: nombre de la pantalla actual
 */

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import styles from './styles';

const BottomTabBar = ({ navigation, currentScreen = 'Home' }) => {
  const tabs = [
    {
      name: 'Home',
      label: 'Inicio',
      icon: 'home-outline',
      iconActive: 'home',
    },
    {
      name: 'SleepTracking',
      label: 'Registrar',
      icon: 'add-circle-outline',
      iconActive: 'add-circle',
    },
    {
      name: 'Statistics',
      label: 'Estadísticas',
      icon: 'bar-chart-outline',
      iconActive: 'bar-chart',
    },
    {
      name: 'History',
      label: 'Historial',
      icon: 'time-outline',
      iconActive: 'time',
    },
    {
      name: 'Tips',
      label: 'Tips',
      icon: 'bulb-outline',
      iconActive: 'bulb',
    },
  ];

  const handleTabPress = (tabName) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(tabName);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        {tabs.map((tab) => {
        const isActive = currentScreen === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.icon}
              size={24}
              color={isActive ? COLORS.primary : COLORS.textSecondary}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      </View>
    </SafeAreaView>
  );
};

export default BottomTabBar;
