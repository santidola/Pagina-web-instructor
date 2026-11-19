/**
 * Single Responsibility Principle (SRP):
 * Home / Catalog page composing HeroSection, CatalogControls, CourseCard grid,
 * InstructorUploadGuide, and ClassChecklist.
 */
import React, { useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { HeroSection } from '../components/catalog/HeroSection';
import { CatalogControls } from '../components/catalog/CatalogControls';
import { CourseCard } from '../components/catalog/CourseCard';
import { InstructorUploadGuide } from '../components/catalog/InstructorUploadGuide';
import { ClassChecklist } from '../components/catalog/ClassChecklist';
import { useCourseCatalog } from '../hooks/useCourseCatalog';

export function HomePage() {
  const {
    courses,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    clearFilters
  } = useCourseCatalog();

  useEffect(() => {
    document.title = 'Portal de Cursos y Aulas del Instructor — SENA';
  }, []);

  return (
    <MainLayout subtitle="Ambientes Digitales & Gestión Multi-Curso">
      <HeroSection />

      <section className="section alt-bg" id="catalogo-cursos">
        <div className="container">
          <div className="section-header center animate-on-scroll">
            <span className="section-label">Oferta Pedagógica Modular</span>
            <h2 className="section-title">
              Catálogo de <span className="gradient-text">Cursos y Programas</span>
            </h2>
            <p className="section-subtitle">
              Selecciona cualquiera de los cursos disponibles para ingresar a sus sesiones de clase, proyectar dinámicas
              interactivas y consultar los materiales de apoyo.
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
            {courses.length === 0 ? (
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

          <InstructorUploadGuide />
        </div>
      </section>

      <ClassChecklist />
    </MainLayout>
  );
}
