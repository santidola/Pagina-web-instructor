/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Fetches the official GFPI-F-135 Learning Guide from Cloud Firestore ('learning_guides').
 */
import { useState, useEffect } from 'react';
import { useServices } from '../context/ServiceContext';

export function useLearningGuide(guideId = 'gfpi-f-135-alfabetizacion') {
  const { firestoreRepository } = useServices();
  const [guide, setGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchGuide() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await firestoreRepository.getLearningGuide(guideId);
        if (isMounted) {
          setGuide(data);
        }
      } catch (err) {
        console.error('Error loading learning_guides from Firestore:', err);
        if (isMounted) {
          setError(err?.message || 'Error al cargar la Guía de Aprendizaje desde Firestore');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchGuide();
    return () => {
      isMounted = false;
    };
  }, [firestoreRepository, guideId]);

  return { guide, isLoading, error };
}
