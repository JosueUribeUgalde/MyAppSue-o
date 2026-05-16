/**
 * APP PRINCIPAL
 * 
 * Punto de entrada de la aplicación de seguimiento de sueño.
 * Utiliza la nueva estructura escalable con separación de responsabilidades.
 * Incluye sistema de autenticación con Firebase.
 * 
 * Estructura del proyecto:
 * - /src/constants: Colores, tamaños y constantes
 * - /src/components: Componentes reutilizables
 * - /src/screens: Pantallas de la app
 * - /src/services: Lógica de negocio y Firebase
 * - /src/hooks: Hooks personalizados
 * - /src/navigation: Navegación con autenticación
 * - /src/utils: Utilidades y validadores
 */

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
