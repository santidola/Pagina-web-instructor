/**
 * Single Responsibility Principle (SRP):
 * Renders the official GFPI-F-135 Learning Guide view.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { GUIDE_DATA } from '../data/guideData';

export function GuidePage() {
  useEffect(() => {
    document.title = 'Guía de Aprendizaje Oficial · Formato GFPI-F-135 | SENA';
  }, []);

  const printActionButton = (
    <button
      onClick={() => window.print()}
      className="btn btn-secondary"
      type="button"
      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
    >
      <span>🖨️ Imprimir Guía</span>
    </button>
  );

  const { identification, presentationParagraphs, evaluationMatrix, formatVersion } = GUIDE_DATA;

  return (
    <MainLayout subtitle="Guía de Aprendizaje GFPI-F-135 · 70 Horas" actionButton={printActionButton}>
      <header className="page-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="hero-logo-badge" style={{ marginBottom: 0 }}>
              <img src="/img/logo-sena.svg" alt="SENA" />
              <span>Proceso de Gestión de Formación Profesional Integral (GFPI)</span>
            </div>
          </div>
          <h1>
            Formato Oficial <span className="gradient-text">Guía de Aprendizaje</span>
          </h1>
          <p>
            Documento técnico y pedagógico que orienta la ruta formativa de 70 horas, las 4 fases metodológicas y la
            matriz oficial de evaluación de competencias.
          </p>
        </div>
      </header>

      <main className="section">
        <div className="container">
          {/* SECCIÓN 1: IDENTIFICACIÓN */}
          <section className="activity-card animate-on-scroll" id="identificacion">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid var(--green-soft)',
                paddingBottom: '14px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1. Identificación de la Guía de Aprendizaje
              </h2>
              <span className="badge badge-green">{formatVersion}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="activity-meta-item">
                <strong>Denominación del Programa de Formación:</strong>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{identification.programName}</span>
              </div>
              <div className="activity-meta-item">
                <strong>Código del Programa de Formación:</strong>
                <span>{identification.programCode}</span>
              </div>
              <div className="activity-meta-item">
                <strong>Proyecto Formativo / Fase:</strong>
                <span>{identification.projectPhase}</span>
              </div>
              <div className="activity-meta-item">
                <strong>Duración de la Guía:</strong>
                <span style={{ fontWeight: 700, color: 'var(--sena-green)' }}>{identification.duration}</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '24px',
                padding: '22px',
                background: 'var(--green-bg)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--sena-green)'
              }}
            >
              <strong
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--sena-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '6px'
                }}
              >
                Competencia Laboral a Desarrollar:
              </strong>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '14px' }}>
                {identification.competence}
              </p>

              <strong
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--sena-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px'
                }}
              >
                Resultados de Aprendizaje (RAP) de la Planeación Pedagógica:
              </strong>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  listStyle: 'disc'
                }}
              >
                {identification.raps.map((rap) => (
                  <li key={rap.code}>
                    <strong>{rap.code}:</strong> {rap.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECCIÓN 2: PRESENTACIÓN */}
          <section className="activity-card animate-on-scroll" id="presentacion">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              2. Presentación
            </h2>
            {presentationParagraphs.map((paragraph, idx) => (
              <p key={idx} className="activity-desc">
                {paragraph}
              </p>
            ))}
          </section>

          {/* SECCIÓN 3: MOMENTOS FORMATIVOS */}
          <section className="activity-card animate-on-scroll" id="momentos">
            <div style={{ borderBottom: '2px solid var(--green-soft)', paddingBottom: '14px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                3. Formulación de las Actividades de Aprendizaje
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Distribución pedagógica en 4 momentos clave: Reflexión inicial (2h), Contextualización (4h), Apropiación
                (56h) y Transferencia (8h).
              </p>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <h3 style={{ color: 'var(--sena-green-dark)' }}>
                    3.1 Actividades de Reflexión Inicial: ¿Cómo utilizo actualmente la tecnología?
                  </h3>
                  <span className="badge badge-green">⏱️ 2 Horas</span>
                </div>
                <p>
                  El instructor inicia una conversación orientada sobre las actividades que los aprendices realizan con
                  computadores, celulares, Internet y herramientas digitales. Se identifican experiencias previas,
                  dificultades y necesidades cotidianas.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <h3 style={{ color: 'var(--sena-green-dark)' }}>
                    3.2 Actividades de Contextualización: Reconozco mis saberes digitales
                  </h3>
                  <span className="badge badge-green">⏱️ 4 Horas</span>
                </div>
                <p>
                  Diagnóstico práctico para reconocer conocimientos iniciales frente al sistema operativo, organización
                  de archivos, procesador de texto, hoja de cálculo, presentaciones y servicios de Internet. No tiene
                  carácter sancionatorio.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <h3 style={{ color: 'var(--sena-green-dark)' }}>
                    3.3 Actividades de Apropiación: Aprendo haciendo (5 Sesiones)
                  </h3>
                  <span className="badge badge-green">⏱️ 56 Horas</span>
                </div>
                <p>
                  En este momento se desarrollan las 5 sesiones prácticas articuladas con los resultados de aprendizaje
                  de la planeación pedagógica:
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '12px',
                    marginTop: '12px'
                  }}
                >
                  <Link
                    to="/curso?id=alfabetizacion-digital#sesion-1"
                    style={{
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'block'
                    }}
                  >
                    <strong>Sesión 1 (10h):</strong> Móvil & S.O. (RAM, Ajustes, Alarma) →
                  </Link>
                  <Link
                    to="/curso?id=alfabetizacion-digital#sesion-2"
                    style={{
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'block'
                    }}
                  >
                    <strong>Sesión 2 (11h):</strong> Google Docs & Correo Formal →
                  </Link>
                  <Link
                    to="/curso?id=alfabetizacion-digital#sesion-3"
                    style={{
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'block'
                    }}
                  >
                    <strong>Sesión 3 (14h):</strong> Excel (Presupuesto y Saldo) →
                  </Link>
                  <Link
                    to="/curso?id=alfabetizacion-digital#sesion-4"
                    style={{
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'block'
                    }}
                  >
                    <strong>Sesión 4 (10h):</strong> Internet Seguro & Anti-Fraudes →
                  </Link>
                  <Link
                    to="/curso?id=alfabetizacion-digital#sesion-5"
                    style={{
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'block'
                    }}
                  >
                    <strong>Sesión 5 (11h):</strong> Inteligencia Artificial & Prompts →
                  </Link>
                </div>
              </div>

              <div className="timeline-item" id="transferencia">
                <div className="timeline-dot" style={{ background: '#E65100' }}></div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <h3 style={{ color: 'var(--sena-green-dark)' }}>
                    3.4 Transferencia del Conocimiento: Producto Integrador &quot;Mi Solución Digital Práctica&quot;
                  </h3>
                  <span
                    className="badge"
                    style={{ background: '#FFF3E0', color: '#E65100', border: '1px solid #FFE0B2' }}
                  >
                    ⏱️ 8 Horas
                  </span>
                </div>
                <p>
                  El aprendiz integrará las habilidades prácticas desarrolladas en una situación de la vida diaria
                  académica, laboral, productiva o comunitaria.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: MATRIZ DE EVALUACIÓN OFICIAL */}
          <section className="activity-card animate-on-scroll" id="evaluacion">
            <div style={{ borderBottom: '2px solid var(--green-soft)', paddingBottom: '14px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                4. Planteamiento de Evidencias de Aprendizaje para la Evaluación
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Relación directa oficial entre actividades prácticas, evidencias entregables, criterios evaluativos y
                técnicas e instrumentos.
              </p>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Actividad de Aprendizaje</th>
                    <th style={{ width: '25%' }}>Evidencias de Aprendizaje</th>
                    <th style={{ width: '32%' }}>Criterios de Evaluación</th>
                    <th style={{ width: '23%' }}>Técnicas e Instrumentos</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationMatrix.map((row) => (
                    <tr key={row.id} style={row.isHighlight ? { background: 'var(--green-soft)' } : undefined}>
                      <td>
                        <strong>{row.activity}</strong>
                        <br />
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: row.isHighlight ? 'var(--sena-green-dark)' : 'var(--text-muted)',
                            fontWeight: row.isHighlight ? 700 : 400
                          }}
                        >
                          {row.hours}
                        </span>
                      </td>
                      <td>{row.isHighlight ? <strong>{row.evidence}</strong> : row.evidence}</td>
                      <td>{row.criteria}</td>
                      <td>{row.instruments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

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
            <Link to="/programa" className="btn btn-secondary">
              ← Volver a Espacios de Sesión
            </Link>
            <Link to="/glosario" className="btn btn-primary">
              Ver Glosario de Términos Oficiales →
            </Link>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
