import { obtenerRecomendacionLocal } from './sleepRecommendations';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log("✈️ [DEBUG] ¡Cargando claudeService con caché dinámico por registro!");

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

    // ── 1. CACHÉ INTELIGENTE: Si no hay fecha explícita, usa la de hoy por seguridad ──
    const fechaIdentificador = fechaRegistro || new Date().toISOString().split('T')[0];
    const CACHE_KEY = `tip_ia_${fechaIdentificador}`;

    try {
        const tipGuardado = await AsyncStorage.getItem(CACHE_KEY);
        if (tipGuardado) {
            console.log(`✅ [CACHÉ] Encontrado tip específico para la fecha [${fechaIdentificador}] en intento #${generarTipConIA.totalLlamadas}.`);
            return tipGuardado;
        }
    } catch (e) {
        console.warn("⚠️ No se pudo leer el caché:", e.message);
    }

    // ── 2. GUARD: evita llamadas simultáneas ──
    if (llamandoClaude) {
        console.warn(`⛔ [DEBUG] Llamada #${generarTipConIA.totalLlamadas} bloqueada, ya hay una en curso.`);
        return obtenerRecomendacionLocal(horasDormidas, calidadTexto);
    }

    llamandoClaude = true;

    try {
        console.log(`📡 [DEBUG] Intento #${generarTipConIA.totalLlamadas} — Conectando a Claude para la fecha [${fechaIdentificador}]...`);

        const prompt = `Eres un expert@ en medicina del sueño. Un usuario registró su noche con estos datos:
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
                messages: [
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data?.content?.[0]?.text) {
            const tip = data.content[0].text.trim();
            console.log(`🔥 [DEBUG] Conexión exitosa con Claude para [${fechaIdentificador}].`);

            // ── 3. GUARDAR EN CACHÉ USANDO LA LLAVE ÚNICA DE LA FECHA ──
            try {
                await AsyncStorage.setItem(CACHE_KEY, tip);
                console.log(`💾 [CACHÉ] Tip guardado de forma única con clave: ${CACHE_KEY}`);
            } catch (e) {
                console.warn("⚠️ No se pudo guardar en caché:", e.message);
            }

            return tip;
        } else {
            throw new Error("Estructura de respuesta inesperada");
        }

    } catch (error) {
        console.warn(`⚠️ [DEBUG] Claude falló en intento #${generarTipConIA.totalLlamadas}. Detalle:`, error.message);
        return obtenerRecomendacionLocal(horasDormidas, calidadTexto);
    } finally {
        llamandoClaude = false ;
    }
};