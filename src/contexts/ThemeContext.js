/**
 * CONTEXTO: Theme
 * 
 * Maneja el tema de la aplicación (claro/oscuro).
 * Persiste la preferencia del usuario usando AsyncStorage.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, DARK_COLORS } from '../constants/colors';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@app_theme';

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const theme = {
    isDarkMode,
    colors: isDarkMode ? DARK_COLORS : COLORS,
    toggleTheme,
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
