/**
 * PANTALLA: Profile (Perfil)
 * 
 * Pantalla de perfil del usuario.
 * Muestra información personal y configuraciones.
 * 
 * Características:
 * - Datos del usuario
 * - Configuraciones de la app
 * - Cerrar sesión
 */

import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, Card, BottomTabBar } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              // La navegación se manejará automáticamente en AppNavigator
              console.log('Sesión cerrada exitosamente');
            } else {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  // Obtener iniciales del nombre o email
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials()}</Text>
        </View>
        <Text style={styles.name}>{user?.displayName || 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email || 'Sin correo'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Estadísticas</Text>
      
      <Card>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Promedio de sueño</Text>
          <Text style={styles.statValue}>7.3 horas</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Mejor racha</Text>
          <Text style={styles.statValue}>15 días</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Calidad promedio</Text>
          <Text style={styles.statValue}>82%</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Configuración</Text>
      
      <Card>
        <Text style={styles.optionText}>Notificaciones</Text>
      </Card>

      <Card>
        <Text style={styles.optionText}>Tema Oscuro</Text>
      </Card>

      <View style={styles.logoutContainer}>
        <CustomButton
          title="Cerrar Sesión"
          onPress={handleLogout}
          variant="outline"
          size="large"
        />
      </View>
    </ScrollView>
    
    <BottomTabBar navigation={navigation} currentScreen="Profile" />
  </SafeAreaView>
  );
};

export default ProfileScreen;
