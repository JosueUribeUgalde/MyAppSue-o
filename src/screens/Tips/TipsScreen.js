/**
 * PANTALLA: Tips (Consejos)
 * 
 * Pantalla de consejos y recomendaciones para mejorar el sueño.
 * Muestra tips personalizados y educación sobre higiene del sueño.
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import createStyles from './styles';

const TipsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Tips</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Mejora la calidad de tu sueño</Text>
        </View>

        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="bulb" size={24} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Consejos personalizados</Text>
          </View>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>En desarrollo...</Text>
        </Card>
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="Tips" />
    </SafeAreaView>
  );
};

export default TipsScreen;
