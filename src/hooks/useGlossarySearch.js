/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Fetches glossary terms ('glossary_terms') and institutional resources ('portal_resources')
 * from Cloud Firestore and encapsulates real-time search filtering.
 */
import { useState, useEffect, useMemo } from 'react';
import { useServices } from '../context/ServiceContext';

export function useGlossarySearch() {
  const { firestoreRepository } = useServices();
  const [terms, setTerms] = useState([]);
  const [bibliographicReferences, setBibliographicReferences] = useState([]);
  const [senaPlatforms, setSenaPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadGlossaryAndResources() {
      setIsLoading(true);
      try {
        const [fetchedTerms, fetchedResources] = await Promise.all([
          firestoreRepository.getGlossaryTerms(),
          firestoreRepository.getPortalResources()
        ]);
        if (!isMounted) return;
        setTerms(Array.isArray(fetchedTerms) ? fetchedTerms : []);
        setBibliographicReferences(fetchedResources?.bibliographicReferences || []);
        setSenaPlatforms(fetchedResources?.senaPlatforms || []);
      } catch (err) {
        console.error('Error loading glossary_terms and portal_resources from Firestore:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadGlossaryAndResources();
    return () => {
      isMounted = false;
    };
  }, [firestoreRepository]);

  const filteredTerms = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim();
    if (!normalized) return terms;

    return terms.filter(
      (item) =>
        (item.term || '').toLowerCase().includes(normalized) ||
        (item.definition || '').toLowerCase().includes(normalized)
    );
  }, [terms, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTerms,
    bibliographicReferences,
    senaPlatforms,
    isLoading,
    totalCount: terms.length,
    matchCount: filteredTerms.length
  };
}
