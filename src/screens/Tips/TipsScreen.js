/**
 * PANTALLA: Tips (Consejos)
 * 
 * Pantalla de consejos y recomendaciones para mejorar el sueño.
 * Muestra tips personalizados y educación sobre higiene del sueño.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBar, Card } from '../../components';
import styles from './styles';

const TipsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tips</Text>
          <Text style={styles.subtitle}>Mejora la calidad de tu sueño</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Consejos personalizados</Text>
          <Text style={styles.cardText}>En desarrollo...</Text>
        </Card>
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="Tips" />
    </SafeAreaView>
  );
};

export default TipsScreen;
