/**
 * Single Responsibility Principle (SRP) & Open/Closed Principle (OCP):
 * Renders a course session panel and delegates interactive tools to SessionSimulator.
 */
import React from 'react';
import { SessionMaterialsCard } from './SessionMaterialsCard';
import { SessionSimulator } from '../simulators/SimulatorRegistry';

export function SessionPanel({ session, course, onOpenUploadModal, onDeleteMaterial }) {
  const formattedNumber = session.number < 10 ? `0${session.number}` : session.number;

  return (
    <div className="session-view-panel active" id={session.id}>
      <div className="session-card" style={{ marginBottom: 0 }}>
        <div className="session-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="session-number">{formattedNumber}</div>
            <div>
              <h2>{session.title}</h2>
              <div className="session-ra">
                <strong>RAP / Competencia:</strong> {session.rapCode || 'Formación Técnica'}
              </div>
            </div>
          </div>
          <span className="badge badge-green" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
            ⏱️ {session.hours}
          </span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
          {session.summary}
        </p>

        <div className="didactic-grid">
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '14px', color: 'var(--sena-green-dark)' }}>
              📖 Guía de Taller Práctico y Temas:
            </h3>
            {(session.topics || []).map((topic, index) => (
              <div key={index} className="activity-step-box">
                <div className="activity-step-header">
                  <div className="activity-step-num">{index + 1}</div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{topic}</strong>
                </div>
              </div>
            ))}
          </div>

          <div>
            <SessionMaterialsCard
              materials={session.materials || []}
              onOpenUploadModal={onOpenUploadModal}
              onDeleteMaterial={onDeleteMaterial}
            />

            <div className="activity-card" style={{ marginTop: '20px' }}>
              <div className="activity-badge">🎯 Evidencia y Taller a Entregar</div>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                Resultado de la Sesión:
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {session.activity}
              </p>
            </div>
          </div>
        </div>

        <SessionSimulator simulatorKey={session.simulatorKey} session={session} course={course} />
      </div>
    </div>
  );
}
