/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Fetches a printable guide, PDF document, image, or Office file directly from the
 * 'session_materials' collection in Cloud Firestore and renders it with print/download controls.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { dataUrlToBlobUrl } from '../utils/fileReaderUtil';

export function MaterialViewerPage() {
  const { materialId } = useParams();
  const { firestoreRepository } = useServices();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchMaterialFromFirestore() {
      setIsLoading(true);
      try {
        const docData = await firestoreRepository.getMaterialById(materialId);
        if (isMounted) {
          setMaterial(docData);
          if (docData?.name) {
            document.title = `${docData.name} — Material Oficial SENA`;
          }
        }
      } catch (err) {
        console.error('Error loading material from Firestore:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchMaterialFromFirestore();
    return () => {
      isMounted = false;
    };
  }, [firestoreRepository, materialId]);

  const blobUrl = useMemo(() => {
    if (!material?.content || typeof material.content !== 'string') return null;
    if (material.content.startsWith('data:')) {
      return dataUrlToBlobUrl(material.content);
    }
    return null;
  }, [material]);

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  const handlePrintDocument = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    } else {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-secondary)',
          padding: '24px'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>☁️</div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Cargando documento desde Cloud Firestore...</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Consultando <code>session_materials/{materialId}</code> en la base de datos.
        </p>
      </div>
    );
  }

  if (!material) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-secondary)',
          padding: '24px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📄</div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Documento no encontrado en Firestore</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          No existe ningún material con el ID <code>{materialId}</code> en la colección <code>session_materials</code>.
        </p>
        <Link to="/" className="btn btn-primary">
          ← Volver al Portal del Instructor
        </Link>
      </div>
    );
  }

  const contentStr = typeof material.content === 'string' ? material.content : '';
  const isPdf =
    material.mimeType === 'application/pdf' || contentStr.startsWith('data:application/pdf');
  const isImage =
    material.mimeType?.startsWith('image/') || contentStr.startsWith('data:image/');
  const isHtml =
    material.mimeType === 'text/html' || (!contentStr.startsWith('data:') && contentStr.includes('<'));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#0f172a'
      }}
    >
      {/* BARRA SUPERIOR DE CONTROL DEL VISOR DE DOCUMENTOS FIRESTORE */}
      <header
        style={{
          height: '60px',
          background: '#111C12',
          color: '#fff',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          flexShrink: 0,
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <Link
            to={`/curso?id=${material.courseId || 'alfabetizacion-digital'}#${material.sessionId || 'sesion-1'}`}
            style={{
              color: '#a5d6a7',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            ← Volver a la Sesión
          </Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <strong
            style={{
              fontSize: '0.92rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={material.name}
          >
            {material.name}
          </strong>
          <span
            style={{
              fontSize: '0.72rem',
              background: 'rgba(57, 169, 0, 0.25)',
              color: '#86efac',
              padding: '2px 10px',
              borderRadius: '50px',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            ☁️ Cloud Firestore
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {blobUrl && (
            <a
              href={blobUrl}
              download={material.fileName || `${material.id}.pdf`}
              className="btn btn-secondary"
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
            >
              📥 Descargar Archivo
            </a>
          )}
          {(isHtml || isPdf) && (
            <button
              type="button"
              onClick={handlePrintDocument}
              className="btn btn-primary"
              style={{ padding: '7px 16px', fontSize: '0.82rem' }}
            >
              🖨️ Imprimir / Guardar PDF
            </button>
          )}
        </div>
      </header>

      {/* VISOR DEL DOCUMENTO DESDE LA BASE DE DATOS */}
      <div style={{ flex: 1, width: '100%', background: '#f8fafc', overflow: 'auto' }}>
        {isPdf ? (
          <iframe
            ref={iframeRef}
            src={blobUrl || contentStr}
            title={material.name}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : isImage ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
              padding: '32px',
              background: '#1e293b'
            }}
          >
            <img
              src={blobUrl || contentStr}
              alt={material.name}
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
            />
          </div>
        ) : isHtml ? (
          <iframe
            ref={iframeRef}
            srcDoc={contentStr}
            title={material.name}
            style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '32px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>📦</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{material.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Archivo <strong>{material.fileName || material.type}</strong> almacenado en Cloud Firestore.
            </p>
            {blobUrl && (
              <a
                href={blobUrl}
                download={material.fileName || material.name}
                className="btn btn-primary"
              >
                📥 Descargar {material.fileName || 'Archivo'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
