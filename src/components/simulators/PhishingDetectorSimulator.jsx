/**
 * Single Responsibility Principle (SRP) & Liskov Substitution Principle (LSP):
 * Interactive Traffic Light Pause Protocol & Phishing Detector for Session 4.
 */
import React, { useState } from 'react';
import { PHISHING_CASES } from '../../data/simulatorsData';

export function PhishingDetectorSimulator() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectChoice = (caseId, choiceIsFraud) => {
    setSelectedAnswers((prev) => ({ ...prev, [caseId]: choiceIsFraud }));
  };

  return (
    <div className="card card-accent-top" style={{ marginTop: '24px' }}>
      <h3 style={{ color: 'var(--sena-green-dark)', marginBottom: '8px' }}>
        🛡️ Ciberseguridad: Semáforo de Pausa y Detector de Fraudes
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Aplica la regla de oro: <em>«Si me apuran o me piden datos, paro y verifico»</em>. Analiza los casos y decide:
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}
      >
        <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', padding: '14px', borderRadius: '8px' }}>
          <strong style={{ color: '#166534' }}>🟢 VERDE · Avanzar</strong>
          <div style={{ fontSize: '0.82rem', color: '#374151', marginTop: '4px' }}>
            Portal oficial verificado (.gov.co, .edu.co), navegación tranquila y sin presiones.
          </div>
        </div>
        <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', padding: '14px', borderRadius: '8px' }}>
          <strong style={{ color: '#92400e' }}>🟡 AMARILLO · Revisar</strong>
          <div style={{ fontSize: '0.82rem', color: '#374151', marginTop: '4px' }}>
            Pide datos personales, números de tarjeta o claves bancarias para continuar.
          </div>
        </div>
        <div style={{ background: '#fef2f2', border: '2px solid #dc2626', padding: '14px', borderRadius: '8px' }}>
          <strong style={{ color: '#991b1b' }}>🔴 ROJO · Detenerse</strong>
          <div style={{ fontSize: '0.82rem', color: '#374151', marginTop: '4px' }}>
            Urgencia desmedida, amenazas de bloqueo, APKs o petición inmediata de dinero.
          </div>
        </div>
      </div>

      <div className="phishing-cases-grid">
        {PHISHING_CASES.map((item) => {
          const hasAnswered = Object.prototype.hasOwnProperty.call(selectedAnswers, item.id);
          const userChoseFraud = selectedAnswers[item.id];
          const isCorrect = hasAnswered && userChoseFraud === item.isFraud;

          return (
            <div key={item.id} className={`phishing-card ${item.isFraud ? 'is-fraud' : 'is-safe'}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.88rem', color: item.isFraud ? '#dc2626' : '#16a34a' }}>
                  {item.title}
                </strong>
                <span
                  className={item.isFraud ? 'badge' : 'badge badge-green'}
                  style={
                    item.isFraud
                      ? { background: '#fee2e2', color: '#991b1b', fontSize: '0.72rem' }
                      : { fontSize: '0.72rem' }
                  }
                >
                  {item.badge}
                </span>
              </div>

              <div className="phishing-msg-preview">{item.message}</div>

              <div className="phishing-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  onClick={() => handleSelectChoice(item.id, false)}
                >
                  ✅ Es Mensaje Seguro
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    background: '#dc2626',
                    borderColor: '#dc2626'
                  }}
                  onClick={() => handleSelectChoice(item.id, true)}
                >
                  🚨 Es Fraude / Estafa
                </button>
              </div>

              {hasAnswered && (
                <div
                  className="phishing-feedback show"
                  style={{
                    background: isCorrect ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                    color: isCorrect ? '#14532d' : '#7f1d1d'
                  }}
                >
                  <strong>{isCorrect ? '¡Correcto! 🎯' : 'Cuidado: ⚠️'}</strong> {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
