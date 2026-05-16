import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBar, Card } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { getSleepRecords } from '../../services/sleepService';
import createStyles from './styles';

const StatisticsScreen = ({ navigation }) => {
    const { user } = useAuth();
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weekData, setWeekData] = useState(null);

    // Cargar datos del usuario
    const loadData = useCallback(async () => {
        if (!user || user.isGuest) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const result = await getSleepRecords(user.uid);
        if (result.success) {
            setRecords(result.data);
            processWeekData(result.data);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Procesar datos de la última semana
    const processWeekData = (allRecords) => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 6); // Últimos 7 días

        // Crear array de los últimos 7 días
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            last7Days.push(date.toISOString().split('T')[0]);
        }

        // Mapear registros a días
        const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const durationData = [];
        const qualityData = [];
        const labels = [];

        last7Days.forEach((dateStr, index) => {
            const record = allRecords.find(r => r.fecha_sueno === dateStr);
            const date = new Date(dateStr);
            const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // Ajustar domingo
            
            labels.push(dayLabels[dayIndex]);
            
            if (record) {
                // Parsear horas_totales
                const hours = parseHours(record.horas_totales);
                durationData.push(hours);
                qualityData.push(record.id_calidad || 0);
            } else {
                durationData.push(0);
                qualityData.push(0);
            }
        });

        // Calcular promedios
        const recordsWithData = durationData.filter(h => h > 0);
        const qualityWithData = qualityData.filter(q => q > 0);
        
        const avgDuration = recordsWithData.length > 0 
            ? (recordsWithData.reduce((a, b) => a + b, 0) / recordsWithData.length).toFixed(1)
            : 0;
        
        const avgQuality = qualityWithData.length > 0
            ? (qualityWithData.reduce((a, b) => a + b, 0) / qualityWithData.length).toFixed(1)
            : 0;

        setWeekData({
            labels,
            durationData,
            qualityData,
            avgDuration,
            avgQuality,
            totalNights: recordsWithData.length,
            dateRange: `${formatDateShort(last7Days[0])} - ${formatDateShort(last7Days[6])}`
        });
    };

    const parseHours = (horasTotales) => {
        if (!horasTotales) return 0;
        const match = String(horasTotales).match(/(\d+)h\s*(\d*)m?/);
        if (!match) return parseFloat(horasTotales) || 0;
        const horas = parseInt(match[1]) || 0;
        const minutos = parseInt(match[2]) || 0;
        return horas + minutos / 60;
    };

    const formatDateShort = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundColor: colors.textLight,
        backgroundGradientFrom: colors.textLight,
        backgroundGradientTo: colors.textLight,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(150, 154, 180, ${opacity})`,
        labelColor: (opacity = 1) => colors.textSecondary,
        barPercentage: 0.6,
        propsForLabels: {
            fontSize: SIZES.font.small
        },
        style: {
            borderRadius: SIZES.borderRadius.lg
        }
    };

    const chartConfigQuality = {
        ...chartConfig,
        color: (opacity = 1) => `rgba(236, 140, 140, ${opacity})`, // Color coral
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
                        Cargando estadísticas...
                    </Text>
                </View>
                <BottomTabBar navigation={navigation} currentScreen="Statistics" />
            </SafeAreaView>
        );
    }

    if (!weekData || weekData.totalNights === 0) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Estadísticas</Text>
                        <Text style={styles.subtitle}>Análisis de tu sueño</Text>
                    </View>

                    <View style={styles.emptyState}>
                        <Ionicons name="bar-chart-outline" size={64} color={colors.primary} />
                        <Text style={styles.emptyStateTitle}>Sin datos suficientes</Text>
                        <Text style={styles.emptyStateText}>
                            Registra al menos un día de sueño{'\n'}para ver tus estadísticas
                        </Text>
                    </View>
                </ScrollView>
                <BottomTabBar navigation={navigation} currentScreen="Statistics" />
            </SafeAreaView>
        );
    }

    const durationChartData = {
        labels: weekData.labels,
        datasets: [{ data: weekData.durationData.map(d => d || 0.1) }] // Mínimo 0.1 para visualizar
    };

    const qualityChartData = {
        labels: weekData.labels,
        datasets: [{ data: weekData.qualityData.map(q => q || 0.1) }]
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Estadísticas</Text>
                    <Text style={styles.subtitle}>Análisis de tu sueño</Text>
                </View>

                <Text style={styles.weekRange}>
                    📅 Semana del {weekData.dateRange}
                </Text>

                {/* Cards de resumen */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Promedio de Horas</Text>
                        <Text style={styles.statValue}>{weekData.avgDuration}h</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Calidad Promedio</Text>
                        <Text style={styles.statValue}>{weekData.avgQuality}/5</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Noches Registradas</Text>
                        <Text style={styles.statValue}>{weekData.totalNights}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Mejor Noche</Text>
                        <Text style={styles.statValue}>
                            {Math.max(...weekData.durationData.filter(d => d > 0)).toFixed(1)}h
                        </Text>
                    </View>
                </View>

                {/* Gráfica de Duración del Sueño */}
                <Card style={{ borderRadius: SIZES.borderRadius.lg, marginBottom: SIZES.padding.lg }}>
                    <Text style={styles.cardTitle}>
                        Horas de Sueño Diarias
                    </Text>

                    <BarChart
                        data={durationChartData}
                        width={screenWidth - (SIZES.padding.lg * 4)}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="h"
                        chartConfig={chartConfig}
                        fromZero={true}
                        style={{
                            marginVertical: SIZES.padding.md,
                            borderRadius: SIZES.borderRadius.lg,
                            paddingRight: 45
                        }}
                        showValuesOnTopOfBars={true}
                    />
                </Card>

                {/* Gráfica de Calidad del Sueño */}
                <Card style={{ borderRadius: SIZES.borderRadius.lg }}>
                    <Text style={styles.cardTitle}>
                        Calidad del Sueño Diaria
                    </Text>
                    <Text style={styles.cardText}>
                        Escala de 1 (muy malo) a 5 (excelente)
                    </Text>

                    <BarChart
                        data={qualityChartData}
                        width={screenWidth - (SIZES.padding.lg * 4)}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="/5"
                        chartConfig={chartConfigQuality}
                        fromZero={true}
                        style={{
                            marginVertical: SIZES.padding.md,
                            borderRadius: SIZES.borderRadius.lg,
                            paddingRight: 45
                        }}
                        showValuesOnTopOfBars={true}
                    />
                </Card>
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Statistics" />
        </SafeAreaView>
    );
};

export default StatisticsScreen ;