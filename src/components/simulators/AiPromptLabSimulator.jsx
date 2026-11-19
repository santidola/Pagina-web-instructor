/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Interactive AI Prompt Engineering Lab for Session 5 consuming aiAssistantService.
 */
import React, { useState, useRef, useEffect } from 'react';
import { useServices } from '../../context/ServiceContext';

export function AiPromptLabSimulator() {
  const { aiAssistantService } = useServices();
  const presets = aiAssistantService.getPresets();

  const [activePresetKey, setActivePresetKey] = useState(presets[0]?.key || 'silla');
  const [promptInput, setPromptInput] = useState(presets[0]?.prompt || '');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      badge: '🤖 Meta AI / Asistente SENA',
      htmlContent:
        '¡Hola Aprendiz! Selecciona cualquiera de los retos de clase arriba o escribe tu propia instrucción estructurada para experimentar con la Inteligencia Artificial.'
    }
  ]);

  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectPreset = (preset) => {
    setActivePresetKey(preset.key);
    setPromptInput(preset.prompt);
  };

  const handleSendPrompt = () => {
    const trimmed = promptInput.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      badge: 'Tú (Aprendiz / Instructor)',
      htmlContent: trimmed.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    };

    const replyHtml = aiAssistantService.generateReply(trimmed);
    const assistantMsg = {
      id: `ai-${Date.now() + 1}`,
      sender: 'assistant',
      badge: '🤖 Asistente de IA Educativa',
      htmlContent: replyHtml
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setPromptInput('');
  };

  return (
    <div className="card card-accent-top" style={{ marginTop: '24px' }}>
      <h3 style={{ color: 'var(--sena-green-dark)', marginBottom: '8px' }}>
        🤖 Laboratorio de Inteligencia Artificial: Los 4 Pilares del Prompt
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Domina la estructura clave (<strong>ROL + CONTEXTO + TAREA + FORMATO</strong>) y prueba los retos oficiales de
        la guía SENA:
      </p>

      <div className="ai-presets-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {presets.map((preset) => (
          <button
            key={preset.key}
            type="button"
            className={`preset-chip ai-preset-chip ${activePresetKey === preset.key ? 'active' : ''}`}
            onClick={() => handleSelectPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="ai-lab-container">
        <div className="ai-lab-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
            <strong>Asistente Didáctico de Inteligencia Artificial SENA</strong>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            Modo Formativo
          </span>
        </div>

        <div ref={threadRef} className="ai-chat-thread">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-bubble ${msg.sender}`}>
              {msg.badge && <span className="ai-bubble-badge">{msg.badge}</span>}
              <div dangerouslySetInnerHTML={{ __html: msg.htmlContent }} />
            </div>
          ))}
        </div>

        <div className="ai-input-bar">
          <input
            type="text"
            placeholder="Escribe tu instrucción o selecciona un reto..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendPrompt();
              }
            }}
          />
          <button type="button" className="btn btn-primary" onClick={handleSendPrompt}>
            Enviar Prompt →
          </button>
        </div>
      </div>
    </div>
  );
}
