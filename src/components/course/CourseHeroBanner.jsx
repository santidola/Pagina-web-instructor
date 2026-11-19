/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders the hero header banner for a selected course.
 */
import React from 'react';

export function CourseHeroBanner({
  status = 'Activo',
  category = 'Formación SENA',
  code,
  icon = '💻',
  title,
  description,
  duration,
  sessionsCount = 0,
  rapsCount = 0,
  coverGradient = 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)'
}) {
  return (
    <div className="course-hero-header animate-on-scroll" style={{ background: coverGradient }}>
      <div className="course-hero-badge-row">
        <span className="course-badge-status">{status}</span>
        <span
          style={{
            fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '4px 12px',
            borderRadius: '50px',
            fontWeight: 600
          }}
        >
          {category}
        </span>
        <span
          style={{
            fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '4px 12px',
            borderRadius: '50px',
            fontWeight: 600
          }}
        >
          Código: {code}
        </span>
      </div>

      <h1 className="course-hero-title">
        {icon} {title}
      </h1>

      <p className="course-hero-subtitle">{description}</p>

      <div className="course-hero-stats">
        <div className="course-hero-stat-item">
          <span>⏱️</span>
          <strong>{duration}</strong>
        </div>
        <div className="course-hero-stat-item">
          <span>📅</span>
          <strong>{sessionsCount} Sesiones de Clase</strong>
        </div>
        <div className="course-hero-stat-item">
          <span>🎯</span>
          <strong>{rapsCount} RAPs Asociados</strong>
        </div>
      </div>
    </div>
  );
}
