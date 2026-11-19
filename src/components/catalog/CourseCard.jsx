/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders an individual course card with its preview metadata and action links.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export function CourseCard({
  id,
  title,
  code,
  category,
  description,
  duration,
  sessionsCount,
  status,
  badgeText,
  icon,
  coverGradient,
  sessions = []
}) {
  const isReady = status === 'Activo';
  const previewSessions = sessions.slice(0, 3);
  const extraCount = Math.max(0, sessions.length - 3);
  const courseUrl = `/curso?id=${id}`;
  const uploadCourseUrl = `/curso?id=${id}&upload=true`;
  const guideUrl = id === 'alfabetizacion-digital' ? '/guia' : `/guia?id=${id}`;

  return (
    <div className="course-portal-card animate-on-scroll is-visible">
      <div
        className="course-card-header"
        style={{ background: coverGradient || 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)' }}
      >
        <div className="course-card-top-row">
          <div className="course-card-icon">{icon || '📚'}</div>
          <span className="course-badge-status">{badgeText || status}</span>
        </div>
        <div>
          <span className="course-card-category">{category}</span>
        </div>
      </div>

      <div className="course-card-body">
        <h3 className="course-card-title">{title}</h3>
        <div className="course-card-code">Código: {code}</div>
        <p className="course-card-desc">{description}</p>

        <div className="course-meta-pills">
          <span className="course-meta-pill">⏱️ {duration}</span>
          <span className="course-meta-pill">📅 {sessionsCount} Sesiones</span>
          <span className="course-meta-pill">📁 Materiales</span>
        </div>

        <div className="course-sessions-preview">
          <div className="course-sessions-preview-title">Contenido del Curso:</div>
          <ul className="course-sessions-list">
            {previewSessions.map((s) => (
              <li key={s.id}>
                {s.title} ({s.hours})
              </li>
            ))}
            {extraCount > 0 && <li>+{extraCount} sesiones más...</li>}
          </ul>
        </div>

        <div className="course-card-footer">
          {isReady ? (
            <>
              <Link to={courseUrl} className="btn btn-primary" style={{ flex: 1 }}>
                Ingresar al Curso →
              </Link>
              <Link to={guideUrl} className="btn btn-secondary" title="Ver Guía de Aprendizaje">
                Guía
              </Link>
            </>
          ) : (
            <Link to={uploadCourseUrl} className="btn btn-secondary" style={{ flex: 1 }}>
              📂 Subir Materiales
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
