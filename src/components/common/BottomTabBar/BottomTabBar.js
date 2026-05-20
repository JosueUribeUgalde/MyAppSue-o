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
import { useTheme } from '../../../contexts/ThemeContext';
import { SIZES } from '../../../constants';

const BottomTabBar = ({ navigation, currentScreen = 'Home' }) => {
  const { colors } = useTheme();
  
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
      name: 'Tips',
      label: 'Tips',
      icon: 'bulb-outline',
      iconActive: 'bulb',
    },
    {
      name: 'Profile',
      label: 'Perfil',
      icon: 'person-outline',
      iconActive: 'person',
    },
  ];

  const handleTabPress = (tabName) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(tabName);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} edges={['bottom']}>
      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: SIZES.borderRadius.xl,
        marginHorizontal: SIZES.padding.lg,
        marginBottom: SIZES.padding.sm,
        paddingVertical: SIZES.padding.sm,
        paddingHorizontal: SIZES.padding.xs,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 8,
      }}>
        {tabs.map((tab) => {
        const isActive = currentScreen === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: SIZES.padding.xs,
            }}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isActive ? colors.primary : 'transparent',
              }}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={19}
                color={isActive ? colors.textLight : colors.textSecondary}
              />
            </View>
            <Text
              style={{
                fontSize: SIZES.font.xSmall,
                marginTop: 3,
                color: isActive ? colors.primary : colors.textSecondary,
                fontWeight: isActive ? '800' : '600',
              }}
              numberOfLines={1}
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
