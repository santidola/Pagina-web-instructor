/**
 * Single Responsibility Principle (SRP):
 * Home / Catalog page consuming live courses from Cloud Firestore via useCourseCatalog()
 * and providing direct material upload via MaterialUploadModal.
 */
import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { HeroSection } from '../components/catalog/HeroSection';
import { CatalogControls } from '../components/catalog/CatalogControls';
import { CourseCard } from '../components/catalog/CourseCard';
import { InstructorUploadGuide } from '../components/catalog/InstructorUploadGuide';
import { ClassChecklist } from '../components/catalog/ClassChecklist';
import { MaterialUploadModal } from '../components/course/MaterialUploadModal';
import { useCourseCatalog } from '../hooks/useCourseCatalog';

export function HomePage() {
  const {
    courses,
    isLoading,
    error,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    clearFilters,
    refreshFromFirestore
  } = useCourseCatalog();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Portal de Cursos y Aulas del Instructor — SENA';
  }, []);

  return (
    <MainLayout subtitle="Ambientes Digitales & Gestión Multi-Curso">
      <HeroSection />

      <section className="section alt-bg" id="catalogo-cursos">
        <div className="container">
          <div className="section-header center animate-on-scroll">
            <span className="section-label">Oferta Pedagógica Modular · Cloud Firestore</span>
            <h2 className="section-title">
              Catálogo de <span className="gradient-text">Cursos y Programas</span>
            </h2>
            <p className="section-subtitle">
              Selecciona cualquiera de los cursos disponibles en la base de datos para ingresar a sus sesiones de clase,
              proyectar dinámicas interactivas y consultar los materiales de apoyo.
            </p>
          </div>

          <CatalogControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onFilterChange={setCategoryFilter}
            totalCount={courses.length}
          />

          <div className="courses-catalog-grid" id="courses-catalog-grid">
            {isLoading ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '48px 20px',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>☁️</div>
                <h3 style={{ marginBottom: '6px' }}>Cargando cursos desde Cloud Firestore...</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Sincronizando catálogo con la colección <code>courses</code> de Firebase.
                </p>
              </div>
            ) : error ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '48px 20px',
                  background: '#fef2f2',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #fca5a5'
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>⚠️</div>
                <h3 style={{ marginBottom: '8px', color: '#991b1b' }}>No se pudo conectar con Firestore</h3>
                <p style={{ color: '#7f1d1d', maxWidth: '460px', margin: '0 auto 16px', fontSize: '0.9rem' }}>
                  {error}
                </p>
                <button type="button" className="btn btn-primary" onClick={refreshFromFirestore}>
                  Reintentar Conexión
                </button>
              </div>
            ) : courses.length === 0 ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '48px 20px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius)',
                  border: '1px dashed var(--border)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ marginBottom: '8px' }}>No se encontraron cursos</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 16px' }}>
                  No hay programas que coincidan con &quot;{searchTerm}&quot;. Prueba con otro término o limpia los
                  filtros.
                </p>
                <button type="button" className="btn btn-secondary" onClick={clearFilters}>
                  Limpiar Búsqueda
                </button>
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  code={course.code}
                  category={course.category}
                  description={course.description}
                  duration={course.duration}
                  sessionsCount={course.sessionsCount}
                  status={course.status}
                  badgeText={course.badgeText}
                  icon={course.icon}
                  coverGradient={course.coverGradient}
                  sessions={course.sessions}
                />
              ))
            )}
          </div>

          <InstructorUploadGuide
            onSeedSuccess={refreshFromFirestore}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        </div>
      </section>

      <ClassChecklist />

      <MaterialUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        courses={courses}
        defaultCourseId={courses[0]?.id || 'alfabetizacion-digital'}
        defaultSessionId="sesion-1"
        onUploadSuccess={() => {
          refreshFromFirestore();
        }}
      />
    </MainLayout>
  );
}
