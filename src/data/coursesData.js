/**
 * Single Responsibility Principle (SRP):
 * Dedicated module containing the static domain catalog of SENA courses and sessions.
 * Each session declares its `simulatorKey` so the UI remains Open for Extension
 * and Closed for Modification (OCP) via the SimulatorRegistry.
 */

export const COURSES_DATA = [
  {
    id: 'alfabetizacion-digital',
    title: 'Alfabetización Informática',
    code: '22810239 – Versión 1',
    competence:
      '220501046 – Aplicar herramientas ofimáticas, redes sociales y colaborativas de acuerdo con el proyecto a desarrollar.',
    category: 'Ofimática & TIC Básica',
    duration: '70 Horas Totales',
    hoursNumber: 70,
    sessionsCount: 5,
    status: 'Activo',
    badgeText: 'En Formación · 70h',
    badgeType: 'badge-green',
    icon: '💻',
    coverGradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
    description:
      'Curso fundamental estructurado en 5 sesiones prácticas con materiales oficiales del SENA: reconocimiento del dispositivo y gestión de memoria RAM/almacenamiento, productividad en la nube con Google Docs y correo Gmail, hojas de cálculo para finanzas personales con fórmulas automáticas, navegación segura con prevención de fraudes y dominio de Inteligencia Artificial mediante prompts estructurados (Meta AI, ChatGPT).',
    raps: [
      { code: '2205010460201', text: 'Manejar las funcionalidades básicas de un sistema operativo.' },
      { code: '2205010460202', text: 'Aplicar las funciones de un procesador de texto.' },
      { code: '2205010460203', text: 'Aplicar las funciones de una hoja de cálculo.' },
      { code: '2205010460204', text: 'Aplicar las funciones de un programa de presentaciones.' },
      { code: '2205010460101', text: 'Utilizar los servicios de Internet de acuerdo con las necesidades.' }
    ],
    sessions: [
      {
        id: 'sesion-1',
        number: 1,
        title: 'Conozco mi Dispositivo y el Sistema Operativo (RAM, Almacenamiento y Nube)',
        hours: '10 Horas',
        icon: '📱',
        rapCode: '2205010460201',
        simulatorKey: 'mobile-os',
        summary:
          'Comprender qué es un dispositivo tecnológico y el Sistema Operativo (iOS y Android, analogía de la casa). Ajustes básicos (Wi-Fi, brillo, sonido, bloqueo y accesibilidad). Diferencia crucial entre Memoria RAM (la mesa de trabajo) y Almacenamiento Interno (el armario/bodega), causas del celular lento y solución práctica liberando espacio con Google Fotos.',
        topics: [
          '¿Qué es un dispositivo? (Persona con necesidad ➔ Herramienta ➔ Solución)',
          'El Sistema Operativo: origen de iOS (2007) y Android (2008) y analogía de la casa',
          'Configuraciones básicas: Wi-Fi, sonido, brillo, bloqueo PIN/patrón y accesibilidad',
          'Memoria RAM (mesa de trabajo temporal) vs Almacenamiento Interno (armario permanente)',
          '¿Por qué se pone lento el teléfono? (Archivos temporales, saturación de RAM y asfixia del SO)',
          'Solución de almacenamiento: Copia de seguridad automática en Google Fotos y liberación de espacio en memoria'
        ],
        materials: [
          {
            materialId: 'alfabetizacion-s1-taller-dispositivo',
            name: 'Guía Completa: Dispositivo, Sistema Operativo y Google Fotos',
            type: 'pdf',
            available: true
          },
          {
            materialId: 'alfabetizacion-s1-unir-con-lineas',
            name: 'Hoja de Trabajo: Actividad Práctica Unir con Líneas (8 Iconos)',
            type: 'document',
            available: true
          }
        ],
        activity:
          'Ajustes esenciales configurados, verificación de memoria RAM/Almacenamiento en el dispositivo y resolución del taller de unir conceptos con líneas.',
        interactiveTool: 'Simulador de Smartphone, Alarma y Gestor de Recursos'
      },
      {
        id: 'sesion-2',
        number: 2,
        title: 'Productividad Digital con Google Docs y Gmail',
        hours: '11 Horas',
        icon: '✉️',
        rapCode: '2205010460202',
        simulatorKey: 'email-builder',
        summary:
          'Creación de documentos en la nube con Google Docs (guardado automático por segundo, acceso en cualquier equipo y trabajo colaborativo simultáneo). Comunicación formal con Gmail: dominar los 4 pasos de redacción, las 3 partes clave (Para, Asunto y Mensaje), cómo adjuntar archivos desde el celular o Drive y la regla de los 3 puntos antes de enviar.',
        topics: [
          'Ventajas de Google Docs: Guardado automático en la nube, multidispositivo y trabajo en equipo',
          'Creación paso a paso de documentos en Drive con formato, alineación y tablas',
          'Permisos de privacidad: Lector, Comentador y Editor. Exportar en PDF y Word (.docx)',
          'Gmail: Pasos para redactar correo formal, uso de CC y CCO',
          'Las 3 partes clave de un correo: Destinatario, Asunto específico y Mensaje estructurado',
          'Cómo adjuntar archivos correctamente (icono del clip 📎) y los 3 puntos de verificación antes de enviar'
        ],
        materials: [
          {
            materialId: 'alfabetizacion-s2-guia-docs-gmail',
            name: 'Guía Práctica: Productividad con Google Docs y Gmail',
            type: 'pdf',
            available: true
          }
        ],
        activity:
          'Documento creado y compartido en Google Docs, más correo formal enviado con las 3 partes completas y archivo adjunto.',
        interactiveTool: 'Constructor y Previsualizador en Vivo de Correo Formal'
      },
      {
        id: 'sesion-3',
        number: 3,
        title: 'Hoja de Cálculo para Finanzas Personales (Presupuesto y Fórmulas)',
        hours: '14 Horas',
        icon: '📊',
        rapCode: '2205010460203',
        simulatorKey: 'excel-budget',
        summary:
          '¿Qué es una hoja de cálculo? Conceptos clave: Columna (letras), Fila (números) y Celda (ej: B2). Regla de oro de las fórmulas (comenzar con =). Recreación del modelo de presupuesto de gastos adicionales: cálculo automático del total de gastos con =SUMA(B2:B6) y cálculo de saldo disponible con resta =F2-F3.',
        topics: [
          'Definición y ventajas de la hoja de cálculo (automatización y recálculo instantáneo)',
          'Conceptos indispensables: Columnas (verticales), Filas (horizontales) y Celdas (intersección)',
          'Regla de Oro: Toda fórmula debe comenzar con el signo igual (=)',
          'Operaciones básicas: =A1+B1, =A1-B1, =SUMA(B1:B10) y =A1*B1',
          'Ejercicio guiado: Hoja 1 - Presupuesto de Gastos Adicionales (Efectivo, Servicios, Banco, etc.)',
          'Fórmula de suma total de gastos en celda B7 y resta de saldo disponible en celda F4',
          'Reto de fórmulas aplicadas y autoevaluación de la sesión'
        ],
        materials: [
          {
            materialId: 'alfabetizacion-s3-taller-finanzas',
            name: 'Taller Práctico Oficial: Hoja de Cálculo para Finanzas Personales',
            type: 'sheet',
            available: true
          }
        ],
        activity:
          'Tabla de presupuesto personal recreada con fórmulas automáticas de SUMA (=SUMA(B2:B6)) y Saldo Disponible (=F2-F3) funcionando al 100%.',
        interactiveTool: 'Simulador Dinámico de Presupuesto en Excel (Modelo Oficial SENA)'
      },
      {
        id: 'sesion-4',
        number: 4,
        title: 'Navegación Segura en Internet y Prevención de Fraudes',
        hours: '10 Horas',
        icon: '🌐',
        rapCode: '2205010460101',
        simulatorKey: 'phishing-detector',
        summary:
          'Diferencia entre Navegador (el vehículo) y Buscador (el índice). La barra de direcciones y la identificación de páginas oficiales (.gov.co, .edu.co). El Protocolo del Semáforo de Pausa (Verde: avanzar, Amarillo: revisar, Rojo: detenerse). Alertas ante estafas de urgencia, archivos adjuntos maliciosos, instaladores APK por WhatsApp y suplantación de voz con IA.',
        topics: [
          'Navegador (Chrome, Edge, Firefox, Safari) vs Buscador (Google, Bing)',
          'La barra de direcciones (URL): verificación de dominios oficiales y candado HTTPS',
          'Búsqueda recomendada: Entidad + Ciudad + Trámite + "sitio oficial"',
          'Protocolo de Pausa (El Semáforo de Seguridad: Verde, Amarillo y Rojo)',
          'Señales de fraude: Precio bajo + Urgencia, Malware en citaciones judiciales falsas y APKs sospechosos',
          'Suplantación de voz con IA y llamadas falsas: protocolo de 4 pasos para reaccionar',
          'Regla de oro: "Si me apuran o me piden datos, paro y verifico"'
        ],
        materials: [
          {
            materialId: 'alfabetizacion-s4-guia-navegacion-segura',
            name: 'Guía y Protocolo de Ciberseguridad: Navegación Segura y Prevención de Fraudes',
            type: 'pdf',
            available: true
          }
        ],
        activity:
          'Búsqueda validada con fórmula de sitio oficial y resolución del taller interactivo de detección de fraudes y llamadas sospechosas.',
        interactiveTool: 'Detector Interactivo de Phishing, Semáforo y Enlaces Falsos'
      },
      {
        id: 'sesion-5',
        number: 5,
        title: 'Aprendiendo a Utilizar la Inteligencia Artificial (Meta AI y Prompts)',
        hours: '11 Horas',
        icon: '🤖',
        rapCode: 'Transversal',
        simulatorKey: 'ai-prompt-lab',
        summary:
          '¿Qué es la IA? Uso de Meta AI en WhatsApp, ChatGPT y Gemini. Cinco límites clave: sesgos, alucinaciones, información desactualizada, protección de datos sensibles y verificación. Estructura de un buen Prompt con 4 pilares: ROL + CONTEXTO + TAREA + FORMATO. Desarrollo de los 3 retos prácticos: transformación de imágenes (silla/Cristiano Ronaldo), primeros auxilios (convulsión) y planificación de un safari en África.',
        topics: [
          '¿Qué es la Inteligencia Artificial? Herramientas conocidas: Meta AI en WhatsApp y asistentes conversacionales',
          '5 aspectos indispensables: Sesgos, Alucinaciones, Información vieja, Datos sensibles y Verificación',
          'Cómo pedir bien: Los 4 pilares de un Prompt efectivo (ROL, CONTEXTO, TAREA, FORMATO)',
          'De prompt básico ("Explícame las ecuaciones") a prompt mejorado estructurado',
          'Actividad Práctica 1: Transformación de fotos con instrucciones (la silla vacía, persona sentada y Cristiano Ronaldo)',
          'Actividad Práctica 2: Asistente de primeros auxilios ante caso de emergencia por convulsión',
          'Actividad Práctica 3: Asesor de viajes para diseño de itinerario y presupuesto de safari en África saliendo de Medellín',
          'Cierre reflexivo: "La IA es una herramienta, el criterio es tuyo"'
        ],
        materials: [
          {
            materialId: 'alfabetizacion-s5-guia-ia-prompts',
            name: 'Guía y Taller de Inteligencia Artificial: Meta AI y Estructura de Prompts',
            type: 'pdf',
            available: true
          }
        ],
        activity:
          'Registro de interacciones con Meta AI aplicando los 4 pilares del prompt en el reto de imágenes, primeros auxilios o itinerario de viaje.',
        interactiveTool: 'Laboratorio de IA Educativa con los 4 Pilares y Casos Reales SENA'
      }
    ],
    transferProject: {
      title: 'Mi Solución Digital Práctica',
      hours: '8 Horas',
      description:
        'Integración aplicada de todas las herramientas: el aprendiz resuelve un problema real de su entorno usando dispositivo seguro, documento formal en Google Docs, correo con evidencia en Gmail, presupuesto en hoja de cálculo y asistencia con Inteligencia Artificial.',
      evidence: 'Presentación final y rúbrica de evaluación integradora.'
    }
  },
  {
    id: 'herramientas-ofimaticas',
    title: 'Herramientas Ofimáticas Intermedias',
    code: 'Por Asignar · SENA',
    competence: 'Aplicación de herramientas informáticas en procesos organizacionales.',
    category: 'Ofimática Avanzada',
    duration: '48 Horas Totales',
    hoursNumber: 48,
    sessionsCount: 4,
    status: 'Preparación',
    badgeText: 'Próximo Curso · Por subir material',
    badgeType: 'badge-outline',
    icon: '📊',
    coverGradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)',
    description:
      'Curso complementario orientado al manejo intermedio de procesadores de texto, hojas de cálculo con gráficos dinámicos y presentaciones corporativas de alto impacto.',
    raps: [
      {
        code: 'RAP-01',
        text: 'Elaborar documentos corporativos aplicando normas de estilo y combinación de correspondencia.'
      },
      {
        code: 'RAP-02',
        text: 'Diseñar modelos de datos en hojas de cálculo con tablas dinámicas y validación.'
      }
    ],
    sessions: [
      {
        id: 'sesion-1',
        number: 1,
        title: 'Word Avanzado: Estilos, Tablas de Contenido y Correspondencia',
        hours: '12 Horas',
        icon: '📄',
        rapCode: 'RAP-01',
        summary:
          'Dominio de estilos, saltos de sección, numeración diferenciada y combinación de correspondencia masiva.',
        topics: ['Estilos jerárquicos', 'Tablas de contenido automáticas', 'Combinación con bases de datos'],
        materials: [],
        activity: 'Documento corporativo estructurado con plantilla institucional.',
        interactiveTool: 'Próximamente'
      },
      {
        id: 'sesion-2',
        number: 2,
        title: 'Excel Intermedio: Funciones Condicionales y Tablas Dinámicas',
        hours: '12 Horas',
        icon: '📈',
        rapCode: 'RAP-02',
        summary:
          'Uso de funciones SI, BUSCARV/BUSCARX, filtros avanzados y resumen de grandes volúmenes con Tablas Dinámicas.',
        topics: ['Funciones lógicas (SI, Y, O)', 'Búsqueda y referencia', 'Tablas y Gráficos Dinámicos'],
        materials: [],
        activity: 'Dashboard analítico con tabla y segmentación de datos.',
        interactiveTool: 'Próximamente'
      }
    ],
    transferProject: {
      title: 'Sistema de Gestión Documental y Analítica',
      hours: '8 Horas',
      description: 'Creación de un paquete de documentos y reporte financiero integrado para una pyme.',
      evidence: 'Entrega de portafolio digital.'
    }
  },
  {
    id: 'ia-productividad',
    title: 'Inteligencia Artificial para la Productividad',
    code: 'Innovación TIC · SENA',
    competence: 'Implementar herramientas de IA generativa en la automatización y gestión de tareas.',
    category: 'Innovación & Tecnología',
    duration: '40 Horas Totales',
    hoursNumber: 40,
    sessionsCount: 4,
    status: 'Preparación',
    badgeText: 'Próximo Curso · Por subir material',
    badgeType: 'badge-outline',
    icon: '⚡',
    coverGradient: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #7b1fa2 100%)',
    description:
      'Aprende a integrar ChatGPT, Claude, Copilot y Meta AI para optimizar tiempos, redacción de informes y resolución de problemas cotidianos.',
    raps: [
      { code: 'RAP-01', text: 'Diseñar secuencias de prompts avanzados aplicados al entorno laboral.' },
      {
        code: 'RAP-02',
        text: 'Aplicar criterios de verificación, ética y seguridad de la información con IA.'
      }
    ],
    sessions: [
      {
        id: 'sesion-1',
        number: 1,
        title: 'Ingeniería de Prompts y Pensamiento Estructurado',
        hours: '10 Horas',
        icon: '🧠',
        rapCode: 'RAP-01',
        summary:
          'Métodos para dialogar con modelos de lenguaje, parámetros de control y creación de asistentes personalizados.',
        topics: ['Fundamentos de LLMs', 'Técnicas Few-shot y Chain of Thought', 'Asistentes a medida'],
        materials: [],
        activity: 'Banco de prompts estructurados para el área de desempeño.',
        interactiveTool: 'Próximamente'
      }
    ],
    transferProject: {
      title: 'Asistente de Productividad Personal',
      hours: '6 Horas',
      description: 'Automatización de un flujo de trabajo diario mediante prompts y plantillas de IA.',
      evidence: 'Video o reporte de sustentación práctica.'
    }
  }
];
