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
import { View, Text, ScrollView } from 'react-native';
import { CustomButton, Card } from '../../components';
import styles from './styles';

const ProfileScreen = () => {
  const handleLogout = () => {
    // Aquí irá la lógica de cerrar sesión con Firebase
    console.log('Cerrar sesión');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>Juan Pérez</Text>
        <Text style={styles.email}>juan@ejemplo.com</Text>
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
  );
};

export default ProfileScreen;
