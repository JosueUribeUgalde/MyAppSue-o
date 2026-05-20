/**
 * PANTALLA: Tips (Consejos)
 * * Muestra el historial de consejos personalizados generados por IA día por día.
 */

/**
 * PANTALLA: Tips (Consejos)
 * * Muestra el historial de consejos personalizados generados por IA día por día.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { getSleepRecords } from '../../services/sleepService';
import createStyles from './styles';

const TipsScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { user } = useAuth();
    const styles = createStyles(colors);

    const [loading, setLoading] = useState(true);
    const [sleepRecords, setSleepRecords] = useState([]);

    const loadTipsData = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const result = await getSleepRecords(user.uid);
        if (result.success) {
            setSleepRecords(result.data);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        loadTipsData();
    }, [loadTipsData]);

    // Función para darle formato bonito a la fecha (Ej: lunes, 19 de mayo)
    const formatDisplayDate = (dateString) => {
        try {
            if (!dateString) return '';
            const date = new Date(`${dateString}T00:00:00`);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Tips Diarios</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Consejos de Inteligencia Artificial por cada noche</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                ) : sleepRecords.length > 0 ? (
                    sleepRecords.map((record) => {
                        // Si el registro es viejo y no tiene tip de IA, dejamos un mensaje de respaldo elegante
                        const recommendationMessage = record.recomendacion_tip ||
                            "Mantén un horario regular para dormir y despierta a la misma hora para sincronizar tu reloj biológico.";

                        return (
                            <Card key={record.id} style={{ marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="bulb" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                                        <Text style={[styles.cardTitle, { color: colors.text, fontSize: 16, textTransform: 'capitalize' }]}>
                                            {formatDisplayDate(record.fecha_sueno)}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 18 }}>{record.calidad_emoji || '🌙'}</Text>
                                </View>

                                <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>
                                    Duración: {record.horas_totales} • Calidad: {record.calidad_texto || 'No registrada'}
                                </Text>

                                <Text style={[styles.cardText, { color: colors.textSecondary, lineHeight: 22, fontSize: 14 }]}>
                                    {recommendationMessage}
                                </Text>
                            </Card>
                        );
                    })
                ) : (
                    <Card>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Ionicons name="moon-outline" size={40} color={colors.textSecondary} style={{ marginBottom: 10 }} />
                            <Text style={[styles.cardText, { color: colors.textSecondary, textAlign: 'center' }]}>
                                Aún no tienes noches registradas. ¡Registra tu sueño para recibir consejos personalizados de la IA!
                            </Text>
                        </View>
                    </Card>
                )}
                <View style={{ height: 40 }} />
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Tips" />
        </SafeAreaView>
    );
};

export default TipsScreen;