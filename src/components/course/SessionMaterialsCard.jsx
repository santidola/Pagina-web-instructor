/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders the session materials container card.
 */
import React from 'react';
import { MaterialCardItem } from './MaterialCardItem';

export function SessionMaterialsCard({ materials = [] }) {
  return (
    <div className="session-materials-card">
      <div className="session-materials-header">
        <h4>📁 Materiales Oficiales de Sesión</h4>
        <span className="badge badge-green">{materials.length} Disponibles</span>
      </div>
      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
        Guías, talleres y diapositivas oficiales listas para proyectar o imprimir:
      </p>

      {materials.length === 0 ? (
        <div
          style={{
            padding: '20px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--border)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.88rem'
          }}
        >
          📂 No hay materiales disponibles para esta sesión aún.
        </div>
      ) : (
        <div className="materials-list-grid">
          {materials.map((m, idx) => (
            <MaterialCardItem
              key={`${m.path || m.name}-${idx}`}
              name={m.name}
              type={m.type}
              path={m.path}
              available={m.available}
            />
          ))}
        </div>
      )}
    </div>
  );
}
