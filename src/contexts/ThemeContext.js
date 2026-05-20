/**
 * CONTEXTO: Theme
 * 
 * Maneja el tema de la aplicación (claro/oscuro).
 * Persiste la preferencia del usuario usando AsyncStorage.
 */

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COLORS,
  DARK_COLORS,
  DEFAULT_INTERFACE_COLOR_ID,
  INTERFACE_COLOR_OPTIONS,
} from '../constants/colors';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@app_theme';
const INTERFACE_COLOR_STORAGE_KEY = '@app_interface_color';

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [interfaceColorId, setInterfaceColorId] = useState(DEFAULT_INTERFACE_COLOR_ID);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar tema guardado al iniciar
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }

      const savedInterfaceColor = await AsyncStorage.getItem(INTERFACE_COLOR_STORAGE_KEY);
      if (INTERFACE_COLOR_OPTIONS.some((option) => option.id === savedInterfaceColor)) {
        setInterfaceColorId(savedInterfaceColor);
      }
    } catch (error) {
      console.log('Theme persistence not available, using default theme');
      // Fallback: usar tema claro por defecto si AsyncStorage falla
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Theme will not persist between sessions');
      // El tema cambia pero no se guarda si AsyncStorage falla
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
    }
  };

  const changeInterfaceColor = async (colorId) => {
    if (!INTERFACE_COLOR_OPTIONS.some((option) => option.id === colorId)) {
      return;
    }

    try {
      setInterfaceColorId(colorId);
      await AsyncStorage.setItem(INTERFACE_COLOR_STORAGE_KEY, colorId);
    } catch (error) {
      console.log('Interface color will not persist between sessions');
      setInterfaceColorId(colorId);
    }
  };

  const colors = useMemo(() => {
    const baseColors = isDarkMode ? DARK_COLORS : COLORS;
    const selectedColor = INTERFACE_COLOR_OPTIONS.find(
      (option) => option.id === interfaceColorId
    ) || INTERFACE_COLOR_OPTIONS[0];
    const modeColors = isDarkMode ? selectedColor.dark : selectedColor.light;

    return {
      ...baseColors,
      ...modeColors,
    };
  }, [interfaceColorId, isDarkMode]);

  const theme = {
    isDarkMode,
    colors,
    interfaceColorId,
    interfaceColorOptions: INTERFACE_COLOR_OPTIONS,
    toggleTheme,
    changeInterfaceColor,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};
