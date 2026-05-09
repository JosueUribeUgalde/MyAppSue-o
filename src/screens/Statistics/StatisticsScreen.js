import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import { BottomTabBar, Card } from '../../components';
import { COLORS, SIZES } from '../../constants';
import styles from './styles';

const StatisticsScreen = ({ navigation }) => {
    const data = {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [{
            data: [6.5, 7.2, 5.8, 8, 6.2, 9, 7.5]
        }]
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        // Fondo de la gráfica usando tu color claro
        backgroundColor: COLORS.textLight,
        backgroundGradientFrom: COLORS.textLight,
        backgroundGradientTo: COLORS.textLight,
        decimalPlaces: 1,

        // COLOR DE LAS BARRAS: Usamos el Morado Lavanda (#969AB4)
        color: (opacity = 1) => `rgba(150, 154, 180, ${opacity})`,

        // COLOR DE TEXTO: Usamos tu Gris secundario (#7F8C8D)
        labelColor: (opacity = 1) => COLORS.textSecondary,

        barPercentage: 0.6,
        propsForLabels: {
            fontSize: SIZES.font.small
        },
        style: {
            borderRadius: SIZES.borderRadius.lg
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Estadísticas</Text>
                    <Text style={styles.subtitle}>Análisis de tu sueño</Text>
                </View>

                {/* Card con tus bordes redondeados (16px) */}
                <Card style={{ borderRadius: SIZES.borderRadius.lg }}>
                    <Text style={styles.cardTitle}>
                        Calidad de Sueño Semanal
                    </Text>

                    <BarChart
                        data={data}
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
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="Statistics" />
        </SafeAreaView>
    );
};

export default StatisticsScreen;