/**
 * ============================================================
 * CONTROLADOR DINÁMICO DE CURSO (CURSO.HTML)
 * ============================================================
 * Carga los datos del curso desde COURSES_DATA usando el parámetro URL ?id=
 * y construye las pestañas, sesiones, materiales y herramientas interactivas.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || 'alfabetizacion-digital';

  // Buscar curso en la base de datos modular
  const course = (typeof getCourseById === 'function') 
    ? getCourseById(courseId) 
    : (window.COURSES_DATA || []).find(c => c.id === courseId);

  const container = document.getElementById('dynamic-course-container');
  const errorContainer = document.getElementById('course-not-found');
  const breadcrumbName = document.getElementById('breadcrumb-course-name');

  if (!course) {
    if (container) container.style.display = 'none';
    if (errorContainer) {
      errorContainer.style.display = 'block';
      const requestedIdEl = document.getElementById('requested-course-id');
      if (requestedIdEl) requestedIdEl.textContent = courseId;
    }
    return;
  }

  // Actualizar título de la pestaña del navegador
  document.title = `${course.title} — SENA | Portal del Instructor`;

  if (breadcrumbName) {
    breadcrumbName.textContent = course.title;
  }

  // 1. RENDERIZAR HERO BANNER DEL CURSO
  const heroBanner = document.getElementById('course-hero-banner');
  if (heroBanner) {
    heroBanner.style.background = course.coverGradient || 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)';
    heroBanner.innerHTML = `
      <div class="course-hero-badge-row">
        <span class="course-badge-status">${course.status || 'Activo'}</span>
        <span style="font-size: 0.85rem; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 50px; font-weight: 600;">
          ${course.category || 'Formación SENA'}
        </span>
        <span style="font-size: 0.85rem; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 50px; font-weight: 600;">
          Código: ${course.code}
        </span>
      </div>

      <h1 class="course-hero-title">${course.icon || '💻'} ${course.title}</h1>
      
      <p class="course-hero-subtitle">
        ${course.description}
      </p>

      <div class="course-hero-stats">
        <div class="course-hero-stat-item">
          <span>⏱️</span>
          <strong>${course.duration}</strong>
        </div>
        <div class="course-hero-stat-item">
          <span>📅</span>
          <strong>${(course.sessions || []).length} Sesiones de Clase</strong>
        </div>
        <div class="course-hero-stat-item">
          <span>🎯</span>
          <strong>${(course.raps || []).length} RAPs Asociados</strong>
        </div>
        <div class="course-hero-stat-item">
          <span>📁</span>
          <span>Carpeta: <code>${course.materialsFolder || 'materiales/'}</code></span>
        </div>
      </div>
    `;
  }

  // 2. RENDERIZAR TABS DE SESIONES
  const tabsContainer = document.getElementById('course-session-tabs');
  const panelsContainer = document.getElementById('course-session-panels');

  if (tabsContainer && panelsContainer) {
    const sessions = course.sessions || [];

    // Generar botones de pestañas
    let tabsHtml = sessions.map((s, index) => `
      <button class="session-tab-btn ${index === 0 ? 'active' : ''}" data-target="${s.id}" type="button" role="tab">
        <span>${s.icon || '📌'} Sesión ${s.number}: ${s.title.split(':')[0]}</span>
        <span class="tab-badge">${s.hours}</span>
      </button>
    `).join('');

    if (course.transferProject) {
      tabsHtml += `
        <button class="session-tab-btn" data-target="sesion-transferencia" type="button" role="tab">
          <span>🏆 Transferencia: ${course.transferProject.title}</span>
          <span class="tab-badge" style="background: #E65100; color: #fff;">${course.transferProject.hours}</span>
        </button>
      `;
    }
    tabsContainer.innerHTML = tabsHtml;

    // Generar paneles de contenido por sesión
    let panelsHtml = sessions.map((s, index) => {
      // Topics list
      const topicsList = (s.topics || []).map((t, tIndex) => `
        <div class="activity-step-box">
          <div class="activity-step-header">
            <div class="activity-step-num">${tIndex + 1}</div>
            <strong style="color: var(--text-primary); font-size: 0.95rem;">${t}</strong>
          </div>
        </div>
      `).join('');

      // Materials list
      const materials = s.materials || [];
      let materialsHtml = '';

      if (materials.length === 0) {
        materialsHtml = `
          <div style="padding: 16px; background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1px dashed var(--border); text-align: center; color: var(--text-muted); font-size: 0.88rem;">
            📂 No hay materiales subidos para esta sesión aún.<br/>
            <small style="color: var(--text-secondary);">Coloca tus archivos en <code>${course.materialsFolder}${s.id}/</code></small>
          </div>
        `;
      } else {
        materialsHtml = `
          <div class="materials-list-grid">
            ${materials.map(m => {
              let iconEmoji = '📄';
              if (m.type === 'pdf') iconEmoji = '📕';
              else if (m.type === 'sheet') iconEmoji = '📗';
              else if (m.type === 'document') iconEmoji = '📘';
              else if (m.type === 'image') iconEmoji = '🖼️';
              else if (m.type === 'slides') iconEmoji = '📙';
              else if (m.type === 'link') iconEmoji = '🔗';

              return `
                <div class="material-card-item">
                  <div class="material-icon-box">${iconEmoji}</div>
                  <div class="material-info">
                    <div class="material-name" title="${m.name}">${m.name}</div>
                    <div class="material-subtext">${m.path}</div>
                  </div>
                  <div>
                    ${m.available ? `
                      <a href="${m.path}" class="material-action-btn material-btn-available" download target="_blank">
                        Descargar ↓
                      </a>
                    ` : `
                      <span class="material-action-btn material-btn-pending" title="Pásame este archivo para activarlo">
                        Por subir
                      </span>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // Simuladores interactivos específicos si es alfabetización
      let interactiveComponentHtml = '';
      if (course.id === 'alfabetizacion-digital') {
        if (s.number === 1) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">📱 Simulador de Smartphone y Ajustes de Alarma</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
                Permite a los aprendices interactuar en vivo con la configuración del dispositivo móvil, probar el reloj digital y activar su alarma.
              </p>
              <div class="mobile-simulator-frame">
                <div class="mobile-notch"></div>
                <div class="mobile-screen-content">
                  <div class="mobile-status-bar">
                    <span id="mobile-clock">12:00</span>
                    <span>📶 🔋 100%</span>
                  </div>
                  <div id="mobile-quick-feedback" class="mobile-feedback-toast" style="display: none;"></div>
                  <div class="mobile-widget-box">
                    <div style="font-size: 0.82rem; font-weight: 700; color: var(--sena-green-dark); margin-bottom: 8px;">⏰ Ajustar Alarma de Clase</div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                      <input type="time" id="alarm-time-input" class="form-input" style="flex: 1; padding: 8px;" value="07:00" />
                      <button id="btn-set-alarm" class="btn btn-primary" type="button" style="padding: 8px 14px; font-size: 0.85rem;">Activar</button>
                    </div>
                    <div id="alarm-status-display" style="margin-top: 8px; font-size: 0.8rem; color: var(--text-muted);">Alarma apagada</div>
                  </div>
                  <div class="mobile-settings-list">
                    <label class="mobile-setting-item">
                      <span>📶 Conexión Wi-Fi SENA</span>
                      <input type="checkbox" class="mobile-switch-input" data-feature="Wi-Fi SENA" checked />
                    </label>
                    <label class="mobile-setting-item">
                      <span>🔊 Sonido y Notificaciones</span>
                      <input type="checkbox" class="mobile-switch-input" data-feature="Sonido" checked />
                    </label>
                    <label class="mobile-setting-item">
                      <span>🔒 Bloqueo PIN Seguro</span>
                      <input type="checkbox" class="mobile-switch-input" data-feature="Bloqueo PIN" checked />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else if (s.number === 2) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">✉️ Constructor y Previsualizador de Correo Formal</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
                Escribe en cada campo para ver cómo se estructura un correo electrónico profesional en tiempo real.
              </p>
              <div class="email-builder-grid">
                <div class="email-builder-form">
                  <div class="form-group">
                    <label class="form-label">1. Destinatario (Para:)</label>
                    <input type="email" id="email-to" class="form-input" placeholder="ejemplo.instructor@sena.edu.co" value="coordinacion.academica@sena.edu.co" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">2. Asunto Claro y Específico:</label>
                    <input type="text" id="email-subject" class="form-input" placeholder="Ej: Solicitud de certificado - Ficha 22810239" value="Entrega Taller 01 - Ficha 22810239" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">3. Saludo Formal:</label>
                    <input type="text" id="email-greeting" class="form-input" value="Apreciado/a Instructor/a y Equipo Académico:" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">4. Cuerpo / Objetivo del Mensaje:</label>
                    <textarea id="email-body" class="form-input" rows="4">Por medio del presente correo hago entrega formal del documento de texto solicitado en la Sesión 2 de formación.</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">5. Despedida y Firma:</label>
                    <input type="text" id="email-farewell" class="form-input" value="Agradezco su atención y quedo atento/a a sus comentarios." />
                    <input type="text" id="email-signature" class="form-input" style="margin-top: 6px;" value="Nombre del Aprendiz · Ficha SENA 22810239" />
                  </div>
                </div>
                <div class="email-preview-box">
                  <div class="email-preview-header">Vista Previa del Correo en Bandeja</div>
                  <div class="email-preview-body">
                    <div style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Para:</strong> <span id="preview-email-to">coordinacion.academica@sena.edu.co</span></div>
                    <div style="font-size: 0.85rem; margin-bottom: 12px;"><strong>Asunto:</strong> <span id="preview-email-subject">Entrega Taller 01 - Ficha 22810239</span></div>
                    <hr style="border: 0; border-top: 1px solid var(--border-light); margin-bottom: 14px;" />
                    <p id="preview-email-greeting" style="font-weight: 600; margin-bottom: 8px;">Apreciado/a Instructor/a y Equipo Académico:</p>
                    <p id="preview-email-body" style="white-space: pre-wrap; font-size: 0.88rem; line-height: 1.6; margin-bottom: 14px;">Por medio del presente correo hago entrega formal...</p>
                    <p id="preview-email-farewell" style="font-size: 0.88rem; margin-bottom: 12px;">Agradezco su atención y quedo atento/a a sus comentarios.</p>
                    <p id="preview-email-signature" style="font-weight: 700; color: var(--sena-green-dark); font-size: 0.88rem;">Nombre del Aprendiz · Ficha SENA 22810239</p>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else if (s.number === 3) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; margin-bottom: 8px;">
                <h3 style="font-size: 1.15rem; color: var(--sena-green-dark); margin: 0; display: flex; align-items: center; gap: 8px;">
                  📊 Simulador en Vivo: Tabla de Ingresos y Gastos con Saldo Automático
                </h3>
                <span id="excel-balance-badge" class="badge badge-green">🟢 Superávit (Saldo Positivo)</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 14px;">
                Modifica los números en las casillas blancas de la <strong>Columna B</strong> para ver cómo se recalculan los totales y el saldo disponible al instante:
              </p>

              <div class="excel-sim">
                <div class="excel-header-bar">
                  <span>📗 Excel SENA — Presupuesto Personal y del Hogar</span>
                  <span>Modo Práctico</span>
                </div>
                <div class="excel-formula-bar">
                  <span class="excel-fx-icon">fx</span>
                  <span id="excel-formula-preview">=SALDO_DISPONIBLE(Total_Ingresos - Total_Gastos)</span>
                </div>
                <table class="excel-grid">
                  <thead>
                    <tr>
                      <th class="row-num">#</th>
                      <th style="width: 60%; text-align: left; padding-left: 10px;">Columna A (Concepto / Rubro)</th>
                      <th style="width: 40%; text-align: right; padding-right: 10px;">Columna B (Valor en Pesos $)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="background: #eef8eb;">
                      <td class="row-num">1</td>
                      <td style="font-weight: 700; color: #166534; padding-left: 10px;">🟢 SECCIÓN: INGRESOS DEL MES</td>
                      <td style="font-weight: 700; color: #166534; text-align: right; padding-right: 10px;">Monto</td>
                    </tr>
                    <tr>
                      <td class="row-num">2</td>
                      <td style="padding-left: 10px;">Salario / Ingreso principal</td>
                      <td><input type="number" class="excel-input excel-income-val" data-cell="B2" value="1400000" /></td>
                    </tr>
                    <tr>
                      <td class="row-num">3</td>
                      <td style="padding-left: 10px;">Ventas independientes / Horas extra</td>
                      <td><input type="number" class="excel-input excel-income-val" data-cell="B3" value="350000" /></td>
                    </tr>
                    <tr style="background: #f0fdf4; border-top: 2px solid #86efac;">
                      <td class="row-num">4</td>
                      <td style="font-weight: 700; padding-left: 10px; color: #166534;">TOTAL INGRESOS (=SUMA(B2:B3))</td>
                      <td class="excel-result-cell" id="excel-total-income" style="color: #166534;">$1.750.000</td>
                    </tr>
                    <tr style="background: #fef2f2;">
                      <td class="row-num">5</td>
                      <td style="font-weight: 700; color: #991b1b; padding-left: 10px;">🔴 SECCIÓN: GASTOS DEL MES</td>
                      <td style="font-weight: 700; color: #991b1b; text-align: right; padding-right: 10px;">Monto</td>
                    </tr>
                    <tr>
                      <td class="row-num">6</td>
                      <td style="padding-left: 10px;">Arriendo / Vivienda</td>
                      <td><input type="number" class="excel-input excel-expense-val" data-cell="B6" value="550000" /></td>
                    </tr>
                    <tr>
                      <td class="row-num">7</td>
                      <td style="padding-left: 10px;">Alimentación y mercado</td>
                      <td><input type="number" class="excel-input excel-expense-val" data-cell="B7" value="450000" /></td>
                    </tr>
                    <tr>
                      <td class="row-num">8</td>
                      <td style="padding-left: 10px;">Servicios públicos (Agua, Luz, Gas)</td>
                      <td><input type="number" class="excel-input excel-expense-val" data-cell="B8" value="180000" /></td>
                    </tr>
                    <tr>
                      <td class="row-num">9</td>
                      <td style="padding-left: 10px;">Transporte y pasajes</td>
                      <td><input type="number" class="excel-input excel-expense-val" data-cell="B9" value="120000" /></td>
                    </tr>
                    <tr style="background: #fff1f2; border-top: 2px solid #fca5a5;">
                      <td class="row-num">10</td>
                      <td style="font-weight: 700; padding-left: 10px; color: #991b1b;">TOTAL GASTOS (=SUMA(B6:B9))</td>
                      <td class="excel-result-cell" id="excel-total-expense" style="color: #991b1b;">$1.300.000</td>
                    </tr>
                    <tr style="background: #f8fafc; border-top: 3px double #334155;">
                      <td class="row-num">11</td>
                      <td style="font-weight: 800; font-size: 0.95rem; padding-left: 10px; color: var(--text-primary);">
                        💰 SALDO DISPONIBLE (=Total_Ingresos - Total_Gastos)
                      </td>
                      <td class="excel-result-cell" id="excel-net-balance" style="font-size: 1.05rem; font-weight: 800; color: #1e3a29;">$450.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
        } else if (s.number === 4) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">🛡️ Práctica en Aula: Detector Interactivo de Phishing y Enlaces Sospechosos</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 18px;">
                Analiza cada situación real con los aprendices y selecciona si es un <strong>Mensaje Seguro</strong> o un <strong>Intento de Fraude</strong>:
              </p>
              
              <div class="phishing-card is-fraud" data-fraud="true" data-explain="Es FRAUDE. Ninguna empresa de mensajería cobra tarifas por enlaces no oficiales tipo bit.ly o dominios raros (.cc). Buscan robar datos de tarjetas.">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="font-size: 0.88rem; color: #dc2626;">Caso 1: Mensaje de Texto (SMS) Desconocido</strong>
                  <span class="badge" style="background: #fee2e2; color: #991b1b; font-size: 0.72rem;">SMS Entrante</span>
                </div>
                <div class="phishing-msg-preview">
                  "ENTREGA: Su paquete #39281 presenta un retraso por dirección incompleta. Actualice sus datos y pague $3.500 para entrega hoy en: http://envios-servientrega-rastreo.cc/pago"
                </div>
                <div class="phishing-actions">
                  <button type="button" class="btn btn-secondary btn-phishing-check" data-choice="safe" style="padding: 6px 14px; font-size: 0.8rem;">
                    ✅ Es Mensaje Seguro
                  </button>
                  <button type="button" class="btn btn-primary btn-phishing-check" data-choice="fraud" style="padding: 6px 14px; font-size: 0.8rem; background: #dc2626; border-color: #dc2626;">
                    🚨 Es Fraude / Estafa
                  </button>
                </div>
                <div class="phishing-feedback"></div>
              </div>

              <div class="phishing-card is-safe" data-fraud="false" data-explain="Es SEGURO. No contiene enlaces sospechosos, no solicita claves y te invita a ingresar de manera autónoma por el sitio web institucional oficial.">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="font-size: 0.88rem; color: #16a34a;">Caso 2: Correo Institucional del SENA</strong>
                  <span class="badge badge-green" style="font-size: 0.72rem;">Correo Oficial</span>
                </div>
                <div class="phishing-msg-preview">
                  "Apreciado aprendiz: Le recordamos que sus calificaciones del curso de Alfabetización Informática están disponibles. Por favor ingrese directamente a zajuna.sena.edu.co con su usuario y contraseña."
                </div>
                <div class="phishing-actions">
                  <button type="button" class="btn btn-primary btn-phishing-check" data-choice="safe" style="padding: 6px 14px; font-size: 0.8rem;">
                    ✅ Es Mensaje Seguro
                  </button>
                  <button type="button" class="btn btn-secondary btn-phishing-check" data-choice="fraud" style="padding: 6px 14px; font-size: 0.8rem; background: #dc2626; border-color: #dc2626;">
                    🚨 Es Fraude / Estafa
                  </button>
                </div>
                <div class="phishing-feedback"></div>
              </div>
            </div>
          `;
        } else if (s.number === 5) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">🤖 Asistente de IA Educativa y Prompts en Vivo</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
                Prueba instrucciones guiadas para resolver casos cotidianos como la organización de una habitación o la comunicación empática.
              </p>
              <div class="ai-presets-row" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
                <button class="preset-chip ai-preset-chip active" data-preset="pieza" type="button">🧹 Caso: Foto de la Pieza</button>
                <button class="preset-chip ai-preset-chip" data-preset="mendigo" type="button">❤️ Caso: Cartel Empático</button>
                <button class="preset-chip ai-preset-chip" data-preset="correo_ai" type="button">✉️ Caso: Correo con Permiso</button>
              </div>
              <div class="ai-chat-box">
                <div id="ai-chat-thread" class="ai-chat-thread">
                  <div class="ai-bubble assistant">
                    <span class="ai-bubble-badge">🤖 Asistente de IA Educativa</span>
                    <div>¡Hola Aprendiz! Selecciona un caso arriba o escribe tu propia instrucción (Prompt) para interactuar con la IA.</div>
                  </div>
                </div>
                <div class="ai-input-bar">
                  <input type="text" id="ai-prompt-input" placeholder="Escribe tu instrucción o pregunta para la IA..." value="Tengo una habitación de 3x3 metros desordenada con ropa en la cama y papeles en la mesa. ¿Puedes darme un plan en 4 pasos para organizarla en 30 minutos?" />
                  <button id="btn-send-ai" class="btn btn-primary" type="button">Enviar Prompt</button>
                </div>
              </div>
            </div>
          `;
        }
      }

      return `
        <div class="session-view-panel ${index === 0 ? 'active' : ''}" id="${s.id}">
          <div class="session-card" style="margin-bottom: 0;">
            <div class="session-header">
              <div style="display: flex; gap: 16px; align-items: center;">
                <div class="session-number">${s.number < 10 ? '0' + s.number : s.number}</div>
                <div>
                  <h2>${s.title}</h2>
                  <div class="session-ra">
                    <strong>RAP / Competencia:</strong> ${s.rapCode || 'Formación Técnica'}
                  </div>
                </div>
              </div>
              <span class="badge badge-green" style="font-size: 0.9rem; padding: 8px 16px;">⏱️ ${s.hours}</span>
            </div>

            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">
              ${s.summary}
            </p>

            <div class="didactic-grid">
              <!-- COLUMNA 1: TEMAS DE LA SESIÓN -->
              <div>
                <h3 style="font-size: 1.15rem; margin-bottom: 14px; color: var(--sena-green-dark);">
                  📖 Guía de Taller Práctico y Temas:
                </h3>
                ${topicsList}
              </div>

              <!-- COLUMNA 2: MATERIALES Y ACTIVIDAD -->
              <div>
                <div class="session-materials-card">
                  <div class="session-materials-header">
                    <h4>📁 Materiales de Apoyo y Recursos</h4>
                    <span class="badge badge-outline">${materials.length} Archivos</span>
                  </div>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 14px;">
                    Material pedagógico para descargar o consultar durante el desarrollo de la sesión.
                  </p>
                  ${materialsHtml}

                  <div class="material-upload-hint">
                    <span>💡</span>
                    <div>
                      <strong>Subir más materiales:</strong> Coloca tus archivos en 
                      <code>${course.materialsFolder}${s.id}/</code> y se activarán aquí automáticamente.
                    </div>
                  </div>
                </div>

                <div class="activity-card" style="margin-top: 20px;">
                  <div class="activity-badge">🎯 Evidencia y Taller a Entregar</div>
                  <h4 style="margin-bottom: 8px; color: var(--text-primary); font-size: 1.05rem;">Resultado de la Sesión:</h4>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                    ${s.activity}
                  </p>
                </div>
              </div>
            </div>

            <!-- COMPONENTE INTERACTIVO / SIMULADOR SI APLICA -->
            ${interactiveComponentHtml}
          </div>
        </div>
      `;
    }).join('');

    // Panel de Transferencia / Proyecto Integrador
    if (course.transferProject) {
      panelsHtml += `
        <div class="session-view-panel" id="sesion-transferencia">
          <div class="session-card" style="margin-bottom: 0;">
            <div class="session-header">
              <div style="display: flex; gap: 16px; align-items: center;">
                <div class="session-number" style="background: #E65100;">🏆</div>
                <div>
                  <h2>${course.transferProject.title}</h2>
                  <div class="session-ra">
                    <strong>Producto Integrador Final</strong> · Transferencia de Aprendizaje
                  </div>
                </div>
              </div>
              <span class="badge" style="background: #E65100; color: #fff; font-size: 0.9rem; padding: 8px 16px;">
                ⏱️ ${course.transferProject.hours}
              </span>
            </div>

            <div style="background: var(--green-soft); border: 1px solid var(--green-muted); border-radius: var(--radius-sm); padding: 24px; margin-bottom: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 10px;">Objetivo del Proyecto:</h3>
              <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.7;">
                ${course.transferProject.description}
              </p>
            </div>

            <div class="activity-card">
              <div class="activity-badge" style="background: #E65100;">📋 Evidencia Final Requerida</div>
              <h4 style="margin-bottom: 8px; font-size: 1.05rem;">Sustentación y Calificación:</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                ${course.transferProject.evidence}
              </p>
            </div>
          </div>
        </div>
      `;
    }

    panelsContainer.innerHTML = panelsHtml;

    // Reactivar eventos de las pestañas
    const tabButtons = tabsContainer.querySelectorAll('.session-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const allPanels = panelsContainer.querySelectorAll('.session-view-panel');
        allPanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }
});
