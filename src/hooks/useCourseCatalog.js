/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Fetches courses from Cloud Firestore via FirestoreCourseRepository and manages
 * catalog search and category filtering state.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useServices } from '../context/ServiceContext';
import { createCourseRepository } from '../services/courseRepository';

export function useCourseCatalog() {
  const { firestoreRepository } = useServices();
  const [firestoreCourses, setFirestoreCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const refreshFromFirestore = useCallback(async () => {
    if (!firestoreRepository) return;
    setIsLoading(true);
    setError(null);
    try {
      const courses = await firestoreRepository.getAllCourses();
      setFirestoreCourses(Array.isArray(courses) ? courses : []);
    } catch (err) {
      console.error('Error fetching courses from Firestore:', err);
      setError(err?.message || 'Error al cargar cursos desde Firestore');
    } finally {
      setIsLoading(false);
    }
  }, [firestoreRepository]);

  useEffect(() => {
    refreshFromFirestore();
  }, [refreshFromFirestore]);

  const activeRepository = useMemo(
    () => createCourseRepository(firestoreCourses),
    [firestoreCourses]
  );

  const filteredCourses = useMemo(
    () => activeRepository.filterCourses({ categoryFilter, searchTerm }),
    [activeRepository, categoryFilter, searchTerm]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('all');
  }, []);

  return {
    courses: filteredCourses,
    isLoading,
    error,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    setSearchTerm,
    clearFilters,
    refreshFromFirestore
  };
}
