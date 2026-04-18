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

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CustomButton, CustomInput, Card } from '../../components';
import styles from './styles';

const SleepTrackingScreen = () => {
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveSleep = () => {
    // Aquí irá la lógica para guardar en Firebase
    console.log('Guardar sueño:', { bedTime, wakeTime, notes });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Sueño</Text>

      <Card>
        <CustomInput
          label="Hora de Dormir"
          placeholder="22:00"
          value={bedTime}
          onChangeText={setBedTime}
        />

        <CustomInput
          label="Hora de Despertar"
          placeholder="07:00"
          value={wakeTime}
          onChangeText={setWakeTime}
        />

        <CustomInput
          label="Notas (opcional)"
          placeholder="¿Cómo te sentiste?"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <CustomButton
          title="Guardar Registro"
          onPress={handleSaveSleep}
          size="large"
        />
      </Card>

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
  );
};

export default SleepTrackingScreen;
