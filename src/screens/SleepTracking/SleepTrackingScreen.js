

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, CustomInput, Card, BottomTabBar } from '../../components';
import { SIZES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { guardarRegistroSueno, verificarRegistroDuplicado, getSleepRecords } from '../../services/sleepService';
import { generarTipConIA } from '../../services/geminiService';
import createStyles from './styles';

const SleepTrackingScreen = ({ navigation }) => {
    const { user } = useAuth();
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Estados para fecha
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [existeRegistro, setExisteRegistro] = useState(false);

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
    const [recentRecords, setRecentRecords] = useState([]);

    // Inicializar horas por defecto
    useEffect(() => {
        const bed = new Date();
        bed.setHours(23, 30, 0, 0);
        const wake = new Date();
        wake.setHours(7, 0, 0, 0);

        setBedTime(bed);
        setWakeTime(wake);
    }, []);

    // Cargar registros recientes
    useEffect(() => {
        const cargarRegistrosRecientes = async () => {
            if (!user) return;

            const resultado = await getSleepRecords(user.uid);
            if (resultado.success) {
                setRecentRecords(resultado.data.slice(0, 2)); // Solo los últimos 2
            }
        };

        cargarRegistrosRecientes();
    }, [user]);

    // Verificar si ya existe un registro para la fecha seleccionada
    useEffect(() => {
        const verificarFecha = async () => {
            if (!user) return;

            const fechaFormato = formatDate(selectedDate);
            const resultado = await verificarRegistroDuplicado(user.uid, fechaFormato);

            if (resultado.success && resultado.existe) {
                setExisteRegistro(true);
            } else {
                setExisteRegistro(false);
            }
        };

        verificarFecha();
    }, [selectedDate, user]);

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

    // Corrección para evitar desfases de fechas por zonas horarias (UTC vs Local)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Retorna YYYY-MM-DD de forma segura
    };

    const formatDateDisplay = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleBedTimeChange = (event, date) => {
        setShowBedTimePicker(Platform.OS === 'ios');
        if (date) {
            setBedTime(date);
        }
    };

    const handleWakeTimeChange = (event, date) => {
        setShowWakeTimePicker(Platform.OS === 'ios');
        if (date) {
            setWakeTime(date);
        }
    };

    const adjustDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);

        // No permitir fechas futuras
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (newDate > today) {
            Alert.alert('Fecha inválida', 'No puedes registrar sueño para fechas futuras');
            return;
        }

        setSelectedDate(newDate);
    };

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
        if (!user) {
            Alert.alert('Error', 'Necesitas iniciar sesión para guardar registros');
            return;
        }

        try {
            setLoading(true);
            const fechaSueno = formatDate(selectedDate);

            // Verificar duplicados antes de procesar con IA
            const validacion = await verificarRegistroDuplicado(user.uid, fechaSueno);

            if (validacion.success && validacion.existe) {
                Alert.alert(
                    'Registro duplicado',
                    `Ya existe un registro de sueño para ${formatDateDisplay(selectedDate)}. ¿Deseas reemplazarlo?`,
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                            text: 'Reemplazar',
                            onPress: () => Alert.alert('Información', 'Función de reemplazo pendiente. Por ahora, elimina el registro anterior desde el historial.')
                        }
                    ]
                );
                setLoading(false);
                return;
            }

            const calidadInfo = getCalidadInfo(quality);

            // Calcular horas en formato flotante para Gemini
            let diffMs = wakeTime.getTime() - bedTime.getTime();
            if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
            const horasNumericas = diffMs / (1000 * 60 * 60);
            const metaDeSuenoUsuario = 8;

            // Llamada al servicio de Inteligencia Artificial
            const tipGeneradoPorIA = await generarTipConIA(horasNumericas, metaDeSuenoUsuario, calidadInfo.texto);

            // Objeto estructurado incluyendo uid del usuario
            const datosDelFormulario = {
                id_usuario: user.uid, // Importante añadirlo explicitamente si tu servicio lo requiere
                fecha_sueno: fechaSueno,
                hora_dormir: formatTime(bedTime),
                hora_despertar: formatTime(wakeTime),
                horas_totales: totalSleep,
                id_calidad: quality,
                calidad_texto: calidadInfo.texto,
                calidad_emoji: calidadInfo.emoji,
                notas: notes,
                recomendacion_tip: tipGeneradoPorIA
            };

            console.log('Guardando datos:', datosDelFormulario);

            const resultado = await guardarRegistroSueno(datosDelFormulario);

            if (resultado.success) {
                Alert.alert(
                    '¡Éxito!',
                    'Registro de sueño guardado correctamente',
                    [
                        { text: 'Ver en Inicio', onPress: () => navigation.navigate('Home') },
                        {
                            text:  'OK',
                            onPress: async () => {
                                setNotes('');
                                setQuality(3);
                                setSelectedDate(new Date());
                                // Recargar lista reciente
                                const resActualizado = await getSleepRecords(user.uid);
                                if (resActualizado.success) {
                                    setRecentRecords(resActualizado.data.slice(0, 2));
                                }
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Error', resultado.error || 'No se pudo guardar el registro');
            }
        } catch (error) {
            console.error('Error en handleSaveSleep:', error);
            Alert.alert('Error', 'Ocurrió un error al guardar el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.wrapper} edges={['top']}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Registrar Sueño</Text>

                {/* Selector de Fecha */}
                <Text style={styles.label}>FECHA DEL SUEÑO</Text>
                <Card>
                    <View style={styles.datePickerCard}>
                        <View style={styles.datePickerContent}>
                            <Text style={styles.dateLabel}>FECHA SELECCIONADA</Text>
                            <Text style={styles.dateValue}>{formatDateDisplay(selectedDate)}</Text>
                        </View>

                        <View style={styles.dateButtonsContainer}>
                            <View style={styles.dateNavigationButtons}>
                                <TouchableOpacity style={styles.timeButton} onPress={() => adjustDate(-1)}>
                                    <Ionicons name="chevron-back" size={24} color={colors.secondary} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                                    <Ionicons name="calendar-outline" size={20} color={colors.textLight} />
                                    <Text style={styles.dateButtonText}>Calendario</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.timeButton} onPress={() => adjustDate(1)}>
                                    <Ionicons name="chevron-forward" size={24} color={colors.secondary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Card>

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                        locale="es-ES"
                    />
                )}

                {existeRegistro && (
                    <View style={styles.warningCard}>
                        <Text style={styles.warningText}>
                            ⚠️ Ya existe un registro para esta fecha. Si guardas, se te pedirá confirmación para reemplazarlo.
                        </Text>
                    </View>
                )}

                {/* Hora de Dormir */}
                <Text style={styles.label}>HORA DE DORMIR</Text>
                <Card>
                    <View style={styles.timePickerCard}>
                        <TouchableOpacity
                            style={styles.timePickerContent}
                            onPress={() => setShowBedTimePicker(true)}
                        >
                            <Text style={styles.timeLabel}>ME DORMÍ A (Toca para cambiar)</Text>
                            <Text style={styles.timeValue}>{formatTime(bedTime)}</Text>
                        </TouchableOpacity>

                        <View style={styles.timeButtons}>
                            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime('bed', -15)}>
                                <Ionicons name="remove" size={24} color={colors.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime('bed', 15)}>
                                <Ionicons name="add" size={24} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                {showBedTimePicker && (
                    <DateTimePicker
                        value={bedTime}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleBedTimeChange}
                    />
                )}

                {/* Hora de Despertar */}
                <Text style={styles.label}>HORA DE DESPERTAR</Text>
                <Card>
                    <View style={styles.timePickerCard}>
                        <TouchableOpacity
                            style={styles.timePickerContent}
                            onPress={() => setShowWakeTimePicker(true)}
                        >
                            <Text style={styles.timeLabel}>ME DESPERTÉ A (Toca para cambiar)</Text>
                            <Text style={styles.timeValue}>{formatTime(wakeTime)}</Text>
                        </TouchableOpacity>

                        <View style={styles.timeButtons}>
                            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime('wake', -15)}>
                                <Ionicons name="remove" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime('wake', 15)}>
                                <Ionicons name="add" size={24} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                {showWakeTimePicker && (
                    <DateTimePicker
                        value={wakeTime}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleWakeTimeChange}
                    />
                )}

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
                                        color={star <= quality ? colors.accent : colors.disabled}
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

                {/* Registros Recientes */}
                <Text style={styles.sectionTitle}>Registros Recientes</Text>

                {recentRecords.length > 0 ? (
                    recentRecords.map((record) => (
                        <Card key={record.id} style={{ marginBottom: SIZES.padding.sm }}>
                            <View style={styles.recordItem}>
                                <View>
                                    <Text style={styles.recordDate}>
                                        {new Date(record.fecha_sueno + 'T00:00:00').toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </Text>
                                    <Text style={styles.recordQuality}>
                                        {record.calidad_emoji} {record.calidad_texto}
                                    </Text>
                                </View>
                                <Text style={styles.recordHours}>{record.horas_totales}</Text>
                            </View>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <View style={styles.emptyRecords}>
                            <Ionicons name="moon-outline" size={32} color={colors.textSecondary} />
                            <Text style={styles.emptyRecordsText}>
                                No hay registros previos
                            </Text>
                        </View>
                    </Card>
                )}

                <View style={{ height: SIZES.padding.xxl }} />
            </ScrollView>

            <BottomTabBar navigation={navigation} currentScreen="SleepTracking" />
        </SafeAreaView>
    );
};

export default SleepTrackingScreen;