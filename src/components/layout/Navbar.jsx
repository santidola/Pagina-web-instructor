/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Renders the institutional navigation bar with responsive menu and projector/print actions.
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFullscreen } from '../../hooks/useFullscreen';

export function Navbar({ subtitle = 'Ambientes Digitales & Gestión Multi-Curso', actionButton = null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  const isPathActive = (paths) => paths.includes(location.pathname);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/img/logo-sena.svg" alt="Logo Oficial SENA" className="navbar-logo-img" />
          <div className="navbar-brand-text">
            SENA · Portal del Instructor
            <div className="subtitle">{subtitle}</div>
          </div>
        </Link>

        <div className={`navbar-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <Link to="/" className={isPathActive(['/', '/index.html']) ? 'active' : ''}>
            Catálogo de Cursos
          </Link>
          <Link
            to="/programa"
            className={isPathActive(['/programa', '/programa.html', '/curso', '/curso.html']) || location.pathname.startsWith('/curso/') ? 'active' : ''}
          >
            Sesiones en Vivo
          </Link>
          <Link to="/guia" className={isPathActive(['/guia', '/guia.html']) ? 'active' : ''}>
            Guía GFPI-F-135
          </Link>
          <Link to="/glosario" className={isPathActive(['/glosario', '/glosario.html']) ? 'active' : ''}>
            Glosario & Recursos
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {actionButton || (
            <button
              className="btn btn-secondary"
              id="btn-projector"
              type="button"
              onClick={toggleFullscreen}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <span>{isFullscreen ? '📺 Salir de Pantalla Completa' : '📺 Modo Proyector'}</span>
            </button>
          )}

          <button
            className="navbar-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
