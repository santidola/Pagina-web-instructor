/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Repository service responsible for retrieving and filtering courses.
 */
import { COURSES_DATA } from '../data/coursesData';

export function createCourseRepository(initialCourses = COURSES_DATA) {
  return {
    getAllCourses() {
      return initialCourses;
    },

    getCourseById(id) {
      return initialCourses.find((course) => course.id === id) || null;
    },

    filterCourses({ categoryFilter = 'all', searchTerm = '' } = {}) {
      const normalizedTerm = searchTerm.toLowerCase().trim();
      const normalizedFilter = categoryFilter.toLowerCase();

      return initialCourses.filter((course) => {
        const matchesCategory =
          categoryFilter === 'all' ||
          (normalizedFilter === 'activo' && course.status === 'Activo') ||
          (normalizedFilter === 'preparacion' && course.status === 'Preparación') ||
          Boolean(course.category && course.category.toLowerCase().includes(normalizedFilter));

        const matchesSearch =
          !normalizedTerm ||
          course.title.toLowerCase().includes(normalizedTerm) ||
          course.description.toLowerCase().includes(normalizedTerm) ||
          course.code.toLowerCase().includes(normalizedTerm) ||
          Boolean(course.category && course.category.toLowerCase().includes(normalizedTerm));

        return matchesCategory && matchesSearch;
      });
    }
  };
}
