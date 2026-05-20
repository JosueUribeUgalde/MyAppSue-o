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
import { View, Text, ScrollView, Alert, Switch, ActivityIndicator, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, Card, BottomTabBar } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { AVATAR_OPTIONS, DEFAULT_AVATAR_ID, getAvatarSource } from '../../constants/avatars';
import { getSleepRecords, calculateWeeklyStats } from '../../services/sleepService';
import { getUserProfile, updateUserProfile } from '../../services/userService';
import createStyles from './styles';

const ProfileScreen = ({ navigation, authUser }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  const currentUser = authUser || user;

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingAvatarId, setSavingAvatarId] = useState(null);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Cargar datos del perfil guardados en Firestore
  const loadProfile = useCallback(async () => {
    if (!currentUser) {
      setLoadingProfile(false);
      return;
    }

    setLoadingProfile(true);
    const result = await getUserProfile(currentUser.uid);
    const data = result.success ? result.data : {};

    setProfileData(data);
    setLoadingProfile(false);
  }, [currentUser]);

  // Cargar estadísticas del usuario
  const loadStats = useCallback(async () => {
    if (!currentUser) {
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
    loadProfile();
    loadStats();
  }, [loadProfile, loadStats]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    setIsLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    const result = await logout();
    setIsLoggingOut(false);

    if (result.success) {
      setIsLogoutModalVisible(false);
    } else {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  // Obtener iniciales del nombre o email
  const getInitials = () => {
    const displayName = profileData?.displayName || currentUser?.displayName;
    if (displayName) {
      return displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return currentUser?.email?.[0]?.toUpperCase() || 'U';
  };

  const getPhotoStatus = () => {
    const selectedAvatarId = profileData?.avatarId || profileData?.photoURL;
    const photoURL = profileData?.photoURL || currentUser?.photoURL;

    if (selectedAvatarId && AVATAR_OPTIONS.some((avatar) => avatar.id === selectedAvatarId)) {
      return 'Avatar elegido';
    }

    return photoURL ? 'Configurada' : 'Sin foto';
  };

  const selectedAvatarId = profileData?.avatarId || profileData?.photoURL || DEFAULT_AVATAR_ID;
  const selectedAvatarSource = getAvatarSource(selectedAvatarId, profileData?.photoURL || currentUser?.photoURL);

  const handleSelectAvatar = async (avatarId) => {
    if (!currentUser || savingAvatarId) {
      return;
    }

    setSavingAvatarId(avatarId);
    const result = await updateUserProfile(currentUser.uid, {
      avatarId,
      photoURL: avatarId,
      email: profileData?.email || currentUser.email || '',
      displayName: profileData?.displayName || currentUser.displayName || 'Usuario',
      sleepGoal: profileData?.sleepGoal || 8,
    });
    setSavingAvatarId(null);

    if (result.success) {
      setProfileData((previousData) => ({
        ...previousData,
        avatarId,
        photoURL: avatarId,
      }));
      setIsAvatarModalVisible(false);
    } else {
      Alert.alert('Error', 'No se pudo actualizar el avatar');
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          {selectedAvatarSource ? (
            <Image source={selectedAvatarSource} style={styles.avatarImage} resizeMode="cover" />
          ) : (
            <Text style={styles.avatarText}>{getInitials()}</Text>
          )}
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {profileData?.displayName || currentUser?.displayName || 'Usuario'}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {profileData?.email || currentUser?.email || 'Sin correo'}
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

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Editar perfil</Text>

      <Card>
        {loadingProfile ? (
          <View style={styles.loadingStats}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Nombre
              </Text>
              <Text
                style={[styles.statValue, styles.profileValue, { color: colors.primary }]}
                numberOfLines={1}
              >
                {profileData?.displayName || currentUser?.displayName || 'Usuario'}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Correo
              </Text>
              <Text
                style={[styles.statValue, styles.profileValue, { color: colors.primary }]}
                numberOfLines={1}
              >
                {profileData?.email || currentUser?.email || 'Sin correo'}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Meta de sueño
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {profileData?.sleepGoal || 8}h
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Foto de perfil
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {getPhotoStatus()}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <TouchableOpacity
              style={styles.editProfileRow}
              onPress={() => setIsAvatarModalVisible(true)}
              activeOpacity={0.75}
            >
              <View style={styles.editProfileAction}>
                <Ionicons name="camera-outline" size={20} color={colors.primary} />
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Editar foto
                </Text>
              </View>
              <View style={styles.editProfileAction}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  Cambiar
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <TouchableOpacity
              style={styles.editProfileRow}
              onPress={handleEditProfile}
              activeOpacity={0.75}
            >
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Editar datos
              </Text>
              <View style={styles.editProfileAction}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  Editar
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          </>
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
    <Modal
      visible={isLogoutModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsLogoutModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.confirmModal, { backgroundColor: colors.surface }]}>
          <View style={[styles.confirmIcon, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="log-out-outline" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Cerrar sesión
          </Text>
          <Text style={[styles.confirmMessage, { color: colors.textSecondary }]}>
            ¿Seguro que quieres salir de tu cuenta?
          </Text>
          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.confirmButtonOutline, { borderColor: colors.border }]}
              onPress={() => setIsLogoutModalVisible(false)}
              activeOpacity={0.75}
              disabled={isLoggingOut}
            >
              <Text style={[styles.confirmButtonText, { color: colors.textSecondary }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: colors.primary }]}
              onPress={confirmLogout}
              activeOpacity={0.75}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator size="small" color={colors.textLight} />
              ) : (
                <Text style={[styles.confirmButtonText, { color: colors.textLight }]}>
                  Salir
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    <Modal
      visible={isAvatarModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsAvatarModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.avatarModal, { backgroundColor: colors.surface }]}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Editar foto
              </Text>
              <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                Elige tu avatar animal
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: colors.surface }]}
              onPress={() => setIsAvatarModalVisible(false)}
              activeOpacity={0.75}
              disabled={Boolean(savingAvatarId)}
            >
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {savingAvatarId ? (
            <View style={styles.modalSavingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.modalSavingText, { color: colors.textSecondary }]}>
                Guardando avatar...
              </Text>
            </View>
          ) : null}
          <View style={styles.avatarGrid}>
            {AVATAR_OPTIONS.map((avatar) => {
              const isSelected = avatar.id === selectedAvatarId;
              const isSaving = savingAvatarId === avatar.id;

              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarOption,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                      backgroundColor: colors.surface,
                    },
                  ]}
                  onPress={() => handleSelectAvatar(avatar.id)}
                  activeOpacity={0.75}
                  disabled={Boolean(savingAvatarId)}
                >
                  <View style={[styles.avatarOptionImageFrame, { borderColor: colors.border }]}>
                    <Image source={avatar.source} style={styles.avatarOptionImage} resizeMode="cover" />
                  </View>
                  <View style={styles.avatarOptionFooter}>
                    <Text
                      style={[
                        styles.avatarOptionLabel,
                        { color: isSelected ? colors.primary : colors.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {avatar.label}
                    </Text>
                    {isSelected && !isSaving ? (
                      <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
  );
};

export default ProfileScreen;
