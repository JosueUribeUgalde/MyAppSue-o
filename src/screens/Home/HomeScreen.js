/**
 * PANTALLA: Home (Inicio)
 * 
 * Pantalla principal de la app de seguimiento de sueño.
 * Muestra resumen del sueño y accesos rápidos.
 * 
 * Características:
 * - Resumen de sueñ o de anoche
 * - Estadísticas semanales
 * - Acceso rápido a registrar sueño
 */


import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { getSleepRecords, calculateWeeklyStats } from '../../services/sleepService';
import createStyles from './styles.js';

const parseHours = (hoursText) => {
    if (!hoursText) return 0;
    const match = String(hoursText).match(/(\d+)h\s*(\d*)m?/);
    if (!match) return parseFloat(hoursText) || 0;

    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    return hours + minutes / 60;
};

const getShortDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(`${dateStr}T12:00:00`);
    return date.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase();
};

const HomeScreen = ({ navigation }) => {
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

    const lastRecord = records[0] || null;
    const weeklyRecords = records.slice(0, 7);
    const stats = calculateWeeklyStats(weeklyRecords);
    const qualityPercent = lastRecord?.id_calidad
        ? Math.min(100, Math.round((lastRecord.id_calidad / 5) * 100))
        : 0;
    const weeklyBars = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        const dateKey = date.toISOString().split('T')[0];
        const record = records.find((item) => item.fecha_sueno === dateKey);
        const hours = parseHours(record?.horas_totales);

        return {
            id: dateKey,
            label: getShortDay(dateKey),
            height: record ? Math.max(28, Math.min(86, hours * 7)) : 28,
            hasRecord: Boolean(record),
        };
    });
    const fallbackWeeklyBars = weeklyRecords.length > 0 && !weeklyBars.some((bar) => bar.hasRecord)
        ? [...weeklyRecords].reverse().map((record) => {
            const hours = parseHours(record?.horas_totales);
            return {
                id: record.id,
                label: getShortDay(record.fecha_sueno),
                height: Math.max(28, Math.min(86, hours * 7)),
                hasRecord: true,
            };
        })
        : weeklyBars;

    const userName = user?.displayName
        ? user.displayName.split(' ')[0]
        : '';

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>
                            {userName ? `Hola, ${userName}` : 'Hola'}
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Es hora de relajarse</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton} activeOpacity={0.75}>
                        <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.loadingCard}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Cargando datos...</Text>
                    </View>
                ) : lastRecord ? (
                    <>
                        <View style={styles.lastNightCard}>
                            <View style={styles.cardHeaderRow}>
                                <Text style={styles.eyebrow}>Última noche</Text>
                            </View>

                            <View style={styles.sleepSummaryRow}>
                                <View style={styles.sleepMainColumn}>
                                    <Text style={styles.lastNightValue}>{lastRecord.horas_totales}</Text>
                                    <Text style={styles.lastNightLabel}>Duración de sueño</Text>
                                </View>
                                <View style={styles.qualityRing}>
                                    <Text style={styles.qualityPercent}>{qualityPercent}%</Text>
                                </View>
                            </View>

                            <View style={styles.metricGrid}>
                                <View style={styles.metricItem}>
                                    <Ionicons name="moon-outline" size={13} color={colors.textSecondary} />
                                    <Text style={styles.metricLabel}>Dormir</Text>
                                    <Text style={styles.metricValue}>{lastRecord.hora_dormir}</Text>
                                </View>
                                <View style={styles.metricItem}>
                                    <Ionicons name="sunny-outline" size={13} color={colors.textSecondary} />
                                    <Text style={styles.metricLabel}>Despertar</Text>
                                    <Text style={styles.metricValue}>{lastRecord.hora_despertar}</Text>
                                </View>
                                <View style={styles.metricItem}>
                                    <Ionicons name="pulse-outline" size={13} color={colors.textSecondary} />
                                    <Text style={styles.metricLabel}>Calidad</Text>
                                    <Text style={[styles.metricValue, { color: colors.primary }]}>
                                        {lastRecord.calidad_texto}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.aiCard}>
                            <View style={styles.aiIcon}>
                                <Ionicons name="sparkles" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.aiContent}>
                                <Text style={styles.cardTitle}>Consejo de IA</Text>
                                <Text style={styles.aiText}>
                                    {lastRecord.recomendacion_tip || 'Mantén una rutina estable para mejorar tu calidad de sueño.'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.weeklyCard}>
                            <View style={styles.weeklyHeader}>
                                <Text style={styles.cardTitle}>Promedio Semanal</Text>
                                <Text style={styles.weeklyValue}>{stats.averageDuration}h</Text>
                            </View>
                            <View style={styles.weeklyChart}>
                                {fallbackWeeklyBars.map((bar) => (
                                    <View key={bar.id} style={styles.weeklyBarItem}>
                                        <View style={styles.weeklyBarTrack}>
                                            <View
                                                style={[
                                                    styles.weeklyBar,
                                                    {
                                                        height: bar.height,
                                                        backgroundColor: bar.hasRecord ? colors.primary : colors.borderStrong,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <Text style={styles.weeklyBarLabel}>{bar.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.emptyStateCard}>
                        <Ionicons name="moon-outline" size={56} color={colors.primary} />
                        <Text style={[styles.emptyStateTitle, { color: colors.text }]}>Sin registros aún</Text>
                        <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                            Registra tu primer sueño para ver{'\n'}tus estadísticas aquí
                        </Text>
                    </View>
                )}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Home" />
        </SafeAreaView>
    );
};

export default HomeScreen;
