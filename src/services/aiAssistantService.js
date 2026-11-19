/**
 * Single Responsibility Principle (SRP) & Open/Closed Principle (OCP):
 * Evaluates user prompts against declarative AI preset scenarios or returns
 * an educational 4-pillar structured response.
 */
import { AI_PROMPT_PRESETS } from '../data/simulatorsData';

export function createAiAssistantService(presets = AI_PROMPT_PRESETS) {
  return {
    getPresets() {
      return presets;
    },

    getPresetByKey(key) {
      return presets.find((p) => p.key === key) || null;
    },

    generateReply(promptText) {
      const normalized = (promptText || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const matchedPreset = presets.find((preset) =>
        preset.keywords.some((kw) => normalized.includes(kw.toLowerCase()))
      );

      if (matchedPreset) {
        return matchedPreset.response;
      }

      const safeText = (promptText || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<strong>Respuesta Inteligente con los 4 Pilares del Prompt:</strong><br/>
¡Excelente instrucción! La Inteligencia Artificial analiza tu solicitud <em>"${safeText}"</em> y te sugiere:<br/>
1. <strong>ROL:</strong> Identifica con qué personalidad o especialidad debe responder la IA.<br/>
2. <strong>CONTEXTO:</strong> Brinda antecedentes de tu necesidad para que no asuma datos erróneos.<br/>
3. <strong>TAREA:</strong> Pide una acción concreta (redactar, resumir, calcular, organizar).<br/>
4. <strong>FORMATO:</strong> Especifica si lo deseas en lista numerada, tabla, paso a paso o código.<br/>
<em>Recuerda: La IA es una herramienta, el criterio es tuyo. Siempre verifica la información.</em>`;
    }
  };
}
