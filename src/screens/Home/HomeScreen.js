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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, Card, BottomTabBar } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { generarTipConIA } from '../../services/geminiService';
import { useTheme } from '../../contexts/ThemeContext';
import { getSleepRecords, calculateWeeklyStats } from '../../services/sleepService';
import createStyles from './styles';


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

    const userName = user?.displayName
        ? user.displayName.split(' ')[0]
        : '';

    return (
        <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {userName ? `¡Hola, ${userName}!` : '¡Bienvenido!'}
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>¿Cómo dormiste anoche?</Text>
                </View>

                {/* Tarjeta de última noche */}
                {loading ? (
                    <View style={styles.loadingCard}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Cargando datos...</Text>
                    </View>
                ) : lastRecord ? (
                    <>
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.lastNightCard}
                        >
                            <Text style={styles.lastNightTitle}>Última noche</Text>

                            <View style={styles.lastNightContent}>
                                <View style={styles.lastNightLeft}>
                                    <Text style={styles.lastNightLabel}>Duración</Text>
                                    <Text style={styles.lastNightValue}>{lastRecord.horas_totales}</Text>

                                    <View style={styles.lastNightTimes}>
                                        <View style={styles.timeItem}>
                                            <Ionicons name="bed-outline" size={20} color={colors.textLight} />
                                            <Text style={styles.timeText}>{lastRecord.hora_dormir}</Text>
                                        </View>
                                        <View style={styles.timeItem}>
                                            <Ionicons name="sunny-outline" size={20} color={colors.textLight} />
                                            <Text style={styles.timeText}>{lastRecord.hora_despertar}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.lastNightRight}>
                                    <Text style={{ fontSize: 52 }}>{lastRecord.calidad_emoji}</Text>
                                    <Text style={{ color: colors.textLight, fontSize: 12, marginTop: 4 }}>
                                        {lastRecord.calidad_texto}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>

                        {/* --- NUEVA TARJETA: RECOMENDACIÓN DE LA IA EN HOME --- */}
                        <Card style={{ marginTop: 16, marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Ionicons name="sparkles" size={20} color={colors.primary} style={{ marginRight: 6 }} />
                                <Text style={[styles.cardTitle, { color: colors.text, fontSize: 15 }]}>Consejo de Inteligencia Artificial</Text>
                            </View>
                            <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 20 }}>
                                {lastRecord.recomendacion_tip || "Registra tu sueño con normalidad para ver tu análisis de salud aquí."}
                            </Text>
                        </Card>
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

                {/* Promedio semanal: solo si hay datos */}
                {!loading && weeklyRecords.length > 0 && (
                    <Card style={{ marginTop: 8 }}>
                        <View style={styles.cardTitleContainer}>
                            <Ionicons name="trending-up" size={24} color={colors.primary} style={styles.cardTitleIcon} />
                            <Text style={[styles.cardTitle, { color: colors.text }]}>
                                Promedio Semanal ({stats.totalNights} noche{stats.totalNights !== 1 ? 's' : ''})
                            </Text>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>Calidad</Text>
                                <Text style={[styles.statBoxValue, { color: colors.primary }]}>{stats.averageQuality}/5</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.statBoxLabel, { color: colors.textSecondary }]}>Duración</Text>
                                <Text style={[styles.statBoxValue, { color: colors.primary }]}>{stats.averageDuration}h</Text>
                            </View>
                        </View>
                    </Card>
                )}

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Registrar Sueño"
                        onPress={() => navigation.navigate('SleepTracking')}
                        size="large"
                    />
                </View>

                <View style={styles.actionBoxesContainer}>
                    <TouchableOpacity
                        style={[styles.actionBox, { backgroundColor: colors.surface }]}
                        onPress={() => navigation.navigate('Statistics')}
                    >
                        <Ionicons name="calendar-outline" size={32} color={colors.secondary} />
                        <Text style={[styles.actionBoxText, { color: colors.text }]}>Ver estadísticas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBox, { backgroundColor: colors.surface }]}
                        onPress={() => navigation.navigate('History')}
                    >
                        <Ionicons name="time-outline" size={32} color={colors.coral} />
                        <Text style={[styles.actionBoxText, { color: colors.text }]}>Ver historial</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Home" />
        </SafeAreaView>
    );
};

export default HomeScreen;