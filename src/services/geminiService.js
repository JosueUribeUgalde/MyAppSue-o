import { obtenerRecomendacionLocal } from './sleepRecommendations';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log("✈️ [DEBUG] ¡Cargando claudeService con caché dinámico y limpieza UTF-8!");

const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

let llamandoClaude = false;

/**
 * Genera un tip de sueño personalizado conectando con Claude de Anthropic.
 * @param {number} horasDormidas - Horas reales dormidas.
 * @param {number} metaSueno - Meta de horas diarias.
 * @param {string} calidadTexto - Texto de calidad ('Excelente', 'Regular', etc.).
 * @param {string} fechaRegistro - Fecha del registro actual (ej. '2026-05-19').
 */
export const generarTipConIA = async (horasDormidas, metaSueno, calidadTexto, fechaRegistro = null) => {

    generarTipConIA.totalLlamadas = (generarTipConIA.totalLlamadas || 0) + 1;
    console.log(`📊 [DEBUG] Intento #${generarTipConIA.totalLlamadas} a generarTipConIA`);

    // ── 1. CACHÉ INTELIGENTE ──
    const fechaIdentificador = fechaRegistro || new Date().toISOString().split('T')[0];
    const CACHE_KEY = `tip_ia_${fechaIdentificador}`;

    try {
        const tipGuardado = await AsyncStorage.getItem(CACHE_KEY);
        if (tipGuardado) {
            console.log(`✅ [CACHÉ] Encontrado tip para la fecha [${fechaIdentificador}].`);
            return tipGuardado;
        }
    } catch (e) {
        console.warn("⚠️ No se pudo leer el caché:", e.message);
    }

    // ── 2. GUARD: evita llamadas simultáneas ──
    if (llamandoClaude) {
        console.warn(`⛔ [DEBUG] Llamada #${generarTipConIA.totalLlamadas} bloqueada, en curso.`);
        return obtenerRecomendacionLocal(horasDormidas, calidadTexto);
    }

    llamandoClaude = true;

    try {
        console.log(`📡 [DEBUG] Conectando a Claude para la fecha [${fechaIdentificador}]...`);

        const prompt = `Eres un expert@ en medicina del sueño. Un usuario registró su noche con:
        - Horas totales dormidas: ${horasDormidas} horas.
        - Su meta diaria de sueño es: ${metaSueno} horas.
        - Calidad del sueño: ${calidadTexto}.
        Genera un consejo corto, empático y práctico para su día actual. 
        Reglas: Máximo 3 líneas de texto, no uses listas ni viñetas, responde en español de manera directa.`;

        const response = await fetch(CLAUDE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 200,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data?.content?.[0]?.text) {
            // --- CORRECCIÓN DE CARACTERES ESPECIALES ---
            // .normalize("NFC") asegura que los acentos y símbolos se guarden en formato correcto
            const rawTip = data.content[0].text.trim();
            const tip = rawTip.normalize("NFC");

            console.log(`🔥 [DEBUG] Conexión exitosa. Tip limpio: ${tip.substring(0, 20)}...`);

            // ── 3. GUARDAR EN CACHÉ ──
            try {
                await AsyncStorage.setItem(CACHE_KEY, tip);
            } catch (e) {
                console.warn("⚠️ No se pudo guardar en caché:", e.message);
            }

            return tip;
        } else {
            throw new Error("Estructura de respuesta inesperada");
        }

    } catch (error) {
        console.warn(`⚠️ [DEBUG] Claude falló. Detalle:`, error.message);
        return obtenerRecomendacionLocal(horasDormidas, calidadTexto);
    } finally {
        llamandoClaude = false;
    }
};