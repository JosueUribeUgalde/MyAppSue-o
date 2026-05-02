/**
 * PANTALLA: History (Historial)
 * 
 * Pantalla de historial de registros de sueño.
 * Muestra el histórico completo de todos los registros.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBar, Card } from '../../components';
import styles from './styles';

const HistoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Historial</Text>
          <Text style={styles.subtitle}>Todos tus registros de sueño</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Registros anteriores</Text>
          <Text style={styles.cardText}>En desarrollo...</Text>
        </Card>
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="History" />
    </SafeAreaView>
  );
};

export default HistoryScreen;
