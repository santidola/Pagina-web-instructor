/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Fetches classroom checklist items from Cloud Firestore ('checklist_items')
 * and persists completion state via StorageService abstraction.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useServices } from '../context/ServiceContext';

const STORAGE_KEY = 'sena_task_states_v2';

export function useChecklistProgress() {
  const { firestoreRepository, storageService } = useServices();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedFlags, setCompletedFlags] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadChecklist() {
      setIsLoading(true);
      try {
        const fetchedItems = await firestoreRepository.getChecklistItems();
        if (!isMounted) return;
        setItems(fetchedItems);

        const saved = storageService.get(STORAGE_KEY, null);
        if (Array.isArray(saved) && saved.length === fetchedItems.length) {
          setCompletedFlags(saved.map(Boolean));
        } else {
          setCompletedFlags(fetchedItems.map(() => false));
        }
      } catch (err) {
        console.error('Error loading checklist_items from Firestore:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadChecklist();
    return () => {
      isMounted = false;
    };
  }, [firestoreRepository, storageService]);

  const toggleItem = useCallback(
    (index) => {
      setCompletedFlags((prev) => {
        const next = prev.map((val, idx) => (idx === index ? !val : val));
        storageService.set(STORAGE_KEY, next);
        return next;
      });
    },
    [storageService]
  );

  const stats = useMemo(() => {
    const total = items.length;
    const completed = completedFlags.filter(Boolean).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  }, [items.length, completedFlags]);

  return {
    items,
    isLoading,
    completedFlags,
    toggleItem,
    ...stats
  };
}
