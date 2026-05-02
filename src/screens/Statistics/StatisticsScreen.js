/**
 * PANTALLA: Statistics (Estadísticas)
 * 
 * Pantalla de estadísticas de sueño.
 * Muestra gráficos y tendencias del seguimiento de sueño.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBar, Card } from '../../components';
import styles from './styles';

const StatisticsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas</Text>
          <Text style={styles.subtitle}>Análisis de tu sueño</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Gráficos y estadísticas</Text>
          <Text style={styles.cardText}>En desarrollo...</Text>
        </Card>
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="Statistics" />
    </SafeAreaView>
  );
};

export default StatisticsScreen;
