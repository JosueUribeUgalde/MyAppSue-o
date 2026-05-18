/**
 * PANTALLA: Tips (Consejos)
 * * Pantalla de consejos y recomendaciones para mejorar el sueño.
 * Muestra tips personalizados y educación sobre higiene del sueño ordenados por día.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth'; // Para saber qué usuario está logueado
import { getSleepRecords } from '../../services/sleepService';
import { getUserProfile } from '../../services/userService';
import { getDailyRecommendation } from './sleepRecommendations'; // Tu lógica en la misma carpeta
import createStyles from './styles';

const TipsScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { user } = useAuth();
    const styles = createStyles(colors);

    // Estados para controlar los datos y la carga
    const [loading, setLoading] = useState(true);
    const [sleepGoal, setSleepGoal] = useState(8);
    // ¡Actualizado! Ahora guardamos todo el historial completo de noches
    const [sleepRecords, setSleepRecords] = useState([]);

    const loadTipsData = useCallback(async () => {
        if (!user || user.isGuest) {
            setLoading(false);
            return;
        }
        setLoading(true);

        // Traemos los registros de sueño y el perfil del usuario al mismo tiempo
        const [sleepResult, profileResult] = await Promise.all([
            getSleepRecords(user.uid),
            getUserProfile(user.uid)
        ]);

        if (sleepResult.success && sleepResult.data?.length > 0) {
            // Guardamos todos los registros del historial para el scroll día por día
            setSleepRecords(sleepResult.data);
        }

        if (profileResult.success && profileResult.data?.sleepGoal) {
            setSleepGoal(profileResult.data.sleepGoal); // Guardamos la meta
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        loadTipsData();
    }, [loadTipsData]);

    // Función auxiliar para formatear la fecha de forma más legible (ej: lunes, 18 de mayo)
    const formatDisplayDate = (dateString) => {
        try {
            // Añadimos la T00:00:00 para evitar desfases de zona horaria al parsear YYYY-MM-DD
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
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Historial de recomendaciones personalizadas</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                ) : sleepRecords.length > 0 ? (
                    // Recorremos los registros de sueño día por día con un ciclo .map()
                    sleepRecords.map((record) => {
                        // Intentamos usar el tip fijo guardado en Firebase, de lo contrario usamos la función de respaldo
                        const recommendationMessage = record.recomendacion_tip || getDailyRecommendation(record.horas_totales, sleepGoal);

                        return (
                            <Card key={record.id} style={{ marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="bulb" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                                        <Text style={[styles.cardTitle, { color: colors.text, fontSize: 16, capitalize: true }]}>
                                            {formatDisplayDate(record.fecha_sueno)}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 14 }}>
                                        {record.calidad_emoji || '🌙'}
                                    </Text>
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
                    // Caso alternativo si el usuario no tiene ninguna noche registrada aún
                    <Card>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Ionicons name="moon-outline" size={40} color={colors.textSecondary} style={{ marginBottom: 10 }} />
                            <Text style={[styles.cardText, { color: colors.textSecondary, textAlign: 'center' }]}>
                                No hay registros de sueño disponibles. ¡Registra tu primera noche en la pestaña de seguimiento para generar tus tips!
                            </Text>
                        </View>
                    </Card>
                )}
                {/* Margen extra inferior para que el último elemento no se tape con la barra de navegación */}
                <View style={{ height: 40 }} />
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Tips" />
        </SafeAreaView>
    );
};

export default TipsScreen;