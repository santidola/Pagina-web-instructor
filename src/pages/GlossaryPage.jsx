/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Renders the interactive Glossary & Institutional Resources view consuming
 * 'glossary_terms' and 'portal_resources' directly from Cloud Firestore.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useGlossarySearch } from '../hooks/useGlossarySearch';

export function GlossaryPage() {
  const {
    searchTerm,
    setSearchTerm,
    filteredTerms,
    bibliographicReferences,
    senaPlatforms,
    isLoading,
    totalCount,
    matchCount
  } = useGlossarySearch();

  useEffect(() => {
    document.title = 'Glosario de Términos & Recursos · Alfabetización Informática | SENA';
  }, []);

  const printActionButton = (
    <button
      onClick={() => window.print()}
      className="btn btn-secondary"
      type="button"
      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
    >
      <span>🖨️ Imprimir Glosario</span>
    </button>
  );

  return (
    <MainLayout subtitle="Glosario & Recursos TIC · 70 Horas" actionButton={printActionButton}>
      <header className="page-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="hero-logo-badge" style={{ marginBottom: 0 }}>
              <img src="/img/logo-sena.svg" alt="SENA" />
              <span>Secciones 5 y 6 de la Guía Oficial GFPI-F-135</span>
            </div>
          </div>
          <h1>
            Glosario de Términos & <span className="gradient-text">Recursos Digitales</span>
          </h1>
          <p>
            Conceptos técnicos oficiales estipulados en la guía de aprendizaje para fortalecer las competencias de los
            aprendices y apoyar las explicaciones del instructor en clase.
          </p>

          <div className="search-box" style={{ marginTop: '32px' }}>
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="glossary-search"
              className="search-input"
              placeholder="Buscar término (ej. hoja de cálculo, archivo, red...)"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div id="glossary-count" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {isLoading
              ? 'Cargando términos desde Cloud Firestore...'
              : `Mostrando ${matchCount} de ${totalCount} términos oficiales`}
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container">
          {isLoading ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              ☁️ Consultando colecciones <code>glossary_terms</code> y <code>portal_resources</code> en Firebase...
            </div>
          ) : (
            <>
              <div className="glossary-grid" id="glossary-container">
                {filteredTerms.map((item) => (
                  <article key={item.id} className="glossary-card animate-on-scroll">
                    <h4>
                      <span>{item.icon}</span> {item.term}
                    </h4>
                    <p>{item.definition}</p>
                  </article>
                ))}
              </div>

              <section style={{ marginTop: '56px' }} className="animate-on-scroll">
                <div className="activity-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.8rem' }}>📚</span>
                    <div>
                      <h3 style={{ marginBottom: '2px' }}>6. Referentes Bibliográficos Oficiales</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Fuentes institucionales que fundamentan la formación
                      </span>
                    </div>
                  </div>

                  <ul
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      paddingLeft: '10px',
                      marginTop: '14px'
                    }}
                  >
                    {bibliographicReferences.map((ref) => (
                      <li
                        key={ref.id}
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          borderLeft: '3px solid var(--sena-green)',
                          paddingLeft: '14px'
                        }}
                      >
                        <strong>{ref.author}</strong> {ref.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section style={{ marginTop: '32px' }} className="animate-on-scroll">
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius)',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                    🔗 Plataformas y Servicios Institucionales del SENA
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Accesos directos recomendados para instructores y aprendices durante el curso:
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '14px'
                    }}
                  >
                    {senaPlatforms.map((platform) => (
                      <a
                        key={platform.id}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '16px',
                          background: 'var(--green-bg)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'block',
                          border: '1px solid var(--border-light)',
                          transition: 'var(--transition)'
                        }}
                      >
                        <strong style={{ color: 'var(--sena-green)', display: 'block', marginBottom: '4px' }}>
                          {platform.name}
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {platform.description}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '36px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <Link to="/guia" className="btn btn-secondary">
              ← Volver a la Guía GFPI-F-135
            </Link>
            <Link to="/" className="btn btn-primary">
              Ir al Inicio del Sitio →
            </Link>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
