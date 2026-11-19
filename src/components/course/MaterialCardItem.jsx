/**
 * Single Responsibility Principle (SRP), Interface Segregation Principle (ISP) & Dependency Inversion (DIP):
 * Renders a single session material card with clean human-readable metadata and non-overlapping action button.
 */
import React from 'react';
import { useServices } from '../../context/ServiceContext';

export function MaterialCardItem({ name, type, path, available }) {
  const { materialMetadataService } = useServices();
  const { icon, label } = materialMetadataService.getMetadata(type);

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
              {available ? 'Disponible' : 'Por subir'}
            </span>
          </div>
        </div>
      </div>
      <div className="material-card-actions">
        {available ? (
          <a
            href={path}
            className="material-action-btn material-btn-available"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver / Imprimir ➔
          </a>
        ) : (
          <span className="material-action-btn material-btn-pending">Próximamente</span>
        )}
      </div>
    </div>
  );
}
