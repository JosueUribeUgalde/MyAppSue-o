/**
 * PANTALLA: Home (Inicio)
 * 
 * Pantalla principal de la app de seguimiento de sueño.
 * Muestra resumen del sueño y accesos rápidos.
 * 
 * Características:
 * - Resumen de sueño de anoche
 * - Estadísticas semanales
 * - Acceso rápido a registrar sueño
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CustomButton, Card } from '../../components';
import styles from './styles';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>¿Cómo dormiste anoche?</Text>
      </View>

      <Card>
        <Text style={styles.cardTitle}>Resumen de Anoche</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7.5h</Text>
            <Text style={styles.statLabel}>Tiempo total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Calidad</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Estadísticas de la Semana</Text>
        <Text style={styles.cardText}>Promedio: 7.2 horas</Text>
        <Text style={styles.cardText}>Mejor noche: Viernes (8h)</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Registrar Sueño" 
          onPress={() => console.log('Registrar')}
          size="large"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
