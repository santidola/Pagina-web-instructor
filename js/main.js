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
  // 6. SIMULADOR MÓVIL Y ALARMA (SESIÓN 1)
  // ========================================
  const alarmTimeInput = document.getElementById('alarm-time-input');
  const setAlarmBtn = document.getElementById('btn-set-alarm');
  const alarmStatusDisplay = document.getElementById('alarm-status-display');
  const mobileClockDisplay = document.getElementById('mobile-clock');
  const mobileSwitches = document.querySelectorAll('.mobile-switch-input');

  if (mobileClockDisplay) {
    const updateClock = () => {
      const now = new Date();
      mobileClockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    updateClock();
    setInterval(updateClock, 10000);
  }

  if (setAlarmBtn && alarmTimeInput && alarmStatusDisplay) {
    setAlarmBtn.addEventListener('click', () => {
      const timeVal = alarmTimeInput.value;
      if (!timeVal) {
        alarmStatusDisplay.innerHTML = '<span style="color: #dc2626;">⚠️ Por favor selecciona una hora.</span>';
        return;
      }
      alarmStatusDisplay.innerHTML = `<span style="color: var(--sena-green-dark); font-weight: 700;">✅ ¡Alarma activada para las ${timeVal}! Sonará con el tono predeterminado.</span>`;
    });
  }

  if (mobileSwitches.length > 0) {
    mobileSwitches.forEach((sw) => {
      sw.addEventListener('change', (e) => {
        const feature = e.target.getAttribute('data-feature') || 'Ajuste';
        const isChecked = e.target.checked;
        const feedback = document.getElementById('mobile-quick-feedback');
        if (feedback) {
          feedback.textContent = `${feature} ${isChecked ? 'ACTIVADO(A) 🟢' : 'DESACTIVADO(A) ⚪'}`;
          feedback.style.display = 'block';
          setTimeout(() => { feedback.style.display = 'none'; }, 2500);
        }
      });
    });
  }

  // ========================================
  // 7. CONSTRUCTOR DE CORREO ELECTRÓNICO (SESIÓN 2)
  // ========================================
  const emailTo = document.getElementById('email-to');
  const emailSubject = document.getElementById('email-subject');
  const emailGreeting = document.getElementById('email-greeting');
  const emailBody = document.getElementById('email-body');
  const emailFarewell = document.getElementById('email-farewell');
  const emailSignature = document.getElementById('email-signature');

  const previewTo = document.getElementById('preview-email-to');
  const previewSubject = document.getElementById('preview-email-subject');
  const previewGreeting = document.getElementById('preview-email-greeting');
  const previewBody = document.getElementById('preview-email-body');
  const previewFarewell = document.getElementById('preview-email-farewell');
  const previewSignature = document.getElementById('preview-email-signature');

  const updateEmailPreview = () => {
    if (previewTo && emailTo) previewTo.textContent = emailTo.value.trim() || 'destinatario@correo.com';
    if (previewSubject && emailSubject) previewSubject.textContent = emailSubject.value.trim() || '(Sin asunto aún)';
    if (previewGreeting && emailGreeting) previewGreeting.textContent = emailGreeting.value.trim() || 'Estimado/a...';
    if (previewBody && emailBody) previewBody.textContent = emailBody.value.trim() || 'Escribe aquí el objetivo y desarrollo claro de tu mensaje...';
    if (previewFarewell && emailFarewell) previewFarewell.textContent = emailFarewell.value.trim() || 'Atentamente,';
    if (previewSignature && emailSignature) previewSignature.textContent = emailSignature.value.trim() || 'Nombre del Aprendiz · Ficha SENA';
  };

  [emailTo, emailSubject, emailGreeting, emailBody, emailFarewell, emailSignature].forEach((el) => {
    if (el) el.addEventListener('input', updateEmailPreview);
  });
  updateEmailPreview();

  // ========================================
  // 8. SIMULADOR EN VIVO DE EXCEL: INGRESOS Y GASTOS (SESIÓN 3)
  // ========================================
  const incomeInputs = document.querySelectorAll('.excel-income-val');
  const expenseInputs = document.querySelectorAll('.excel-expense-val');
  const totalIncomeRes = document.getElementById('excel-total-income');
  const totalExpenseRes = document.getElementById('excel-total-expense');
  const netBalanceRes = document.getElementById('excel-net-balance');
  const balanceBadge = document.getElementById('excel-balance-badge');
  const excelFormulaPreview = document.getElementById('excel-formula-preview');

  const recalculateBudget = () => {
    let sumIncome = 0;
    let sumExpense = 0;

    incomeInputs.forEach((inp) => {
      sumIncome += parseFloat(inp.value) || 0;
    });

    expenseInputs.forEach((inp) => {
      sumExpense += parseFloat(inp.value) || 0;
    });

    const net = sumIncome - sumExpense;

    if (totalIncomeRes) totalIncomeRes.textContent = `$${sumIncome.toLocaleString('es-CO')}`;
    if (totalExpenseRes) totalExpenseRes.textContent = `$${sumExpense.toLocaleString('es-CO')}`;
    if (netBalanceRes) netBalanceRes.textContent = `$${net.toLocaleString('es-CO')}`;

    if (balanceBadge) {
      if (net > 0) {
        balanceBadge.className = 'badge badge-green';
        balanceBadge.textContent = '🟢 Superávit (Saldo disponible para ahorro)';
      } else if (net === 0) {
        balanceBadge.className = 'badge badge-outline';
        balanceBadge.textContent = '⚪ Equilibrio exacto (Ingresos = Gastos)';
      } else {
        balanceBadge.className = 'badge';
        balanceBadge.style.background = '#dc2626';
        balanceBadge.style.color = '#fff';
        balanceBadge.textContent = '🔴 Déficit (Gastas más de lo que ganas)';
      }
    }
  };

  [...incomeInputs, ...expenseInputs].forEach((inp) => {
    inp.addEventListener('input', recalculateBudget);
    inp.addEventListener('focus', () => {
      if (excelFormulaPreview) {
        const cell = inp.getAttribute('data-cell') || 'B2';
        const isInc = inp.classList.contains('excel-income-val');
        excelFormulaPreview.textContent = `=VALOR_CELDA(${cell}) [${isInc ? 'Columna Ingreso' : 'Columna Gasto'}]`;
      }
    });
  });
  recalculateBudget();

  // ========================================
  // 9. DETECTOR DE MENSAJES FRAUDULENTOS & ENLACES (SESIÓN 4)
  // ========================================
  const phishingButtons = document.querySelectorAll('.btn-phishing-check');
  phishingButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.phishing-card');
      if (!card) return;
      const isActuallyFraud = card.getAttribute('data-fraud') === 'true';
      const userChoice = btn.getAttribute('data-choice') === 'fraud';
      const feedback = card.querySelector('.phishing-feedback');
      const explainText = card.getAttribute('data-explain') || '';

      if (feedback) {
        feedback.classList.add('show');
        if (userChoice === isActuallyFraud) {
          feedback.style.background = '#dcfce7';
          feedback.style.border = '1px solid #86efac';
          feedback.style.color = '#14532d';
          feedback.innerHTML = `<strong>¡Correcto! 🎯</strong> ${explainText}`;
        } else {
          feedback.style.background = '#fee2e2';
          feedback.style.border = '1px solid #fca5a5';
          feedback.style.color = '#7f1d1d';
          feedback.innerHTML = `<strong>Cuidado: ⚠️</strong> ${explainText}`;
        }
      }
    });
  });

  // ========================================
  // 10. LABORATORIO INTERACTIVO DE IA Y PROMPTS (SESIÓN 5)
  // ========================================
  const aiChatThread = document.getElementById('ai-chat-thread');
  const aiPromptInput = document.getElementById('ai-prompt-input');
  const btnSendAi = document.getElementById('btn-send-ai');
  const aiPresetChips = document.querySelectorAll('.ai-preset-chip');

  const presetResponses = {
    pieza: {
      prompt: 'Tengo una habitación de 3x3 metros desordenada con ropa en la cama y papeles en la mesa. ¿Puedes darme un plan en 4 pasos para organizarla en 30 minutos?',
      response: `<strong>Plan Rápido de Organización (30 Minutos):</strong><br/>
1. <strong>Fase Despeje de Cama (7 min):</strong> Dobla o cuelga la ropa limpia en el armario y coloca la ropa sucia en el canasto.<br/>
2. <strong>Fase Superficies (8 min):</strong> Clasifica los papeles de la mesa: archiva los importantes en una carpeta y recicla los que ya no sirvan.<br/>
3. <strong>Fase Piso Despejado (7 min):</strong> Levanta zapatos y objetos del suelo, ubicándolos en su lugar o debajo de la cama en cajas.<br/>
4. <strong>Fase Ventilación y Aroma (8 min):</strong> Abre la ventana 10 minutos, tiende la cama con firmeza y rocía un toque de ambientador. ¡Tu mente descansará el doble!`
    },
    mendigo: {
      prompt: 'En la calle hay un cartel que dice: "Soy ciego, por favor ayúdenme". Reescribe este mensaje con empatía humana para tocar el corazón de las personas y generar mayor solidaridad.',
      response: `<strong>Propuesta Creativa y Empática (La fuerza del lenguaje positivo):</strong><br/>
<em>"Hoy es un día hermoso y soleado... pero yo no puedo verlo. Tu generosidad ilumina mi camino."</em><br/><br/>
💡 <strong>Explicación pedagógica:</strong> En lugar de enfocarse solo en la carencia o la lástima, el nuevo mensaje conecta al lector con la gratitud de su propio sentido de la vista, despertando empatía genuina y deseo espontáneo de colaborar.`
    },
    correo_ai: {
      prompt: 'Ayúdame a redactar un correo formal al instructor pidiéndole permiso para entregar una evidencia un día después por motivos médicos.',
      response: `<strong>Borrador de Correo Formal Generado:</strong><br/>
<strong>Asunto:</strong> Solicitud de plazo para evidencia de clase - Aprendiz [Tu Nombre]<br/>
<strong>Estimado/a Instructor/a:</strong><br/>
Espero se encuentre muy bien. Me comunico respetuosamente para solicitarle de manera atenta un plazo adicional de un día para la entrega de la evidencia práctica de la Sesión, debido a una situación médica sobreviniente (adjunto constancia médica).<br/>
Agradezco de antemano su valiosa comprensión y quedo atento a sus indicaciones.<br/>
<strong>Cordialmente,</strong><br/>
[Tu Nombre y Apellidos]<br/>
Documento: [Número] · Ficha: [Número]`
    }
  };

  const addAiMessage = (sender, content, badge = '') => {
    if (!aiChatThread) return;
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${sender}`;
    if (badge) {
      bubble.innerHTML = `<span class="ai-bubble-badge">${badge}</span><div>${content}</div>`;
    } else {
      bubble.innerHTML = `<div>${content}</div>`;
    }
    aiChatThread.appendChild(bubble);
    aiChatThread.scrollTop = aiChatThread.scrollHeight;
  };

  aiPresetChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      aiPresetChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.getAttribute('data-preset');
      const data = presetResponses[key];
      if (data) {
        if (aiPromptInput) aiPromptInput.value = data.prompt;
      }
    });
  });

  if (btnSendAi && aiPromptInput) {
    btnSendAi.addEventListener('click', () => {
      const text = aiPromptInput.value.trim();
      if (!text) return;
      addAiMessage('user', text, 'Tú (Aprendiz / Instructor)');
      aiPromptInput.value = '';

      // Check if matches known preset or generate dynamic helpful answer
      setTimeout(() => {
        let reply = '';
        if (text.toLowerCase().includes('habitacion') || text.toLowerCase().includes('pieza') || text.toLowerCase().includes('desorden')) {
          reply = presetResponses.pieza.response;
        } else if (text.toLowerCase().includes('ciego') || text.toLowerCase().includes('mendigo') || text.toLowerCase().includes('cartel')) {
          reply = presetResponses.mendigo.response;
        } else if (text.toLowerCase().includes('permiso') || text.toLowerCase().includes('correo')) {
          reply = presetResponses.correo_ai.response;
        } else {
          reply = `<strong>Respuesta Inteligente:</strong><br/>
¡Excelente instrucción! La Inteligencia Artificial analiza tu solicitud <em>"${text.replace(/</g, '&lt;')}"</em> y te sugiere:<br/>
1. <strong>Estructurar el objetivo:</strong> Definir claramente qué necesitas lograr.<br/>
2. <strong>Aplicar contexto:</strong> Decirle a la herramienta quién eres y para qué lo requieres.<br/>
3. <strong>Revisar y personalizar:</strong> Nunca copiar y pegar a ciegas; siempre aportar tu criterio humano y ético.`;
        }
        addAiMessage('assistant', reply, '🤖 Asistente de IA Educativa');
      }, 500);
    });

    aiPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        btnSendAi.click();
      }
    });
  }

  // ========================================
  // 11. CHECKLIST INTERACTIVO DE CLASE
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
      localStorage.setItem('sena_task_states_v2', JSON.stringify(states));
    } catch (e) {}
  };

  try {
    const saved = JSON.parse(localStorage.getItem('sena_task_states_v2'));
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
  // 12. BUSCADOR EN VIVO DE GLOSARIO
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
  // 13. RENDERIZADOR DEL CATÁLOGO MULTI-CURSO (INDEX.HTML)
  // ========================================
  const catalogGrid = document.getElementById('courses-catalog-grid');
  const catalogSearchInput = document.getElementById('courses-search-input');
  const catalogFilterBtns = document.querySelectorAll('.catalog-filter-btn');
  const catalogCoursesCount = document.getElementById('catalog-courses-count');

  if (catalogGrid && typeof COURSES_DATA !== 'undefined') {
    let currentCategoryFilter = 'all';
    let currentSearchTerm = '';

    const renderCourses = () => {
      const filtered = COURSES_DATA.filter((course) => {
        const matchesCategory = currentCategoryFilter === 'all' || 
          (currentCategoryFilter === 'activo' && course.status === 'Activo') ||
          (currentCategoryFilter === 'preparacion' && course.status === 'Preparación') ||
          (course.category && course.category.toLowerCase().includes(currentCategoryFilter.toLowerCase()));

        const matchesSearch = 
          course.title.toLowerCase().includes(currentSearchTerm) ||
          course.description.toLowerCase().includes(currentSearchTerm) ||
          course.code.toLowerCase().includes(currentSearchTerm) ||
          (course.category && course.category.toLowerCase().includes(currentSearchTerm));

        return matchesCategory && matchesSearch;
      });

      if (catalogCoursesCount) {
        catalogCoursesCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'curso disponible' : 'cursos disponibles'}`;
      }

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--bg-secondary); border-radius: var(--radius); border: 1px dashed var(--border);">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
            <h3 style="margin-bottom: 8px;">No se encontraron cursos</h3>
            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 16px;">
              No hay programas que coincidan con "${currentSearchTerm}". Prueba con otro término o limpia los filtros.
            </p>
            <button class="btn btn-secondary" id="btn-clear-search">Limpiar Búsqueda</button>
          </div>
        `;
        const clearBtn = document.getElementById('btn-clear-search');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            if (catalogSearchInput) catalogSearchInput.value = '';
            currentSearchTerm = '';
            currentCategoryFilter = 'all';
            catalogFilterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
            renderCourses();
          });
        }
        return;
      }

      catalogGrid.innerHTML = filtered.map((course) => {
        const isAlfabetizacion = course.id === 'alfabetizacion-digital';
        const sessionsList = (course.sessions || []).slice(0, 3).map(s => `<li>${s.title} (${s.hours})</li>`).join('');
        const moreSessions = (course.sessions || []).length > 3 ? `<li>+${course.sessions.length - 3} sesiones más...</li>` : '';

        // Destination link
        const targetLink = isAlfabetizacion ? 'programa.html' : `curso.html?id=${course.id}`;
        const guideLink = isAlfabetizacion ? 'guia.html' : `guia.html?id=${course.id}`;
        const isReady = course.status === 'Activo';

        return `
          <div class="course-portal-card animate-on-scroll is-visible">
            <div class="course-card-header" style="background: ${course.coverGradient || 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'};">
              <div class="course-card-top-row">
                <div class="course-card-icon">${course.icon || '📚'}</div>
                <span class="course-badge-status">${course.badgeText || course.status}</span>
              </div>
              <div>
                <span class="course-card-category">${course.category}</span>
              </div>
            </div>

            <div class="course-card-body">
              <h3 class="course-card-title">${course.title}</h3>
              <div class="course-card-code">Código: ${course.code}</div>
              <p class="course-card-desc">${course.description}</p>

              <div class="course-meta-pills">
                <span class="course-meta-pill">⏱️ ${course.duration}</span>
                <span class="course-meta-pill">📅 ${course.sessionsCount} Sesiones</span>
                <span class="course-meta-pill">📁 Materiales</span>
              </div>

              <div class="course-sessions-preview">
                <div class="course-sessions-preview-title">Contenido del Curso:</div>
                <ul class="course-sessions-list">
                  ${sessionsList}
                  ${moreSessions}
                </ul>
              </div>

              <div class="course-card-footer">
                ${isReady ? `
                  <a href="${targetLink}" class="btn btn-primary" style="flex: 1;">
                    Ingresar al Curso →
                  </a>
                  <a href="${guideLink}" class="btn btn-secondary" title="Ver Guía de Aprendizaje">
                    Guía
                  </a>
                ` : `
                  <a href="${targetLink}" class="btn btn-secondary" style="flex: 1;" onclick="event.preventDefault(); alert('¡Este curso está preparado! Puedes pasarme los archivos y temas de sus sesiones para activarlo.');">
                    📂 Subir Materiales
                  </a>
                `}
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    renderCourses();

    if (catalogSearchInput) {
      catalogSearchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        renderCourses();
      });
    }

    catalogFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        catalogFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategoryFilter = btn.getAttribute('data-filter') || 'all';
        renderCourses();
      });
    });
  }
});

