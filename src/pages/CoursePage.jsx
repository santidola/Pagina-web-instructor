/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Dynamic Course & Live Sessions Viewer consuming course documents directly from Cloud Firestore,
 * with built-in MaterialUploadModal for adding PDFs and guides to any session.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { CourseHeroBanner } from '../components/course/CourseHeroBanner';
import { SessionPanel } from '../components/course/SessionPanel';
import { TransferProjectPanel } from '../components/course/TransferProjectPanel';
import { MaterialUploadModal } from '../components/course/MaterialUploadModal';
import { useServices } from '../context/ServiceContext';

const TRANSFER_TAB_ID = 'sesion-transferencia';

export function CoursePage({ defaultCourseId = 'alfabetizacion-digital' }) {
  const { courseId: paramCourseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { firestoreRepository } = useServices();

  const resolvedCourseId = paramCourseId || searchParams.get('id') || defaultCourseId;
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(
    searchParams.get('upload') === 'true'
  );

  useEffect(() => {
    if (searchParams.get('upload') === 'true') {
      setIsUploadModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function loadCourseFromFirestore() {
      setIsLoading(true);
      try {
        const fetched = await firestoreRepository.getCourseById(resolvedCourseId);
        if (!isMounted) return;
        setCourse(fetched);

        if (fetched) {
          const sessions = fetched.sessions || [];
          const hash = location.hash ? location.hash.replace('#', '') : '';
          if (hash && (sessions.some((s) => s.id === hash) || hash === TRANSFER_TAB_ID)) {
            setActiveTabId(hash);
          } else {
            setActiveTabId(sessions[0]?.id || TRANSFER_TAB_ID);
          }
        }
      } catch (err) {
        console.error(`Error fetching course '${resolvedCourseId}' from Firestore:`, err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCourseFromFirestore();
    return () => {
      isMounted = false;
    };
  }, [firestoreRepository, resolvedCourseId]);

  useEffect(() => {
    if (!course) return;
    const hash = location.hash ? location.hash.replace('#', '') : '';
    if (hash && (course.sessions?.some((s) => s.id === hash) || hash === TRANSFER_TAB_ID)) {
      setActiveTabId(hash);
    }
  }, [course, location.hash]);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} — SENA | Portal del Instructor`;
    } else if (!isLoading) {
      document.title = 'Curso no encontrado — SENA';
    }
  }, [course, isLoading]);

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    if (searchParams.get('upload')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('upload');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleDeleteMaterial = async ({ materialId, materialIndex, name }) => {
    if (!course || !activeSession) return;
    const confirmed = window.confirm(
      `¿Deseas eliminar el material "${name}" de la ${activeSession.title}?`
    );
    if (!confirmed) return;

    try {
      const updated = await firestoreRepository.deleteMaterialFromSession({
        courseId: course.id,
        sessionId: activeSession.id,
        materialId,
        materialIndex
      });
      if (updated) {
        setCourse(updated);
      }
    } catch (err) {
      window.alert(
        `No se pudo eliminar el material en Firestore: ${err?.message || 'Verifica permisos de escritura'}`
      );
    }
  };

  if (isLoading) {
    return (
      <MainLayout subtitle="Ambientes Digitales & Sesiones de Clase">
        <main className="section">
          <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>☁️</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Cargando curso desde Cloud Firestore...</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Consultando documento <code>courses/{resolvedCourseId}</code> en Firebase.
            </p>
          </div>
        </main>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout subtitle="Ambientes Digitales & Sesiones de Clase">
        <main className="section">
          <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Curso no encontrado</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 24px' }}>
              No pudimos encontrar ningún curso con el identificador &quot;<strong>{resolvedCourseId}</strong>&quot; en
              Firestore.
            </p>
            <Link to="/" className="btn btn-primary">
              ← Volver al Catálogo de Cursos
            </Link>
          </div>
        </main>
      </MainLayout>
    );
  }

  const sessions = course.sessions || [];
  const activeSession = sessions.find((s) => s.id === activeTabId) || sessions[0];

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
            {activeTabId !== TRANSFER_TAB_ID && activeSession && (
              <SessionPanel
                session={activeSession}
                course={course}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
                onDeleteMaterial={handleDeleteMaterial}
              />
            )}
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

      <MaterialUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        courses={[course]}
        defaultCourseId={course.id}
        defaultSessionId={activeSession?.id || 'sesion-1'}
        onUploadSuccess={({ updatedCourse }) => {
          if (updatedCourse) {
            setCourse(updatedCourse);
          }
        }}
      />
    </MainLayout>
  );
}
