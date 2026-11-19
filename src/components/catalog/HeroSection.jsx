/**
 * Single Responsibility Principle (SRP):
 * Renders the main Hero banner of the Instructor Portal.
 */
import React from 'react';

export function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-logo-badge animate-on-scroll">
          <img src="/img/logo-sena.svg" alt="SENA" />
          <span>Servicio Nacional de Aprendizaje · Formación Profesional Integral</span>
        </div>

        <h1>
          <span className="gradient-text-faded">Portal del Instructor</span>
        </h1>

        <p className="hero-subtitle">
          Espacio pedagógico centralizado para dictar y proyectar sesiones de clase, compartir materiales de estudio,
          guiar talleres prácticos y gestionar la formación integral de los aprendices.
        </p>

        <div className="hero-actions">
          <a href="#catalogo-cursos" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            Explorar Cursos ↓
          </a>
        </div>
      </div>
    </section>
  );
}
