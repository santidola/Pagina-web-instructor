/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Manages course catalog search and category filtering state via the injected CourseRepository.
 */
import { useState, useMemo, useCallback } from 'react';
import { useServices } from '../context/ServiceContext';

export function useCourseCatalog() {
  const { courseRepository } = useServices();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(
    () => courseRepository.filterCourses({ categoryFilter, searchTerm }),
    [courseRepository, categoryFilter, searchTerm]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('all');
  }, []);

  return {
    courses: filteredCourses,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    clearFilters
  };
}
