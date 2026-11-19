/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders the session materials container card backed by Cloud Firestore documents,
 * including the action button to upload new materials to the active session.
 */
import React from 'react';
import { MaterialCardItem } from './MaterialCardItem';

export function SessionMaterialsCard({ materials = [], onOpenUploadModal, onDeleteMaterial }) {
  return (
    <div className="session-materials-card">
      <div className="session-materials-header">
        <h4>📁 Materiales Oficiales de Sesión</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-green">{materials.length} Disponibles</span>
          {onOpenUploadModal && (
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              onClick={onOpenUploadModal}
            >
              + Subir Material
            </button>
          )}
        </div>
      </div>
      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
        Guías, talleres y documentos PDF almacenados en Cloud Firestore listos para proyectar o imprimir:
      </p>

      {materials.length === 0 ? (
        <div
          style={{
            padding: '24px 16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--border)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.88rem'
          }}
        >
          <div style={{ marginBottom: '10px' }}>📂 No hay materiales subidos para esta sesión aún.</div>
          {onOpenUploadModal && (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={onOpenUploadModal}
            >
              📤 Subir Primer Material (PDF / Guía)
            </button>
          )}
        </div>
      ) : (
        <div className="materials-list-grid">
          {materials.map((m, idx) => (
            <MaterialCardItem
              key={`${m.materialId || m.path || m.name}-${idx}`}
              materialId={m.materialId}
              name={m.name}
              type={m.type}
              path={m.path}
              available={m.available}
              onDelete={
                onDeleteMaterial
                  ? () => onDeleteMaterial({ materialId: m.materialId, materialIndex: idx, name: m.name })
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
