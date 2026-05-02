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
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, Card, BottomTabBar } from '../../components';
import { COLORS } from '../../constants';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>¿Cómo dormiste anoche?</Text>
      </View>

      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.lastNightCard}
      >
        <Text style={styles.lastNightTitle}>Última noche</Text>
        
        <View style={styles.lastNightContent}>
          <View style={styles.lastNightLeft}>
            <Text style={styles.lastNightLabel}>Duración</Text>
            <Text style={styles.lastNightValue}>6.4h</Text>
            
            <View style={styles.lastNightTimes}>
              <View style={styles.timeItem}>
                <Ionicons name="bed-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.timeText}>22:50</Text>
              </View>
              
              <View style={styles.timeItem}>
                <Ionicons name="sunny-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.timeText}>7:41</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.lastNightRight}>
            <Ionicons name="star" size={60} color={COLORS.coral} />
          </View>
        </View>
      </LinearGradient>

      <Card>
        <View style={styles.cardTitleContainer}>
          <Ionicons name="trending-up" size={24} color={COLORS.primary} style={styles.cardTitleIcon} />
          <Text style={styles.cardTitle}>Promedio Semanal</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxLabel}>Calidad</Text>
            <Text style={styles.statBoxValue}>3.4/5</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxLabel}>Duración</Text>
            <Text style={styles.statBoxValue}>7.7h</Text>
          </View>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Registrar Sueño" 
          onPress={() => navigation.navigate('SleepTracking')}
          size="large"
        />
      </View>

      <View style={styles.actionBoxesContainer}>
        <TouchableOpacity 
          style={styles.actionBox}
          onPress={() => navigation.navigate('Statistics')}
        >
          <Ionicons name="calendar-outline" size={32} color={COLORS.secondary} />
          <Text style={styles.actionBoxText}>Ver estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBox}
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time-outline" size={32} color={COLORS.coral} />
          <Text style={styles.actionBoxText}>Ver historial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
    <BottomTabBar navigation={navigation} currentScreen="Home" />
  </SafeAreaView>
  );
};

export default HomeScreen;
