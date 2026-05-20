/**
 * SERVICIO: RECOMENDACIONES DE SUEÑO (LÓGICA LOCAL)
 * * Genera consejos basados en reglas matemáticas y rangos de horas/calidad.
 * Funciona como sistema de respaldo si la IA no está disponible.
 */

export const obtenerRecomendacionLocal = (horasTotales, idCalidad) => {
    const horas = parseFloat(horasTotales) || 0;
    const calidad = parseInt(idCalidad) || 3;

    // CASO 1: Durmió muy poco (Menos de 6 horas)
    if (horas < 6) {
        if (calidad <= 2) {
            return "Dormiste muy poco y tu calidad fue baja. Hoy evita el café por la tarde, mantente hidratado y prioriza acostarte temprano para recuperar energía.";
        }
        return "Dormiste menos de lo recomendado, aunque tu calidad fue aceptable. Intenta tomar una siesta corta de máximo 20 minutos a mitad del día para recargar baterías.";
    }

    // CASO 2: Sueño regular o intermedio (Entre 6 y 7.5 horas)
    if (horas >= 6 && horas < 7.5) {
        if (calidad >= 4) {
            return "Tu duración fue ligeramente corta, pero tu calidad de sueño fue excelente. Vas por muy buen camino; mantén tu rutina de relajación nocturna.";
        }
        return "Tu sueño estuvo en un rango aceptable, pero la calidad podría mejorar. Intenta desconectar las pantallas (celular, TV) 30 minutos antes de irte a la cama hoy.";
    }

    // CASO 3: Rango óptimo y saludable (Entre 7.5 y 9 horas)
    if (horas >= 7.5 && horas <= 9) {
        if (calidad >= 4) {
            return "¡Excelente noche! Cumpliste con tus horas ideales y con una gran calidad. Sigue manteniendo este mismo horario para consolidar tu higiene de sueño.";
        }
        return "Dormiste las horas necesarias, pero tu calidad fue regular. Revisa si la temperatura de tu habitación o el ruido ambiental interrumpieron tu descanso.";
    }

    // CASO 4: Durmió de más (Más de 9 horas)
    if (horas > 9) {
        if (calidad <= 2) {
            return "Dormiste bastantes horas pero te sientes cansado. Pasar demasiado tiempo en cama con baja calidad puede ser contraproducente. Intenta poner una alarma fija.";
        }
        return "Tuviste un descanso largo y reparador. Asegúrate de activarte temprano hoy con un poco de luz solar para que no se altere tu ciclo de la siguiente noche.";
    }

    return "Mantén un horario regular para acostarte y levantarte, incluso los fines de semana, para sincronizar tu reloj biológico.";
};