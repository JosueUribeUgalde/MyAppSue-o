/**
 * PANTALLA: SleepTracking (Seguimiento de Sueño)
 * 
 * Pantalla para registrar y visualizar el sueño.
 * Permite al usuario ingresar datos de sueño y ver histórico.
 * 
 * Características:
 * - Registrar hora de dormir y despertar
 * - Calidad del sueño
 * - Notas adicionales
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, CustomInput, Card, BottomTabBar } from '../../components';
import { COLORS } from '../../constants';
import { guardarRegistroSueno } from '../../services/sleepService';
import styles from './styles';

const SleepTrackingScreen = ({ navigation }) => {
  // Estados para las horas
  const [bedTime, setBedTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [showBedTimePicker, setShowBedTimePicker] = useState(false);
  const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);
  
  // Estados para calidad y notas
  const [quality, setQuality] = useState(3); // 1-5
  const [notes, setNotes] = useState('');
  const [totalSleep, setTotalSleep] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializar horas por defecto
  useEffect(() => {
    const now = new Date();
    const bed = new Date();
    bed.setHours(23, 30, 0);
    const wake = new Date();
    wake.setHours(7, 0, 0);
    
    setBedTime(bed);
    setWakeTime(wake);
  }, []);

  // Calcular tiempo total de sueño
  useEffect(() => {
    calculateTotalSleep();
  }, [bedTime, wakeTime]);

  const calculateTotalSleep = () => {
    let diff = wakeTime.getTime() - bedTime.getTime();
    
    // Si la hora de despertar es menor, significa que es al día siguiente
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Agregar 24 horas
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTotalSleep(`${hours}h ${minutes}m`);
  };

  const adjustTime = (type, amount) => {
    const time = type === 'bed' ? new Date(bedTime) : new Date(wakeTime);
    time.setMinutes(time.getMinutes() + amount);
    
    if (type === 'bed') {
      setBedTime(time);
    } else {
      setWakeTime(time);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  // Obtener texto y emoji de calidad según el valor
  const getCalidadInfo = (qualityValue) => {
    const calidades = {
      1: { texto: 'Muy malo', emoji: '😫' },
      2: { texto: 'Malo', emoji: '😔' },
      3: { texto: 'Regular', emoji: '😐' },
      4: { texto: 'Bueno', emoji: '😊' },
      5: { texto: 'Excelente', emoji: '😄' }
    };
    return calidades[qualityValue] || calidades[3];
  };

  const handleSaveSleep = async () => {
    try {
      setLoading(true);

      // Obtener info de calidad
      const calidadInfo = getCalidadInfo(quality);

      // Formatear fecha en formato YYYY-MM-DD
      const today = new Date();
      const fechaSueno = today.toISOString().split('T')[0];

      // Preparar datos según el modelo de la base de datos
      const datosDelFormulario = {
        fecha_sueno: fechaSueno,
        hora_dormir: formatTime(bedTime),
        hora_despertar: formatTime(wakeTime),
        horas_totales: totalSleep,
        id_calidad: quality,
        calidad_texto: calidadInfo.texto,
        calidad_emoji: calidadInfo.emoji,
        notas: notes
      };
      
      console.log('Guardando datos:', datosDelFormulario);
      
      // Llamar al servicio de Firebase
      const resultado = await guardarRegistroSueno(datosDelFormulario);
      
      if (resultado.success) {
        Alert.alert(
          '¡Éxito!',
          'Registro de sueño guardado correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                // Resetear formulario
                setNotes('');
                setQuality(3);
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Error',
          resultado.error || 'No se pudo guardar el registro'
        );
      }
    } catch (error) {
      console.error('Error en handleSaveSleep:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al guardar el registro'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Registrar Sueño</Text>

        {/* Hora de Dormir */}
        <Text style={styles.label}>HORA DE DORMIR</Text>
        <Card>
          <View style={styles.timePickerCard}>
            <View style={styles.timePickerContent}>
              <Text style={styles.timeLabel}>ME DORMÍ A</Text>
              <Text style={styles.timeValue}>{formatTime(bedTime)}</Text>
            </View>
            
            <View style={styles.timeButtons}>
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => adjustTime('bed', -15)}
              >
                <Ionicons name="remove" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => adjustTime('bed', 15)}
              >
                <Ionicons name="add" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Hora de Despertar */}
        <Text style={styles.label}>HORA DE DESPERTAR</Text>
        <Card>
          <View style={styles.timePickerCard}>
            <View style={styles.timePickerContent}>
              <Text style={styles.timeLabel}>ME DESPERTÉ A</Text>
              <Text style={styles.timeValue}>{formatTime(wakeTime)}</Text>
            </View>
            
            <View style={styles.timeButtons}>
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => adjustTime('wake', -15)}
              >
                <Ionicons name="remove" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => adjustTime('wake', 15)}
              >
                <Ionicons name="add" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Total Calculado */}
        <Card style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL CALCULADO</Text>
          <Text style={styles.totalSubLabel}>Tiempo de sueño registrado</Text>
          <Text style={styles.totalValue}>{totalSleep}</Text>
        </Card>

        {/* Calidad del Sueño */}
        <Text style={styles.label}>CALIDAD DEL SUEÑO</Text>
        <Card>
          <View style={styles.qualityContainer}>
            <Text style={styles.qualityLabel}>¿Cómo fue tu sueño?</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setQuality(star)}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={star <= quality ? 'star' : 'star-outline'}
                    size={40}
                    color={star <= quality ? COLORS.accent : COLORS.disabled}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.qualityValue}>
              {quality === 1 && 'Muy malo'}
              {quality === 2 && 'Malo'}
              {quality === 3 && 'Regular'}
              {quality === 4 && 'Bueno'}
              {quality === 5 && 'Excelente'}
            </Text>
          </View>
        </Card>

        {/* Notas */}
        <CustomInput
          label="Notas (opcional)"
          placeholder="¿Cómo te sentiste?"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        {/* Botón Guardar */}
        <CustomButton
          title={loading ? "Guardando..." : "Guardar Registro"}
          onPress={handleSaveSleep}
          size="large"
          disabled={loading}
        />

        <Text style={styles.sectionTitle}>Registros Recientes</Text>
        
        <Card>
          <View style={styles.recordItem}>
            <Text style={styles.recordDate}>16 Abril 2026</Text>
            <Text style={styles.recordHours}>7.5 horas</Text>
          </View>
        </Card>

        <Card>
          <View style={styles.recordItem}>
            <Text style={styles.recordDate}>15 Abril 2026</Text>
            <Text style={styles.recordHours}>8.0 horas</Text>
          </View>
        </Card>
      </ScrollView>
      
      <BottomTabBar navigation={navigation} currentScreen="SleepTracking" />
    </SafeAreaView>
  );
};

export default SleepTrackingScreen;
