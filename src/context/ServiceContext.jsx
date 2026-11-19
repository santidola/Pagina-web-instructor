/**
 * Dependency Inversion Principle (DIP):
 * Provides application services via React Context so high-level components
 * and hooks depend on injected abstractions rather than global singletons.
 */
import React, { createContext, useContext, useMemo } from 'react';
import { createCourseRepository } from '../services/courseRepository';
import { createBrowserStorageService } from '../services/storageService';
import { createMaterialMetadataService } from '../services/materialMetadataService';
import { createAiAssistantService } from '../services/aiAssistantService';

const ServiceContext = createContext(null);

export function ServiceProvider({ children, overrides = {} }) {
  const services = useMemo(
    () => ({
      courseRepository: overrides.courseRepository || createCourseRepository(),
      storageService: overrides.storageService || createBrowserStorageService(),
      materialMetadataService: overrides.materialMetadataService || createMaterialMetadataService(),
      aiAssistantService: overrides.aiAssistantService || createAiAssistantService()
    }),
    [overrides]
  );

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}
