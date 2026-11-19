/**
 * Single Responsibility Principle (SRP) & Liskov Substitution Principle (LSP):
 * Interactive Formal Email Builder & Live Gmail Previewer for Session 2.
 */
import React, { useState } from 'react';
import { INITIAL_EMAIL_STATE } from '../../data/simulatorsData';

export function EmailBuilderSimulator() {
  const [form, setForm] = useState(INITIAL_EMAIL_STATE);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="card card-accent-top" style={{ marginTop: '24px' }}>
      <h3 style={{ color: 'var(--sena-green-dark)', marginBottom: '8px' }}>
        ✉️ Constructor y Previsualizador de Correo Formal en Gmail
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Escribe en los campos de la izquierda para practicar las <strong>partes clave de un correo formal</strong> y
        observa la vista previa en tiempo real:
      </p>

      <div className="email-builder-container">
        <div className="email-form-card">
          <div className="email-form-group">
            <label>1. Para (Destinatario exacto):</label>
            <input
              type="email"
              value={form.to}
              onChange={handleChange('to')}
              placeholder="ejemplo.instructor@sena.edu.co"
            />
          </div>

          <div className="email-form-group">
            <label>2. Asunto (Tema breve y específico):</label>
            <input
              type="text"
              value={form.subject}
              onChange={handleChange('subject')}
              placeholder="Asunto claro y específico"
            />
          </div>

          <div className="email-form-group">
            <label>3. Saludo Cordial:</label>
            <input
              type="text"
              value={form.greeting}
              onChange={handleChange('greeting')}
              placeholder="Estimado/a..."
            />
          </div>

          <div className="email-form-group">
            <label>4. Cuerpo / Objetivo del Mensaje:</label>
            <textarea
              rows="4"
              value={form.body}
              onChange={handleChange('body')}
              placeholder="Escribe el mensaje claro y respetuoso..."
            />
          </div>

          <div className="email-form-group">
            <label>5. Despedida:</label>
            <input type="text" value={form.farewell} onChange={handleChange('farewell')} />
          </div>

          <div className="email-form-group">
            <label>6. Firma & Contacto:</label>
            <input type="text" value={form.signature} onChange={handleChange('signature')} />
          </div>
        </div>

        <div className="email-preview-client">
          <div className="email-preview-header">
            <span>📬 Bandeja de Salida · Vista en Gmail</span>
            <span
              style={{
                fontSize: '0.75rem',
                background: 'rgba(255,255,255,0.2)',
                padding: '3px 8px',
                borderRadius: '4px'
              }}
            >
              Listo para Enviar
            </span>
          </div>

          <div className="email-preview-meta">
            <div className="email-meta-row">
              <span className="email-meta-label">De:</span>
              <span style={{ color: 'var(--sena-green-dark)', fontWeight: 600 }}>aprendiz.digital@misena.edu.co</span>
            </div>
            <div className="email-meta-row">
              <span className="email-meta-label">Para:</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>
                {form.to.trim() || 'destinatario@correo.com'}
              </span>
            </div>
            <div className="email-meta-row">
              <span className="email-meta-label">Asunto:</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {form.subject.trim() || '(Sin asunto aún)'}
              </span>
            </div>
          </div>

          <div className="email-preview-body">
            <p style={{ marginBottom: '12px' }}>
              <span className="email-tag-pill">Saludo</span>
              <span>{form.greeting.trim() || 'Estimado/a...'}</span>
            </p>

            <p style={{ marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
              <span className="email-tag-pill">Objetivo</span>
              <span>{form.body.trim() || 'Escribe aquí el objetivo y desarrollo claro de tu mensaje...'}</span>
            </p>

            <p style={{ marginBottom: '8px' }}>
              <span className="email-tag-pill">Despedida</span>
              <span>{form.farewell.trim() || 'Atentamente,'}</span>
            </p>

            <p style={{ fontWeight: 700, color: '#334155', marginBottom: '14px' }}>
              <span className="email-tag-pill">Firma</span>
              <span>{form.signature.trim() || 'Nombre del Aprendiz · Ficha SENA'}</span>
            </p>

            <div className="email-attachment-pill">
              <span>📎</span>
              <span>Mi_Primer_Documento_GoogleDocs.pdf (18 KB) — Adjunto verificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
