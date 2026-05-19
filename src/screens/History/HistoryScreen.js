/**
 * PANTALLA: History (Historial)
 * 
 * Pantalla de historial de registros de sueño.
 * Muestra el histórico completo de todos los registros.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { getSleepRecords, deleteSleepRecord } from '../../services/sleepService';
import createStyles from './styles';

const HistoryScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const result = await getSleepRecords(user.uid);
    if (result.success) {
      setRecords(result.data);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (recordId, fecha) => {
    Alert.alert(
      'Eliminar registro',
      `¿Estás seguro de que deseas eliminar el registro del ${fecha}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteSleepRecord(recordId);
            if (result.success) {
              Alert.alert('Éxito', 'Registro eliminado correctamente');
              loadData(); // Recargar datos
            } else {
              Alert.alert('Error', 'No se pudo eliminar el registro');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long'
    });
  };

  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Agrupar registros por mes
  const groupedRecords = records.reduce((acc, record) => {
    const monthYear = getMonthYear(record.fecha_sueno);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(record);
    return acc;
  }, {});

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
            Cargando historial...
          </Text>
        </View>
        <BottomTabBar navigation={navigation} currentScreen="History" />
      </SafeAreaView>
    );
  }

  if (records.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Historial</Text>
            <Text style={styles.subtitle}>Todos tus registros de sueño</Text>
          </View>

          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.primary} />
            <Text style={styles.emptyStateTitle}>Sin registros</Text>
            <Text style={styles.emptyStateText}>
              Aún no has registrado ningún sueño.{'\n'}
              Comienza registrando tu primer noche.
            </Text>
          </View>
        </ScrollView>
        <BottomTabBar navigation={navigation} currentScreen="History" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Historial</Text>
          <Text style={styles.subtitle}>Todos tus registros de sueño</Text>
        </View>

        <Text style={styles.recordsCount}>
          📊 {records.length} registro{records.length !== 1 ? 's' : ''} guardado{records.length !== 1 ? 's' : ''}
        </Text>

        {Object.entries(groupedRecords).map(([monthYear, monthRecords]) => (
          <View key={monthYear}>
            <Text style={styles.monthDivider}>{monthYear}</Text>
            
            {monthRecords.map((record) => (
              <Card key={record.id} style={styles.recordCard}>
                <View style={styles.recordHeader}>
                  <Text style={styles.recordDate}>
                    {formatDateShort(record.fecha_sueno)}
                  </Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(record.id, formatDateShort(record.fecha_sueno))}
                  >
                    <Ionicons name="trash-outline" size={22} color={colors.coral} />
                  </TouchableOpacity>
                </View>

                <View style={styles.recordInfo}>
                  <View style={styles.recordInfoLeft}>
                    <View style={styles.recordInfoRow}>
                      <Ionicons name="bed-outline" size={18} color={colors.primary} />
                      <Text style={styles.recordLabel}>Dormir:</Text>
                      <Text style={styles.recordValue}>{record.hora_dormir}</Text>
                    </View>

                    <View style={styles.recordInfoRow}>
                      <Ionicons name="sunny-outline" size={18} color={colors.secondary} />
                      <Text style={styles.recordLabel}>Despertar:</Text>
                      <Text style={styles.recordValue}>{record.hora_despertar}</Text>
                    </View>

                    <View style={styles.recordInfoRow}>
                      <Ionicons name="time-outline" size={18} color={colors.accent} />
                      <Text style={styles.recordLabel}>Total:</Text>
                      <Text style={styles.recordValue}>{record.horas_totales}</Text>
                    </View>
                  </View>

                  <View style={styles.recordQuality}>
                    <Text style={styles.recordQualityEmoji}>{record.calidad_emoji}</Text>
                    <Text style={styles.recordQualityText}>{record.calidad_texto}</Text>
                  </View>
                </View>

                {record.notas && record.notas.trim() !== '' && (
                  <View style={styles.recordNotes}>
                    <Text style={styles.recordNotesLabel}>NOTAS</Text>
                    <Text style={styles.recordNotesText}>{record.notas}</Text>
                  </View>
                )}
              </Card>
            ))}
          </View>
        ))}

        {/* Espacio inferior */}
        <View style={{ height: SIZES.padding.xxl }} />
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="History" />
    </SafeAreaView>
  );
};

export default HistoryScreen;
