// Usamos el mismo parseador pero adaptado a la nomenclatura en inglés
const parseDuration = (durationString) => {
    if (!durationString) return 0;
    const match = String(durationString).match(/(\d+)h\s*(\d*)m?/);
    if (!match) return parseFloat(durationString) || 0;
    const horas = parseInt(match[1]) || 0;
    const minutos = parseInt(match[2]) || 0;
    return horas + minutos / 60;
};

// Respetamos 'sleepGoal' que viene del perfil de usuario
export const getDailyRecommendation = (horasTotalesString, sleepGoal = 8) => {
    if (!horasTotalesString) {
        return `¡Hola! Registra tu sueño de hoy en la pestaña de seguimiento para generar tu primera recomendación personalizada.`;
    }

    const hoursRested = parseDuration(horasTotalesString);
    const difference = hoursRested - sleepGoal;
    if (difference <= -4) {
        return `\u00a1Cuidado! Est\u00e1s durmiendo mucho menos de tu meta de ${sleepGoal} horas (solo ${hoursRested.toFixed(1)}h). Esto puede afectar seriamente tu salud. Prioriza ir a la cama m\u00e1s temprano esta noche y evita actividades estimulantes antes de dormir.`;
    }
    if (difference <= -2) {
        return `Te quedaste bastante lejos de tu meta de ${sleepGoal} horas (dormiste ${hoursRested.toFixed(1)}h). Hoy evita las pantallas pesadas antes de acostarte y reduce la cafe\u00edna por la tarde para ayudar a tu cuerpo a recuperarse.`;
    }
    if (difference < 0) {
        return `Buen intento, pero est\u00e1s un poco abajo de tus ${sleepGoal} horas ideales. Para alcanzar tu meta esta noche, intenta mantener tu habitaci\u00f3n completamente oscura y fresca para mejorar la profundidad de tu descanso.`;
    }
    if (difference >= 0 && difference <= 1.5) {
        return `\u00a1Excelente nivel de descanso! Cumpliste tu meta de ${sleepGoal} horas ideales. Tu cuerpo complet\u00f3 sus ciclos de sue\u00f1o esenciales de forma \u00f3ptima. \u00a1Mant\u00e9n este excelente ritmo hoy!`;
    }
    return `Dormiste ${hoursRested.toFixed(1)}h, superando por bastante tu meta de ${sleepGoal} horas. Dormir mucho a veces causa pesadez; intenta activarte temprano dando una caminata bajo la luz solar.`;
}