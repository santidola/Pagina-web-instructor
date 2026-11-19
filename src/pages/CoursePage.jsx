/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Dynamic Course & Live Sessions Viewer consuming CourseRepository via ServiceContext.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { CourseHeroBanner } from '../components/course/CourseHeroBanner';
import { SessionPanel } from '../components/course/SessionPanel';
import { TransferProjectPanel } from '../components/course/TransferProjectPanel';
import { useServices } from '../context/ServiceContext';

const TRANSFER_TAB_ID = 'sesion-transferencia';

export function CoursePage({ defaultCourseId = 'alfabetizacion-digital' }) {
  const { courseId: paramCourseId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { courseRepository } = useServices();

  const resolvedCourseId = paramCourseId || searchParams.get('id') || defaultCourseId;
  const course = courseRepository.getCourseById(resolvedCourseId);

  const sessions = course?.sessions || [];
  const [activeTabId, setActiveTabId] = useState(() => {
    const hash = location.hash ? location.hash.replace('#', '') : '';
    if (hash && (sessions.some((s) => s.id === hash) || hash === TRANSFER_TAB_ID)) {
      return hash;
    }
    return sessions[0]?.id || TRANSFER_TAB_ID;
  });

  useEffect(() => {
    if (course) {
      document.title = `${course.title} — SENA | Portal del Instructor`;
    } else {
      document.title = 'Curso no encontrado — SENA';
    }
  }, [course]);

  useEffect(() => {
    if (!course) return;
    const hash = location.hash ? location.hash.replace('#', '') : '';
    if (hash && (course.sessions?.some((s) => s.id === hash) || hash === TRANSFER_TAB_ID)) {
      setActiveTabId(hash);
    } else if (course.sessions?.length > 0 && !course.sessions.some((s) => s.id === activeTabId) && activeTabId !== TRANSFER_TAB_ID) {
      setActiveTabId(course.sessions[0].id);
    }
  }, [course, location.hash, activeTabId]);

  if (!course) {
    return (
      <MainLayout subtitle="Ambientes Digitales & Sesiones de Clase">
        <main className="section">
          <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Curso no encontrado</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 24px' }}>
              No pudimos encontrar ningún curso con el identificador &quot;<strong>{resolvedCourseId}</strong>&quot;.
            </p>
            <Link to="/" className="btn btn-primary">
              ← Volver al Catálogo de Cursos
            </Link>
          </div>
        </main>
      </MainLayout>
    );
  }

  const activeSession = sessions.find((s) => s.id === activeTabId);

  return (
    <MainLayout subtitle="Ambientes Digitales & Sesiones de Clase">
      <main className="section">
        <div className="container" id="dynamic-course-container">
          <nav className="course-breadcrumb" aria-label="Ruta de navegación">
            <Link to="/">← Catálogo de Cursos</Link>
            <span>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{course.title}</span>
          </nav>

          <CourseHeroBanner
            status={course.status}
            category={course.category}
            code={course.code}
            icon={course.icon}
            title={course.title}
            description={course.description}
            duration={course.duration}
            sessionsCount={sessions.length}
            rapsCount={(course.raps || []).length}
            coverGradient={course.coverGradient}
          />

          <div className="session-nav-tabs animate-on-scroll" role="tablist">
            {sessions.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={activeTabId === s.id}
                className={`session-tab-btn ${activeTabId === s.id ? 'active' : ''}`}
                onClick={() => setActiveTabId(s.id)}
              >
                <span>
                  {s.icon || '📌'} Sesión {s.number}: {s.title.split('(')[0].trim()}
                </span>
                <span className="tab-badge">{s.hours}</span>
              </button>
            ))}

            {course.transferProject && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTabId === TRANSFER_TAB_ID}
                className={`session-tab-btn ${activeTabId === TRANSFER_TAB_ID ? 'active' : ''}`}
                onClick={() => setActiveTabId(TRANSFER_TAB_ID)}
              >
                <span>🏆 Transferencia: {course.transferProject.title}</span>
                <span className="tab-badge" style={{ background: '#E65100', color: '#fff' }}>
                  {course.transferProject.hours}
                </span>
              </button>
            )}
          </div>

          <div id="course-session-panels">
            {activeSession && <SessionPanel session={activeSession} course={course} />}
            {activeTabId === TRANSFER_TAB_ID && course.transferProject && (
              <TransferProjectPanel
                title={course.transferProject.title}
                hours={course.transferProject.hours}
                description={course.transferProject.description}
                evidence={course.transferProject.evidence}
              />
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
