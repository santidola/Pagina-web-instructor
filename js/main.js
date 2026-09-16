/**
 * SENA — Alfabetización Informática
 * Script de interacción para el Aula y Apoyo Didáctico al Instructor
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // 1. NAVBAR STICKY & MENÚ MÓVIL
  // ========================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  const navToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-nav');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      const isOpen = navMenu.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
      }
    });
  }

  // ========================================
  // 2. SCROLL REVEAL ANIMATIONS
  // ========================================
  const animElements = document.querySelectorAll('.animate-on-scroll');
  if (animElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    animElements.forEach((el) => observer.observe(el));
  }

  // ========================================
  // 3. TEMPORIZADOR DE TALLER / PRÁCTICA (AULA)
  // ========================================
  const timerDisplay = document.querySelector('.timer-display');
  const timerStartBtn = document.getElementById('timer-start');
  const timerPauseBtn = document.getElementById('timer-pause');
  const timerResetBtn = document.getElementById('timer-reset');
  const presetChips = document.querySelectorAll('.preset-chip');

  let timerDuration = 30 * 60; // 30 min default
  let remainingTime = timerDuration;
  let timerInterval = null;
  let isRunning = false;

  const updateDisplay = () => {
    if (!timerDisplay) return;
    const mins = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    if (timerStartBtn) timerStartBtn.classList.add('active');
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        if (timerStartBtn) timerStartBtn.classList.remove('active');
        if (timerDisplay) {
          timerDisplay.style.color = '#E65100';
          timerDisplay.textContent = '¡TIEMPO!';
          setTimeout(() => {
            timerDisplay.style.color = '';
            resetTimer();
          }, 4000);
        }
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    if (timerStartBtn) timerStartBtn.classList.remove('active');
  };

  const resetTimer = () => {
    pauseTimer();
    remainingTime = timerDuration;
    updateDisplay();
  };

  if (timerStartBtn) timerStartBtn.addEventListener('click', startTimer);
  if (timerPauseBtn) timerPauseBtn.addEventListener('click', pauseTimer);
  if (timerResetBtn) timerResetBtn.addEventListener('click', resetTimer);

  presetChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      presetChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const mins = parseInt(chip.getAttribute('data-mins'), 10) || 30;
      timerDuration = mins * 60;
      resetTimer();
    });
  });

  updateDisplay();

  // ========================================
  // 4. MODO PROYECTOR / PANTALLA COMPLETA
  // ========================================
  const projectorBtn = document.getElementById('btn-projector');
  if (projectorBtn) {
    projectorBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        projectorBtn.innerHTML = '<span>📺 Salir de Pantalla Completa</span>';
      } else {
        document.exitFullscreen().catch(() => {});
        projectorBtn.innerHTML = '<span>📺 Modo Proyector / Pantalla Completa</span>';
      }
    });
  }

  // ========================================
  // 5. NAVEGADOR DE TABS INTERACTIVAS DE SESIÓN
  // ========================================
  const tabBtns = document.querySelectorAll('.session-tab-btn');
  const tabPanels = document.querySelectorAll('.session-view-panel');

  const switchTab = (targetId) => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));

    const activeBtn = document.querySelector(`.session-tab-btn[data-target="${targetId}"]`);
    const activePanel = document.getElementById(targetId);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) {
      activePanel.classList.add('active');
      // Scroll smoothly to panel if user selected
      activePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchTab(targetId);
      window.location.hash = targetId;
    });
  });

  // Handle hash in URL (e.g. programa.html#sesion-3)
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
      switchTab(hash);
    }
  }

  // ========================================
  // 6. SIMULADOR EN VIVO DE EXCEL (SESIÓN 3)
  // ========================================
  const excelInputs = document.querySelectorAll('.excel-num-val');
  const excelSumResult = document.getElementById('excel-sum-res');
  const excelAvgResult = document.getElementById('excel-avg-res');
  const excelMaxResult = document.getElementById('excel-max-res');
  const excelFormulaPreview = document.getElementById('excel-formula-preview');

  const recalculateExcel = () => {
    if (excelInputs.length === 0) return;
    let sum = 0;
    let count = 0;
    let max = -Infinity;

    excelInputs.forEach((input) => {
      const val = parseFloat(input.value) || 0;
      sum += val;
      count++;
      if (val > max) max = val;
    });

    const avg = count > 0 ? (sum / count) : 0;

    if (excelSumResult) excelSumResult.textContent = `$${sum.toLocaleString('es-CO')}`;
    if (excelAvgResult) excelAvgResult.textContent = `$${Math.round(avg).toLocaleString('es-CO')}`;
    if (excelMaxResult) excelMaxResult.textContent = `$${(max === -Infinity ? 0 : max).toLocaleString('es-CO')}`;
  };

  excelInputs.forEach((input) => {
    input.addEventListener('input', recalculateExcel);
    input.addEventListener('focus', () => {
      if (excelFormulaPreview) {
        excelFormulaPreview.textContent = `=VALOR(${input.getAttribute('data-cell') || 'B2'})`;
      }
    });
  });
  recalculateExcel();

  // ========================================
  // 7. CHECKLIST INTERACTIVO DE CLASE
  // ========================================
  const taskItems = document.querySelectorAll('.task-item');
  const taskProgress = document.getElementById('task-progress-bar');
  const taskCountDisplay = document.getElementById('task-count-text');

  const updateProgress = () => {
    if (taskItems.length === 0) return;
    const completed = document.querySelectorAll('.task-item.completed').length;
    const total = taskItems.length;
    const pct = Math.round((completed / total) * 100);

    if (taskProgress) taskProgress.style.width = `${pct}%`;
    if (taskCountDisplay) taskCountDisplay.textContent = `${completed} de ${total} completadas (${pct}%)`;

    // Save state in localStorage
    const states = Array.from(taskItems).map((item) => item.classList.contains('completed'));
    try {
      localStorage.setItem('sena_task_states', JSON.stringify(states));
    } catch (e) {}
  };

  // Restore state
  try {
    const saved = JSON.parse(localStorage.getItem('sena_task_states'));
    if (saved && Array.isArray(saved)) {
      taskItems.forEach((item, index) => {
        if (saved[index]) item.classList.add('completed');
      });
    }
  } catch (e) {}

  taskItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('completed');
      updateProgress();
    });
  });
  updateProgress();

  // ========================================
  // 8. BUSCADOR EN VIVO DE GLOSARIO
  // ========================================
  const glossarySearch = document.getElementById('glossary-search');
  const glossaryCards = document.querySelectorAll('.glossary-card');
  const glossaryCount = document.getElementById('glossary-count');

  if (glossarySearch && glossaryCards.length > 0) {
    glossarySearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      glossaryCards.forEach((card) => {
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'block';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (glossaryCount) {
        glossaryCount.textContent = `Mostrando ${matchCount} de ${glossaryCards.length} términos`;
      }
    });
  }

  // ========================================
  // 9. EVALUADOR INTERACTIVO DE CONTRASEÑAS (SESIÓN 5)
  // ========================================
  const pwdInput = document.getElementById('pwd-test-input');
  const pwdScore = document.getElementById('pwd-test-score');
  const pwdBar = document.getElementById('pwd-test-bar');

  if (pwdInput && pwdScore && pwdBar) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      let score = 0;
      if (val.length >= 8) score += 25;
      if (/[A-Z]/.test(val)) score += 25;
      if (/[0-9]/.test(val)) score += 25;
      if (/[^A-Za-z0-9]/.test(val)) score += 25;

      pwdBar.style.width = `${score}%`;
      if (score === 0) {
        pwdBar.style.backgroundColor = '#ccc';
        pwdScore.textContent = 'Escribe una contraseña para probarla';
      } else if (score <= 25) {
        pwdBar.style.backgroundColor = '#c53030';
        pwdScore.textContent = '❌ Muy Débil (Fácil de vulnerar)';
      } else if (score <= 50) {
        pwdBar.style.backgroundColor = '#dd6b20';
        pwdScore.textContent = '⚠️ Débil (Agrega números o mayúsculas)';
      } else if (score <= 75) {
        pwdBar.style.backgroundColor = '#3182ce';
        pwdScore.textContent = '👍 Buena (Agrega símbolos especiales)';
      } else {
        pwdBar.style.backgroundColor = '#38a169';
        pwdScore.textContent = '🛡️ ¡Excelente y Segura!';
      }
    });
  }
});
