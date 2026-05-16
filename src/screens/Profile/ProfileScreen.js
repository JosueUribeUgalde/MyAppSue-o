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

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Alert, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, Card, BottomTabBar } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { getSleepRecords, calculateWeeklyStats } from '../../services/sleepService';
import createStyles from './styles';

const ProfileScreen = ({ navigation, authUser, onGuestLogout }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  const currentUser = authUser || user;

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  // Cargar estadísticas del usuario
  const loadStats = useCallback(async () => {
    if (!currentUser || currentUser.isGuest) {
      setLoadingStats(false);
      return;
    }

    setLoadingStats(true);
    const result = await getSleepRecords(currentUser.uid);
    
    if (result.success && result.data.length > 0) {
      const allRecords = result.data;
      setTotalRecords(allRecords.length);

      // Calcular estadísticas de todos los registros
      const weeklyStats = calculateWeeklyStats(allRecords);
      
      // Calcular mejor racha (días consecutivos con registro)
      const dates = allRecords.map(r => new Date(r.fecha_sueno)).sort((a, b) => b - a);
      let currentStreak = 0;
      let maxStreak = 0;
      
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
          currentStreak = 1;
        } else {
          const diff = Math.abs(dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24);
          if (diff <= 1) {
            currentStreak++;
          } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
          }
        }
      }
      maxStreak = Math.max(maxStreak, currentStreak);

      setStats({
        avgDuration: weeklyStats.averageDuration,
        avgQuality: weeklyStats.averageQuality,
        bestStreak: maxStreak,
        totalNights: weeklyStats.totalNights,
      });
    }
    
    setLoadingStats(false);
  }, [currentUser]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

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
            if (currentUser?.isGuest) {
              onGuestLogout?.();
              return;
            }

            const result = await logout();
            if (result.success) {
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
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return currentUser?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{getInitials()}</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {currentUser?.displayName || 'Usuario'}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {currentUser?.email || currentUser?.isGuest ? 'Modo Invitado' : 'Sin correo'}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Estadísticas</Text>
      
      <Card>
        {loadingStats ? (
          <View style={styles.loadingStats}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : stats && totalRecords > 0 ? (
          <>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Promedio de sueño
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.avgDuration}h
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Mejor racha
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.bestStreak} día{stats.bestStreak !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Calidad promedio
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.avgQuality}/5
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total de registros
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {totalRecords}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.emptyStats}>
            <Ionicons name="analytics-outline" size={32} color={colors.textSecondary} />
            <Text style={[styles.emptyStatsText, { color: colors.textSecondary }]}>
              Sin datos aún.{'\n'}Registra tu primer sueño.
            </Text>
          </View>
        )}
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuración</Text>
      
      <Card>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            <Ionicons 
              name="moon" 
              size={24} 
              color={colors.primary} 
              style={styles.optionIcon}
            />
            <View style={styles.optionContent}>
              <Text style={[styles.optionText, { color: colors.text }]}>
                Tema Oscuro
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                {isDarkMode ? 'Activado' : 'Desactivado'}
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
            thumbColor={isDarkMode ? colors.primary : colors.textLight}
          />
        </View>
      </Card>

      <View style={styles.logoutContainer}>
        <CustomButton
          title="Cerrar Sesión"
          onPress={handleLogout}
          variant="outline"
          size="large"
        />
      </View>

      {/* Espacio inferior */}
      <View style={{ height: SIZES.padding.xxl }} />
    </ScrollView>
    
    <BottomTabBar navigation={navigation} currentScreen="Profile" />
  </SafeAreaView>
  );
};

export default ProfileScreen;
