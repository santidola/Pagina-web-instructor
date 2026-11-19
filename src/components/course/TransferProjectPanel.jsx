/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders the Transferencia / Producto Integrador Final tab panel.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export function TransferProjectPanel({ title, hours, description, evidence }) {
  return (
    <div className="session-view-panel active" id="sesion-transferencia">
      <div className="session-card" style={{ marginBottom: 0 }}>
        <div className="session-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="session-number" style={{ background: '#E65100', color: '#fff' }}>
              🏆
            </div>
            <div>
              <h2>{title}</h2>
              <div className="session-ra">
                <strong>Producto Integrador Final</strong> · Transferencia de Aprendizaje
              </div>
            </div>
          </div>
          <span
            className="badge"
            style={{ background: '#E65100', color: '#fff', fontSize: '0.9rem', padding: '8px 16px' }}
          >
            ⏱️ {hours}
          </span>
        </div>

        <div
          style={{
            background: 'var(--green-soft)',
            border: '1px solid var(--green-muted)',
            borderRadius: 'var(--radius-sm)',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <h3 style={{ color: 'var(--sena-green-dark)', marginBottom: '10px' }}>Objetivo del Proyecto:</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>{description}</p>
        </div>

        <div className="activity-card">
          <div className="activity-badge" style={{ background: '#E65100', color: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px' }}>
            📋 Evidencia Final Requerida
          </div>
          <h4 style={{ marginBottom: '8px', fontSize: '1.05rem' }}>Sustentación y Calificación:</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
            {evidence}
          </p>
          <Link to="/guia#evaluacion" className="btn btn-primary">
            Ver Tabla de Criterios e Instrumentos en la Guía GFPI-F-135 →
          </Link>
        </div>
      </div>
    </div>
  );
}
