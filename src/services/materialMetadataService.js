/**
 * Single Responsibility Principle (SRP) & Open/Closed Principle (OCP):
 * Resolves display metadata (icon and human-readable label) for session materials
 * via an extensible dictionary map instead of procedural if/else chains.
 */

const MATERIAL_TYPE_META = {
  pdf: { icon: '📕', label: 'Guía didáctica' },
  sheet: { icon: '📗', label: 'Hoja de cálculo' },
  document: { icon: '📘', label: 'Hoja de trabajo' },
  image: { icon: '🖼️', label: 'Infografía' },
  slides: { icon: '📙', label: 'Presentación' },
  link: { icon: '🔗', label: 'Enlace de apoyo' }
};

const DEFAULT_MATERIAL_META = {
  icon: '📄',
  label: 'Recurso de clase'
};

export function createMaterialMetadataService(customMap = {}) {
  const registry = { ...MATERIAL_TYPE_META, ...customMap };

  return {
    getMetadata(type) {
      return registry[type] || DEFAULT_MATERIAL_META;
    }
  };
}
