/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Manages classroom checklist state and persists completion via StorageService abstraction.
 */
import { useState, useMemo, useCallback } from 'react';
import { useServices } from '../context/ServiceContext';
import { CLASS_CHECKLIST_ITEMS } from '../data/checklistData';

const STORAGE_KEY = 'sena_task_states_v2';

export function useChecklistProgress(items = CLASS_CHECKLIST_ITEMS) {
  const { storageService } = useServices();

  const [completedFlags, setCompletedFlags] = useState(() => {
    const saved = storageService.get(STORAGE_KEY, null);
    if (Array.isArray(saved) && saved.length === items.length) {
      return saved.map(Boolean);
    }
    return items.map(() => false);
  });

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
    completedFlags,
    toggleItem,
    ...stats
  };
}
