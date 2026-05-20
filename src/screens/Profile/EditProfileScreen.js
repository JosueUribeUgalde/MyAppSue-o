/**
 * PANTALLA: EditProfile (Editar Perfil)
 *
 * Permite actualizar los datos del perfil guardados en Firestore.
 */

import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card, CustomButton, CustomInput } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { getUserProfile, updateUserProfile } from '../../services/userService';
import createStyles from './styles';

const EditProfileScreen = ({ navigation, authUser }) => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const currentUser = authUser || user;

  const [profileData, setProfileData] = useState(null);
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    email: '',
    sleepGoal: '8',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const buildProfileForm = useCallback((data = {}) => ({
    displayName: data.displayName || currentUser?.displayName || '',
    email: data.email || currentUser?.email || '',
    sleepGoal: String(data.sleepGoal || 8),
  }), [currentUser]);

  const loadProfile = useCallback(async () => {
    if (!currentUser) {
      setLoadingProfile(false);
      return;
    }

    setLoadingProfile(true);
    const result = await getUserProfile(currentUser.uid);
    const data = result.success ? result.data : {};

    setProfileData(data);
    setProfileForm(buildProfileForm(data));
    setLoadingProfile(false);
  }, [buildProfileForm, currentUser]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleProfileFieldChange = (field, value) => {
    setProfileForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigation.navigate('Profile');
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'No hay un usuario autenticado');
      return;
    }

    const displayName = profileForm.displayName.trim();
    const sleepGoal = Number(profileForm.sleepGoal);

    if (!displayName) {
      Alert.alert('Dato requerido', 'Escribe tu nombre');
      return;
    }

    if (!Number.isFinite(sleepGoal) || sleepGoal < 1 || sleepGoal > 24) {
      Alert.alert('Meta inválida', 'La meta de sueño debe estar entre 1 y 24 horas');
      return;
    }

    setSavingProfile(true);
    const updates = {
      displayName,
      email: profileForm.email || currentUser.email || '',
      sleepGoal,
    };
    const result = await updateUserProfile(currentUser.uid, updates);
    setSavingProfile(false);

    if (result.success) {
      setProfileData((previousData) => ({
        ...previousData,
        ...updates,
      }));
      Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente');
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'No se pudo guardar el perfil');
    }
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.editScreenHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleCancel}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.editScreenTitleGroup}>
            <Text style={[styles.name, { color: colors.text }]}>Editar perfil</Text>
            <Text style={[styles.email, { color: colors.textSecondary }]}>
              Actualiza tus datos personales
            </Text>
          </View>
        </View>

        <Card>
          {loadingProfile ? (
            <View style={styles.loadingStats}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          ) : (
            <>
              <CustomInput
                label="Nombre"
                placeholder="Tu nombre"
                value={profileForm.displayName}
                onChangeText={(value) => handleProfileFieldChange('displayName', value)}
              />
              <CustomInput
                label="Correo"
                placeholder="correo@ejemplo.com"
                value={profileForm.email}
                editable={false}
              />
              <CustomInput
                label="Meta de sueño (horas)"
                placeholder="8"
                value={profileForm.sleepGoal}
                onChangeText={(value) => handleProfileFieldChange('sleepGoal', value)}
                keyboardType="numeric"
              />
              <View style={styles.editActions}>
                <CustomButton
                  title="Cancelar"
                  onPress={handleCancel}
                  variant="outline"
                  disabled={savingProfile}
                  style={styles.editActionButton}
                />
                <CustomButton
                  title="Guardar"
                  onPress={handleSaveProfile}
                  loading={savingProfile}
                  disabled={savingProfile}
                  style={styles.editActionButton}
                />
              </View>
            </>
          )}
        </Card>

        <View style={{ height: SIZES.padding.xxl }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} currentScreen="Profile" />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
