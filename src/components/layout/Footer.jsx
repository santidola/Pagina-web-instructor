/**
 * Single Responsibility Principle (SRP):
 * Renders the institutional SENA footer across all views.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src="/img/logo-sena.svg" alt="SENA" style={{ width: '36px', height: '36px' }} />
              <h3 style={{ margin: 0 }}>Servicio Nacional de Aprendizaje</h3>
            </div>
            <p>
              Portal Didáctico del Instructor · Proceso de Gestión de Formación Profesional Integral (GFPI). Formación
              pública, gratuita e inclusiva en toda Colombia.
            </p>
          </div>

          <div>
            <div className="footer-heading">Vistas de Formación</div>
            <ul className="footer-links">
              <li>
                <Link to="/">→ Catálogo de Cursos</Link>
              </li>
              <li>
                <Link to="/programa">→ Espacios de Sesión (1 a 5)</Link>
              </li>
              <li>
                <Link to="/guia">→ Guía de Aprendizaje Oficial</Link>
              </li>
              <li>
                <Link to="/glosario">→ Glosario & Recursos TIC</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Contacto y Soporte</div>
            <div className="footer-contact-item">
              <span className="icon">📍</span>
              <span>Calle 57 No. 8-69, Bogotá D.C., Colombia</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <span>Línea Gratuita Nacional: 018000 910270</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">🌐</span>
              <span>Portal Oficial: www.sena.edu.co</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 SENA — Portal Multi-Curso del Instructor. Ambientes de Formación Profesional Integral.</p>
          <div className="footer-bottom-links">
            <a href="https://oferta.senasofiaplus.edu.co/" target="_blank" rel="noopener noreferrer">
              SOFIA Plus
            </a>
            <a href="https://zajuna.sena.edu.co/" target="_blank" rel="noopener noreferrer">
              Zajuna LMS
            </a>
            <a
              href="https://www.sena.edu.co/es-co/transparencia/Paginas/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transparencia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
