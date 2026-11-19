/**
 * Single Responsibility Principle (SRP):
 * Renders the interactive classroom checklist consuming useChecklistProgress().
 */
import React from 'react';
import { useChecklistProgress } from '../../hooks/useChecklistProgress';

export function ClassChecklist() {
  const { items, completedFlags, toggleItem, total, completed, percentage } = useChecklistProgress();

  return (
    <section className="section" id="progreso-clase">
      <div className="container">
        <div className="progress-card animate-on-scroll">
          <div className="progress-header">
            <div>
              <span className="section-label">Control Pedagógico en el Aula</span>
              <h3 style={{ fontSize: '1.3rem' }}>Checklist Rápido de Clase Activa (Alfabetización)</h3>
            </div>
            <span id="task-count-text" style={{ fontWeight: 700, color: 'var(--sena-green)' }}>
              {completed} de {total} completadas ({percentage}%)
            </span>
          </div>

          <div className="hours-bar" style={{ height: '10px', marginBottom: '20px' }}>
            <div className="hours-bar-fill" id="task-progress-bar" style={{ width: `${percentage}%` }}></div>
          </div>

          <div className="task-checklist">
            {items.map((item, index) => {
              const isDone = Boolean(completedFlags[index]);
              return (
                <div
                  key={item.id}
                  className={`task-item ${isDone ? 'completed' : ''}`}
                  onClick={() => toggleItem(index)}
                  role="checkbox"
                  aria-checked={isDone}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(index);
                    }
                  }}
                >
                  <div className="task-checkbox">✓</div>
                  <span className="task-label">
                    <strong>{item.code}</strong> {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
