/**
 * Single Responsibility Principle (SRP) & Interface Segregation Principle (ISP):
 * Receives only the search and filter callbacks/values required to control the catalog.
 */
import React from 'react';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: 'activo', label: 'En Formación' },
  { id: 'Ofimática', label: 'Ofimática' },
  { id: 'preparacion', label: 'Por Subir Material' }
];

export function CatalogControls({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onFilterChange,
  totalCount
}) {
  return (
    <div className="catalog-controls animate-on-scroll">
      <div className="catalog-search-wrapper">
        <span className="catalog-search-icon">🔍</span>
        <input
          type="text"
          id="courses-search-input"
          className="catalog-search-input"
          placeholder="Buscar por nombre, código o tema de clase..."
          aria-label="Buscar curso"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div className="catalog-filter-group">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`catalog-filter-btn ${categoryFilter === filter.id ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <span id="catalog-courses-count" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sena-green)' }}>
          {totalCount} {totalCount === 1 ? 'curso disponible' : 'cursos disponibles'}
        </span>
      </div>
    </div>
  );
}
