/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Modal dialog allowing the instructor to upload PDFs, HTML guides, Office documents,
 * or external links directly into Cloud Firestore ('session_materials' & 'courses').
 */
import React, { useRef, useState } from 'react';
import { useMaterialUpload } from '../../hooks/useMaterialUpload';
import { formatFileSize } from '../../utils/fileReaderUtil';

const MATERIAL_TYPES = [
  { id: 'pdf', label: '📕 Guía Didáctica / PDF' },
  { id: 'document', label: '📘 Hoja de Trabajo / Documento' },
  { id: 'sheet', label: '📗 Hoja de Cálculo / Taller' },
  { id: 'slides', label: '📙 Presentación / Diapositivas' },
  { id: 'image', label: '🖼️ Infografía / Imagen' }
];

export function MaterialUploadModal({
  isOpen,
  onClose,
  courses = [],
  defaultCourseId = '',
  defaultSessionId = '',
  onUploadSuccess
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    selectedCourseId,
    setSelectedCourseId,
    selectedSessionId,
    setSelectedSessionId,
    availableSessions,
    uploadMode,
    setUploadMode,
    materialName,
    setMaterialName,
    materialType,
    setMaterialType,
    filePayload,
    setFilePayload,
    externalUrl,
    setExternalUrl,
    isReadingFile,
    isSubmitting,
    error,
    handleFileSelect,
    handleSubmit
  } = useMaterialUpload({
    courses,
    defaultCourseId,
    defaultSessionId,
    onSuccess: (result) => {
      if (onUploadSuccess) onUploadSuccess(result);
      onClose();
    }
  });

  if (!isOpen) return null;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  return (
    <div
      className="modal-backdrop is-active"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="modal-container" style={{ maxWidth: '560px', padding: '32px' }}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="modal-header" style={{ marginBottom: '18px' }}>
          <span className="modal-badge">☁️ Cloud Firestore · Gestión de Materiales</span>
          <h3 className="modal-title" style={{ fontSize: '1.4rem' }}>
            Subir Material Oficial a la Sesión
          </h3>
          <p className="modal-text" style={{ fontSize: '0.88rem' }}>
            El archivo PDF o guía quedará almacenado directamente en la base de datos de Firebase y disponible de
            inmediato para proyectar o imprimir.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* SELECTOR DE CURSO Y SESIÓN */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: courses.length > 1 ? '1fr 1fr' : '1fr',
              gap: '12px',
              marginBottom: '14px'
            }}
          >
            {courses.length > 1 && (
              <div className="email-form-group" style={{ marginBottom: 0 }}>
                <label>Curso de Destino:</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  disabled={isSubmitting}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="email-form-group" style={{ marginBottom: 0 }}>
              <label>Sesión de Clase:</label>
              <select
                value={selectedSessionId}
                onChange={(e) => setSelectedSessionId(e.target.value)}
                disabled={isSubmitting}
              >
                {availableSessions.map((s) => (
                  <option key={s.id} value={s.id}>
                    Sesión {s.number}: {s.title.split('(')[0].trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MODO: ARCHIVO EN BASE DE DATOS VS ENLACE EXTERNO */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '14px',
              background: 'var(--bg-secondary)',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid var(--border-light)'
            }}
          >
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                background: uploadMode === 'file' ? 'var(--sena-green)' : 'transparent',
                color: uploadMode === 'file' ? '#fff' : 'var(--text-secondary)',
                transition: 'var(--transition)'
              }}
            >
              📄 Subir Archivo (PDF / Guía)
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('link')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                background: uploadMode === 'link' ? 'var(--sena-green)' : 'transparent',
                color: uploadMode === 'link' ? '#fff' : 'var(--text-secondary)',
                transition: 'var(--transition)'
              }}
            >
              🔗 Enlace Externo (Drive / Web)
            </button>
          </div>

          {uploadMode === 'file' ? (
            <>
              {/* ZONA DRAG & DROP DE ARCHIVO */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${
                    isDragging ? 'var(--sena-green)' : filePayload ? '#16a34a' : 'var(--border)'
                  }`,
                  background: isDragging ? 'var(--green-soft)' : filePayload ? '#f0fdf4' : 'var(--bg-secondary)',
                  borderRadius: '12px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginBottom: '14px',
                  transition: 'var(--transition)'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.html,.htm,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.webp"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />

                {isReadingFile ? (
                  <div style={{ fontSize: '0.9rem', color: 'var(--sena-green-dark)', fontWeight: 600 }}>
                    ⏳ Procesando archivo para Cloud Firestore...
                  </div>
                ) : filePayload ? (
                  <div>
                    <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>✅</div>
                    <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.9rem' }}>
                      {filePayload.fileName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '2px' }}>
                      {formatFileSize(filePayload.fileSize)} · Listo para subir a la colección{' '}
                      <code>session_materials</code>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilePayload(null);
                      }}
                      style={{
                        marginTop: '8px',
                        background: '#fff',
                        border: '1px solid #86efac',
                        borderRadius: '6px',
                        padding: '3px 10px',
                        fontSize: '0.75rem',
                        color: '#166534',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Cambiar archivo
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📥</div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                      Haz clic aquí o arrastra tu archivo PDF o guía HTML
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Soporta archivos PDF, Guías Imprimibles HTML, Word, Excel, PowerPoint e Infografías
                    </div>
                  </div>
                )}
              </div>

              <div className="email-form-group">
                <label>Tipo de Material:</label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  disabled={isSubmitting}
                >
                  {MATERIAL_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="email-form-group">
              <label>URL del Documento o Recurso (Google Drive, PDF, Video):</label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* TÍTULO DEL MATERIAL */}
          <div className="email-form-group">
            <label>Título Visible del Material para los Aprendices:</label>
            <input
              type="text"
              placeholder="Ej: Guía Práctica: Taller de Tablas Dinámicas en Excel"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.86rem' }}
              disabled={isSubmitting || isReadingFile}
            >
              {isSubmitting ? '☁️ Guardando en Firestore...' : '☁️ Guardar en Base de Datos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
