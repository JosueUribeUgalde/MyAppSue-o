/**
 * PANTALLA: Tips (Consejos)
 * * Pantalla de consejos y recomendaciones para mejorar el sueño.
 * Muestra tips personalizados y educación sobre higiene del sueño.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext'; // Para saber qué usuario está logueado
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
    const [lastRecord, setLastRecord] = useState(null);

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
            setLastRecord(sleepResult.data[0]); // Guardamos la última noche
        }

        if (profileResult.success && profileResult.data?.sleepGoal) {
            setSleepGoal(profileResult.data.sleepGoal); // Guardamos la meta
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        loadTipsData();
    }, [loadTipsData]);

    // Calculamos el consejo dinámico basado en lo que cargó de Firebase
    const recommendationMessage = getDailyRecommendation(lastRecord?.horas_totales, sleepGoal);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Tips</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Mejora la calidad de tu sueño</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <Card>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Ionicons name="bulb" size={24} color={colors.primary} style={{ marginRight: 8 }} />
                            <Text style={[styles.cardTitle, { color: colors.text }]}>Consejos personalizados</Text>
                        </View>
                        {/* Aquí ya quitamos el "En desarrollo..." y pintamos tu mensaje dinámico */}
                        <Text style={[styles.cardText, { color: colors.textSecondary, lineHeight: 22 }]}>
                            {recommendationMessage}
                        </Text>
                    </Card>
                )}
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Tips" />
        </SafeAreaView>
    );
};

export default TipsScreen;