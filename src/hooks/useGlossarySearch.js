/**
 * Single Responsibility Principle (SRP):
 * Encapsulates real-time search filtering over glossary terms.
 */
import { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';

export function useGlossarySearch(initialTerms = GLOSSARY_TERMS) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim();
    if (!normalized) return initialTerms;

    return initialTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(normalized) ||
        item.definition.toLowerCase().includes(normalized)
    );
  }, [initialTerms, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTerms,
    totalCount: initialTerms.length,
    matchCount: filteredTerms.length
  };
}
