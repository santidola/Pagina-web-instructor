/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Renders the instructional card for uploading new materials to Cloud Firestore
 * and synchronizing initial collections.
 */
import React, { useState } from 'react';
import { useServices } from '../../context/ServiceContext';

export function InstructorUploadGuide({ onSeedSuccess, onOpenUploadModal }) {
  const { firestoreRepository } = useServices();
  const [seedState, setSeedState] = useState({ status: 'idle', message: '' });

  const handleSeedDatabase = async () => {
    if (!firestoreRepository?.seedInitialData) return;
    setSeedState({ status: 'loading', message: 'Sincronizando colecciones en Cloud Firestore...' });
    try {
      const summary = await firestoreRepository.seedInitialData();
      setSeedState({
        status: 'success',
        message: `✅ ¡Firestore inicializado! (${summary.coursesCount} cursos, ${summary.materialsCount} PDFs/guías y ${summary.glossaryCount} términos sincronizados).`
      });
      if (onSeedSuccess) onSeedSuccess();
    } catch (error) {
      setSeedState({
        status: 'error',
        message: `⚠️ No se pudo escribir en Firestore (${error?.message || 'Verifica permisos de escritura en las reglas de Firestore'}).`
      });
    }
  };

  return (
    <div className="instructor-upload-guide-card animate-on-scroll">
      <div className="upload-guide-icon">📂</div>
      <div className="upload-guide-content" style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '8px'
          }}
        >
          <h3 style={{ margin: 0 }}>Gestión de Materiales y Cursos en Cloud Firestore</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {onOpenUploadModal && (
              <button
                type="button"
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                onClick={onOpenUploadModal}
              >
                📤 Subir Material (PDF / Guía)
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={handleSeedDatabase}
              disabled={seedState.status === 'loading'}
            >
              {seedState.status === 'loading' ? '⏳ Sincronizando...' : '🔄 Restaurar Datos Base'}
            </button>
          </div>
        </div>

        <p>
          Sube nuevos archivos <strong>PDF, guías interactivas HTML, hojas de trabajo o enlaces</strong> directamente a
          cualquier curso y sesión. Todo queda almacenado en la colección <code>session_materials</code> de Firebase:
        </p>

        <div className="upload-guide-steps">
          <span className="upload-step-pill">1. Haz clic en &quot;📤 Subir Material&quot; aquí o dentro de cualquier sesión</span>
          <span className="upload-step-pill">
            2. Arrastra tu archivo PDF o guía y elige el curso y sesión de destino
          </span>
          <span className="upload-step-pill">
            3. Quedará guardado en <code>session_materials</code> y publicado al instante
          </span>
        </div>

        {seedState.message && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background:
                seedState.status === 'success'
                  ? '#dcfce7'
                  : seedState.status === 'error'
                  ? '#fee2e2'
                  : '#f1f5f9',
              color:
                seedState.status === 'success'
                  ? '#166534'
                  : seedState.status === 'error'
                  ? '#991b1b'
                  : '#334155'
            }}
          >
            {seedState.message}
          </div>
        )}
      </div>
    </div>
  );
}
