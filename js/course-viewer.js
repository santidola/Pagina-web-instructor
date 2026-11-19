/**
 * ============================================================
 * CONTROLADOR DINÁMICO DE CURSO (CURSO.HTML)
 * ============================================================
 * Carga los datos del curso desde COURSES_DATA usando el parámetro URL ?id=
 * y construye las pestañas, sesiones, materiales y herramientas interactivas
 * con fidelidad a las guías oficiales y presentaciones del SENA.
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
        <span>${s.icon || '📌'} Sesión ${s.number}: ${s.title.split('(')[0].trim()}</span>
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
                      <a href="${m.path}" class="material-action-btn material-btn-available" target="_blank">
                        Ver / Imprimir ➔
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
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">📱 Laboratorio en Vivo: Dispositivo Móvil, RAM vs Almacenamiento y Ajustes</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
                Familiarízate con las partes del smartphone, programa tu alarma de clase y comprende la analogía clave de la memoria:
              </p>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div style="border: 2px solid #39A900; background: #f0fdf4; padding: 18px; border-radius: 10px;">
                  <h4 style="color: #166534; margin-bottom: 6px;">🧠 Memoria RAM: "La Mesa de Trabajo"</h4>
                  <p style="font-size: 0.85rem; color: #374151;">Memoria temporal y rápida. Sostiene las aplicaciones que tienes abiertas en este instante. Al reiniciar el teléfono, se limpia sola.</p>
                </div>
                <div style="border: 2px solid #f59e0b; background: #fffbeb; padding: 18px; border-radius: 10px;">
                  <h4 style="color: #92400e; margin-bottom: 6px;">📦 Almacenamiento: "El Armario o Bodega"</h4>
                  <p style="font-size: 0.85rem; color: #374151;">Memoria permanente. Guarda tus fotos, videos y audios de WhatsApp. Si se llena, el celular se congela y no puede trabajar.</p>
                </div>
              </div>

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
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">✉️ Constructor y Previsualizador de Correo Formal en Gmail</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
                Aprende a redactar con las <strong>3 partes clave</strong> (Para, Asunto y Mensaje) y verifica la regla de los 3 puntos antes de enviar:
              </p>

              <div class="email-builder-grid">
                <div class="email-builder-form">
                  <div class="form-group">
                    <label class="form-label">1. Para: (Destinatario exacto)</label>
                    <input type="email" id="email-to" class="form-input" placeholder="ejemplo.instructor@sena.edu.co" value="instructor.sena@correo.edu.co" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">2. Asunto: (Tema breve y específico)</label>
                    <input type="text" id="email-subject" class="form-input" placeholder="Ej: Entrega Taller 01 - Ficha 22810239" value="Entrega Taller 01 - Ficha 22810239" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">3. Mensaje (Saludo cordial):</label>
                    <input type="text" id="email-greeting" class="form-input" value="Apreciado/a Instructor/a y Equipo Académico:" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Cuerpo / Información Clara:</label>
                    <textarea id="email-body" class="form-input" rows="3">Por medio del presente correo hago entrega formal del documento de texto elaborado en Google Docs y adjunto el archivo solicitado.</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Despedida y Firma:</label>
                    <input type="text" id="email-farewell" class="form-input" value="Agradezco su atención y quedo atento/a a sus comentarios." />
                    <input type="text" id="email-signature" class="form-input" style="margin-top: 6px;" value="Nombre del Aprendiz · Ficha SENA 22810239" />
                  </div>
                </div>

                <div class="email-preview-box">
                  <div class="email-preview-header">Vista Previa en Gmail</div>
                  <div class="email-preview-body">
                    <div style="font-size: 0.85rem; margin-bottom: 6px;"><strong>Para:</strong> <span id="preview-email-to">instructor.sena@correo.edu.co</span></div>
                    <div style="font-size: 0.85rem; margin-bottom: 12px;"><strong>Asunto:</strong> <span id="preview-email-subject">Entrega Taller 01 - Ficha 22810239</span></div>
                    <hr style="border: 0; border-top: 1px solid var(--border-light); margin-bottom: 14px;" />
                    <p id="preview-email-greeting" style="font-weight: 600; margin-bottom: 8px;">Apreciado/a Instructor/a y Equipo Académico:</p>
                    <p id="preview-email-body" style="white-space: pre-wrap; font-size: 0.88rem; line-height: 1.6; margin-bottom: 14px;">Por medio del presente correo hago entrega formal...</p>
                    <div style="background: #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 14px;">
                      <span>📎</span>
                      <strong>Mi_Primer_Documento_GoogleDocs.pdf (18 KB)</strong>
                    </div>
                    <p id="preview-email-farewell" style="font-size: 0.88rem; margin-bottom: 8px;">Agradezco su atención y quedo atento/a a sus comentarios.</p>
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
                  📊 Modelo Oficial SENA: Hoja1 - Presupuesto de Gastos Adicionales
                </h3>
                <span id="excel-balance-badge" class="badge badge-green">🟢 Saldo Disponible Calculado</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 14px;">
                Recreación del ejercicio oficial del taller. Modifica cualquier gasto (¡prueba cambiando el <strong>Gym a $45.000</strong>!) y observa cómo la fórmula <code>=SUMA(B2:B6)</code> y el Saldo <code>=F2-F3</code> se recalculan en vivo:
              </p>

              <div class="excel-sim">
                <div class="excel-header-bar">
                  <span>📗 Hoja1 — Presupuesto de Gastos Adicionales (SENA Finanzas Personales)</span>
                  <span>=SUMA(B2:B6) y =F2-F3</span>
                </div>
                <div class="excel-formula-bar">
                  <span class="excel-fx-icon">fx</span>
                  <span id="excel-formula-preview">=F2 - B7 [Sueldo Recibido - Total Gastos]</span>
                </div>
                <table class="excel-grid">
                  <thead>
                    <tr>
                      <th class="row-num">#</th>
                      <th style="width: 32%;">Columna A (Concepto Gasto)</th>
                      <th style="width: 20%; text-align: right;">Columna B (Monto $)</th>
                      <th style="width: 28%;">Columna E (Rubro)</th>
                      <th style="width: 20%; text-align: right;">Columna F (Total $)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="background: #f1f5f9; font-weight: 700;">
                      <td class="row-num">1</td>
                      <td style="color: #047857; font-weight: 800;">Gastos Adicionales</td>
                      <td style="text-align: right;">(Fórmula)</td>
                      <td style="color: #1e3a8a; font-weight: 800;">Pago 31 de diciembre</td>
                      <td style="text-align: right; color: #1e3a8a;">Total</td>
                    </tr>
                    <tr>
                      <td class="row-num">2</td>
                      <td>Efectivo</td>
                      <td><input type="number" class="excel-input sena-expense-input" data-cell="B2" value="120000" /></td>
                      <td style="font-weight: 700;">Sueldo Recibido (F2)</td>
                      <td><input type="number" id="sena-salary-input" class="excel-input" data-cell="F2" value="500000" style="text-align: right; font-weight: 700; color: #15803d;" /></td>
                    </tr>
                    <tr>
                      <td class="row-num">3</td>
                      <td>Servicios casa</td>
                      <td><input type="number" class="excel-input sena-expense-input" data-cell="B3" value="85000" /></td>
                      <td style="font-weight: 700; color: #b91c1c;">(-) Total Gastos (F3 = B7)</td>
                      <td class="excel-result-cell" id="sena-total-gastos-f3" style="color: #b91c1c; font-weight: 700;">$ 325.000</td>
                    </tr>
                    <tr>
                      <td class="row-num">4</td>
                      <td>Cuota banco agosto</td>
                      <td><input type="number" class="excel-input sena-expense-input" data-cell="B4" value="90000" /></td>
                      <td style="background: #fef08a; font-weight: 800; color: #854d0e;">💰 Saldo Disponible (F4 = F2-F3)</td>
                      <td class="excel-result-cell" id="sena-saldo-f4" style="background: #fef08a; font-weight: 800; color: #166534; font-size: 1.05rem;">$ 175.000</td>
                    </tr>
                    <tr>
                      <td class="row-num">5</td>
                      <td>Seguridad social</td>
                      <td><input type="number" class="excel-input sena-expense-input" data-cell="B5" value="30000" /></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td class="row-num">6</td>
                      <td>Gym (¡Prueba cambiarlo!)</td>
                      <td><input type="number" class="excel-input sena-expense-input" data-cell="B6" value="0" /></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr style="background: #ecfdf5; border-top: 2px solid #86efac;">
                      <td class="row-num">7</td>
                      <td style="font-weight: 800; color: #166534;">TOTAL GASTOS (=SUMA(B2:B6))</td>
                      <td class="excel-result-cell" id="sena-total-gastos-b7" style="color: #166534; font-weight: 800;">$ 325.000</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
        } else if (s.number === 4) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">🛡️ Ciberseguridad: Semáforo de Pausa y Detector de Fraudes</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
                Aplica la regla de oro: <em>«Si me apuran o me piden datos, paro y verifico»</em>. Analiza los casos y decide:
              </p>

              <!-- EL SEMÁFORO DE PAUSA -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px;">
                <div style="background: #f0fdf4; border: 2px solid #16a34a; padding: 14px; border-radius: 8px;">
                  <strong style="color: #166534;">🟢 VERDE · Avanzar</strong>
                  <div style="font-size: 0.82rem; color: #374151; margin-top: 4px;">Portal oficial verificado (.gov.co, .edu.co), navegación tranquila y sin presiones.</div>
                </div>
                <div style="background: #fffbeb; border: 2px solid #f59e0b; padding: 14px; border-radius: 8px;">
                  <strong style="color: #92400e;">🟡 AMARILLO · Revisar</strong>
                  <div style="font-size: 0.82rem; color: #374151; margin-top: 4px;">Pide datos personales, números de tarjeta o claves bancarias para continuar.</div>
                </div>
                <div style="background: #fef2f2; border: 2px solid #dc2626; padding: 14px; border-radius: 8px;">
                  <strong style="color: #991b1b;">🔴 ROJO · Detenerse</strong>
                  <div style="font-size: 0.82rem; color: #374151; margin-top: 4px;">Urgencia desmedida, amenazas de bloqueo, APKs o petición inmediata de dinero.</div>
                </div>
              </div>
              
              <!-- CASOS INTERACTIVOS -->
              <div class="phishing-cases-grid">
                <div class="phishing-card is-fraud" data-fraud="true" data-explain="Es FRAUDE. El enlace http://envios-servientrega-rastreo.cc/pago usa dominio desconocido (.cc) y busca clonar tu tarjeta bancaria.">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="font-size: 0.88rem; color: #dc2626;">Caso 1: SMS de Entrega de Paquete</strong>
                    <span class="badge" style="background: #fee2e2; color: #991b1b; font-size: 0.72rem;">SMS Sospechoso</span>
                  </div>
                  <div class="phishing-msg-preview">
                    "ENTREGA: Su paquete #39281 presenta retraso por dirección incompleta. Actualice sus datos y pague $3.500 para entrega hoy en: http://envios-servientrega-rastreo.cc/pago"
                  </div>
                  <div class="phishing-actions">
                    <button type="button" class="btn btn-secondary btn-phishing-check" data-choice="safe" style="padding: 6px 14px; font-size: 0.8rem;">
                      ✅ Es Seguro
                    </button>
                    <button type="button" class="btn btn-primary btn-phishing-check" data-choice="fraud" style="padding: 6px 14px; font-size: 0.8rem; background: #dc2626; border-color: #dc2626;">
                      🚨 Es Fraude / Estafa
                    </button>
                  </div>
                  <div class="phishing-feedback"></div>
                </div>

                <div class="phishing-card is-fraud" data-fraud="true" data-explain="Es FRAUDE. Ninguna citación judicial de Fiscalía o juzgado llega con un archivo adjunto protegido con clave ni enlaces automáticos de descarga. Trae Malware.">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="font-size: 0.88rem; color: #dc2626;">Caso 2: Notificación Judicial con Adjunto</strong>
                    <span class="badge" style="background: #fee2e2; color: #991b1b; font-size: 0.72rem;">Correo Malicioso</span>
                  </div>
                  <div class="phishing-msg-preview">
                    "JUZGADO MUNICIPAL: Proceso No 17821310-62. Notificación de demanda en su contra. Descargue el archivo adjunto y use la clave 201281 para abrir su citación."
                  </div>
                  <div class="phishing-actions">
                    <button type="button" class="btn btn-secondary btn-phishing-check" data-choice="safe" style="padding: 6px 14px; font-size: 0.8rem;">
                      ✅ Es Seguro
                    </button>
                    <button type="button" class="btn btn-primary btn-phishing-check" data-choice="fraud" style="padding: 6px 14px; font-size: 0.8rem; background: #dc2626; border-color: #dc2626;">
                      🚨 Es Fraude / Estafa
                    </button>
                  </div>
                  <div class="phishing-feedback"></div>
                </div>
              </div>
            </div>
          `;
        } else if (s.number === 5) {
          interactiveComponentHtml = `
            <div class="card card-accent-top" style="margin-top: 24px;">
              <h3 style="color: var(--sena-green-dark); margin-bottom: 8px;">🤖 Laboratorio de Inteligencia Artificial: Los 4 Pilares del Prompt</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
                Domina la estructura clave (<strong>ROL + CONTEXTO + TAREA + FORMATO</strong>) y prueba los 3 retos oficiales de la guía SENA:
              </p>

              <div class="ai-presets-row" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
                <button class="preset-chip ai-preset-chip active" data-preset="silla" type="button">🪑 Reto 1: Foto Silla & Ronaldo</button>
                <button class="preset-chip ai-preset-chip" data-preset="convulsion" type="button">🚑 Reto 2: Primeros Auxilios</button>
                <button class="preset-chip ai-preset-chip" data-preset="safari" type="button">🦁 Reto 3: Safari en África</button>
                <button class="preset-chip ai-preset-chip" data-preset="ecuaciones" type="button">📐 Reto 4: Profesor de Matemáticas</button>
              </div>

              <div class="ai-chat-box">
                <div id="ai-chat-thread" class="ai-chat-thread">
                  <div class="ai-bubble assistant">
                    <span class="ai-bubble-badge">🤖 Meta AI / Asistente SENA</span>
                    <div>¡Hola Aprendiz! Selecciona cualquiera de los retos de clase arriba o escribe tu propia instrucción estructurada para experimentar con la Inteligencia Artificial.</div>
                  </div>
                </div>
                <div class="ai-input-bar">
                  <input type="text" id="ai-prompt-input" placeholder="Escribe tu instrucción o selecciona un reto..." value="Transforma esta foto de la silla vacía. Mantén el fondo y la silla tal como están, pero añade a Cristiano Ronaldo sentado en ella." />
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
                    <h4>📁 Materiales Oficiales de Sesión</h4>
                    <span class="badge badge-green">${materials.length} Disponibles</span>
                  </div>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 14px;">
                    Guías, talleres y diapositivas oficiales listas para ver en pantalla o imprimir:
                  </p>
                  ${materialsHtml}

                  <div class="material-upload-hint">
                    <span>💡</span>
                    <div>
                      <strong>Carpeta local:</strong> <code>${course.materialsFolder}${s.id}/</code>
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

            <!-- COMPONENTE INTERACTIVO / SIMULADOR -->
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
