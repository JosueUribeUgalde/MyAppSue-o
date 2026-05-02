/**
 * APP PRINCIPAL
 * 
 * Punto de entrada de la aplicación de seguimiento de sueño.
 * Utiliza la nueva estructura escalable con separación de responsabilidades.
 * 
 * Estructura del proyecto:
 * - /src/constants: Colores, tamaños y constantes
 * - /src/components: Componentes reutilizables
 * - /src/screens: Pantallas de la app
 * - /src/services: Lógica de negocio y Firebase
 * - /src/hooks: Hooks personalizados
 * - /src/navigation: Navegación
 * - /src/utils: Utilidades y validadores
 */

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
// import { useAuth } from './src/hooks/useAuth';

export default function App() {
  // Usar el hook de autenticación
  // const { user, loading } = useAuth();

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
