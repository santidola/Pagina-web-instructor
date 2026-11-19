/**
 * Single Responsibility Principle (SRP), Interface Segregation Principle (ISP) & Dependency Inversion (DIP):
 * Renders a single session material card linking directly to the Firestore-backed MaterialViewerPage (/material/:materialId).
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';

export function MaterialCardItem({ materialId, name, type, path, available, onDelete }) {
  const { materialMetadataService } = useServices();
  const { icon, label } = materialMetadataService.getMetadata(type);

  const destinationUrl = materialId ? `/material/${materialId}` : path;

  return (
    <div className="material-card-item">
      <div className="material-card-top">
        <div className="material-icon-box">{icon}</div>
        <div className="material-info">
          <div className="material-name" title={name}>
            {name}
          </div>
          <div className="material-subtext">
            <span>{label}</span>
            <span className={`material-status-dot ${available ? 'is-ready' : 'is-pending'}`}>
              {available ? 'En Base de Datos' : 'Por subir'}
            </span>
          </div>
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            title="Eliminar material de la sesión"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              padding: '4px 6px',
              borderRadius: '6px'
            }}
          >
            🗑️
          </button>
        )}
      </div>
      <div className="material-card-actions">
        {available && destinationUrl ? (
          materialId ? (
            <Link
              to={destinationUrl}
              className="material-action-btn material-btn-available"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver / Imprimir PDF ➔
            </Link>
          ) : (
            <a
              href={destinationUrl}
              className="material-action-btn material-btn-available"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Recurso ➔
            </a>
          )
        ) : (
          <span className="material-action-btn material-btn-pending">Próximamente</span>
        )}
      </div>
    </div>
  );
}
