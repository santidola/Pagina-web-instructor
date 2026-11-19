/**
 * ============================================================
 * BASE DE DATOS DE CURSOS Y SESIONES · SENA
 * ============================================================
 * Este archivo centraliza la información de todos los programas de formación.
 * Para agregar un nuevo curso, simplemente añade un nuevo objeto al arreglo COURSES_DATA.
 */

const COURSES_DATA = [
  {
    id: 'alfabetizacion-digital',
    title: 'Alfabetización Informática',
    code: '22810239 – Versión 1',
    competence: '220501046 – Aplicar herramientas ofimáticas, redes sociales y colaborativas de acuerdo con el proyecto a desarrollar.',
    category: 'Ofimática & TIC Básica',
    duration: '70 Horas Totales',
    hoursNumber: 70,
    sessionsCount: 5,
    status: 'Activo',
    badgeText: 'En Formación · 70h',
    badgeType: 'badge-green',
    icon: '💻',
    coverGradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
    description: 'Curso fundamental para el desarrollo de competencias digitales cotidianas: uso de smartphones y computadores, redacción y envío de correo formal, hojas de cálculo para presupuestos en Excel, navegación segura contra fraudes e introducción práctica a la Inteligencia Artificial.',
    targetUrl: 'programa.html', // Enlace directo a las sesiones actuales o plantilla dinámica
    guideUrl: 'guia.html',
    materialsFolder: 'materiales/alfabetizacion/',
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
        title: 'Sistemas Operativos & Dispositivos Móviles',
        hours: '10 Horas',
        icon: '📱',
        rapCode: '2205010460201',
        summary: 'Familiarización con smartphone/tablet y PC, qué es una app, ajustes esenciales (brillo, Wi-Fi, sonido), tareas cotidianas (poner alarma, contactos) y seguridad básica (bloqueo PIN/patrón).',
        topics: [
          'Encendido, reinicio y navegación en smartphone y computador',
          '¿Qué es una App y cómo instalar/desinstalar responsablemente?',
          'Configuración de Wi-Fi, volumen, brillo y modo no molestar',
          'Programación de alarmas y gestión de contactos',
          'Medidas de seguridad: PIN, patrón y huella'
        ],
        materials: [
          { name: 'Guía de Ajustes y Alarmas en Móviles', type: 'pdf', path: 'materiales/alfabetizacion/sesion-1/guia-ajustes.pdf', available: false },
          { name: 'Infografía: Partes y Seguridad del Teléfono', type: 'image', path: 'materiales/alfabetizacion/sesion-1/infografia-movil.pdf', available: false }
        ],
        activity: 'Ajustes configurados, alarma programada para la clase y bloqueo seguro activado.',
        interactiveTool: 'Simulador de Smartphone y Alarma en Vivo'
      },
      {
        id: 'sesion-2',
        number: 2,
        title: 'Documento de Texto & Envío de Correo Formal',
        hours: '11 Horas',
        icon: '✉️',
        rapCode: '2205010460202',
        summary: 'Creación de documento base y dominio de los 5 bloques del correo formal: Para, Asunto específico, Saludo cordial, Objetivo/Cuerpo claro, Despedida/Firma y archivos adjuntos.',
        topics: [
          'Estructura de un documento de texto (títulos, párrafos, viñetas)',
          'Anatomía del correo electrónico: los 5 bloques indispensables',
          'Redacción formal vs informal',
          'Cómo adjuntar archivos y enlaces sin errores comunes',
          'Etiqueta digital (Netiqueta) y privacidad'
        ],
        materials: [
          { name: 'Plantilla de Correo Formal y Solicitud', type: 'document', path: 'materiales/alfabetizacion/sesion-2/plantilla-correo.docx', available: false },
          { name: 'Guía de Netiqueta y Redacción Digital', type: 'pdf', path: 'materiales/alfabetizacion/sesion-2/guia-netiqueta.pdf', available: false }
        ],
        activity: 'Documento redactado en procesador y correo formal enviado con archivo adjunto.',
        interactiveTool: 'Constructor y Previsualizador en Vivo de Correo'
      },
      {
        id: 'sesion-3',
        number: 3,
        title: 'Hojas de Cálculo: Ingresos y Gastos',
        hours: '14 Horas',
        icon: '📊',
        rapCode: '2205010460203',
        summary: 'Reconocimiento de Fila (números), Columna (letras) y Celda en Excel. Tabla práctica de presupuesto personal/hogar con fórmulas automáticas de SUMA y cálculo de Saldo Neto.',
        topics: [
          'Entorno de Excel: Filas, Columnas, Celdas y Rangos',
          'Ingreso de datos: Textos vs Números vs Fechas',
          'Construcción de tabla de presupuesto: Entradas y Salidas',
          'Fórmula =SUMA(...) y operadores aritméticos básicos (+, -)',
          'Cálculo de Saldo Disponible y formato de moneda'
        ],
        materials: [
          { name: 'Plantilla de Presupuesto Personal y Familiar (Excel)', type: 'sheet', path: 'materiales/alfabetizacion/sesion-3/plantilla-presupuesto.xlsx', available: false },
          { name: 'Guía paso a paso: Fórmulas de Suma y Saldo', type: 'pdf', path: 'materiales/alfabetizacion/sesion-3/guia-excel-basico.pdf', available: false }
        ],
        activity: 'Tabla de presupuesto en Excel diligenciada con fórmulas activas y saldo neto calculado.',
        interactiveTool: 'Simulador Dinámico de Presupuesto en Excel'
      },
      {
        id: 'sesion-4',
        number: 4,
        title: 'Internet, Servicios & Prevención de Fraudes',
        hours: '10 Horas',
        icon: '🌐',
        rapCode: '2205010460101',
        summary: 'Navegador vs Buscador, barra de direcciones, identificación de páginas oficiales (.gov.co, .edu.co) y detección interactiva de mensajes fraudulentos (SMS/WhatsApp) y enlaces sospechosos (Phishing).',
        topics: [
          'Diferencia clave: Navegador (Chrome, Edge) vs Buscador (Google)',
          'La barra de direcciones (URL): ¿a dónde me lleva realmente?',
          'Identificación de sitios seguros y dominios oficiales (.gov.co, .edu.co)',
          'Reconocimiento de Phishing en WhatsApp, SMS y correo',
          'Buenas prácticas para no caer en estafas digitales'
        ],
        materials: [
          { name: 'Decálogo de Ciberseguridad y Prevención de Phishing', type: 'pdf', path: 'materiales/alfabetizacion/sesion-4/decalogo-ciberseguridad.pdf', available: false },
          { name: 'Taller Práctico: Casos Reales de Enlaces Falsos', type: 'pdf', path: 'materiales/alfabetizacion/sesion-4/taller-enlaces-falsos.pdf', available: false }
        ],
        activity: 'Búsqueda validada en portal estatal oficial y resolución del cuestionario anti-fraude.',
        interactiveTool: 'Evaluador Interactivo Anti-Fraude y Phishing'
      },
      {
        id: 'sesion-5',
        number: 5,
        title: 'Inteligencia Artificial (IA) en la Vida Cotidiana',
        hours: '11 Horas',
        icon: '🤖',
        rapCode: 'Transversal',
        summary: 'Desmitificación de la IA, el arte de estructurar un buen Prompt, Actividad "Foto de la pieza" (plan de organización de espacios) y Actividad "Ejercicio del mendigo" (comunicación empática y reflexiva).',
        topics: [
          '¿Qué es y qué NO es la Inteligencia Artificial?',
          'Estructura de un Prompt efectivo: Rol + Contexto + Tarea + Formato',
          'Actividad 1: "Foto de la pieza" (Organización metódica de espacios)',
          'Actividad 2: "Ejercicio del mendigo" (El poder de las palabras y la empatía)',
          'Uso ético y reflexivo: la IA como asistente, no como sustituto del pensamiento'
        ],
        materials: [
          { name: 'Guía de Prompts Básicos para la Vida Cotidiana', type: 'pdf', path: 'materiales/alfabetizacion/sesion-5/guia-prompts-ia.pdf', available: false },
          { name: 'Ficha de Actividades "Foto de la pieza" y "El Mendigo"', type: 'pdf', path: 'materiales/alfabetizacion/sesion-5/ficha-actividades-ia.pdf', available: false }
        ],
        activity: 'Interacciones documentadas con IA resolviendo el caso de la habitación y la reformulación empática.',
        interactiveTool: 'Asistente de IA Educativa con Casos Prácticos'
      }
    ],
    transferProject: {
      title: 'Mi Solución Digital Práctica',
      hours: '8 Horas',
      description: 'Integración aplicada de todas las herramientas: el aprendiz resuelve un problema real de su entorno usando dispositivo seguro, documento formal, correo con evidencia, presupuesto en Excel y apoyo de IA.',
      evidence: 'Presentación final y rúbrica de evaluación integradora.'
    }
  },

  /* ============================================================
     CURSO EJEMPLO 2: LISTO PARA RECIBIR TUS MATERIALES Y TEMAS
     ============================================================ */
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
    description: 'Curso complementario orientado al manejo intermedio de procesadores de texto, hojas de cálculo con gráficos dinámicos y presentaciones corporativas de alto impacto.',
    targetUrl: '#',
    guideUrl: '#',
    materialsFolder: 'materiales/ofimaticas/',
    raps: [
      { code: 'RAP-01', text: 'Elaborar documentos corporativos aplicando normas de estilo y combinación de correspondencia.' },
      { code: 'RAP-02', text: 'Diseñar modelos de datos en hojas de cálculo con tablas dinámicas y validación.' }
    ],
    sessions: [
      {
        id: 'sesion-1',
        number: 1,
        title: 'Word Avanzado: Estilos, Tablas de Contenido y Correspondencia',
        hours: '12 Horas',
        icon: '📄',
        rapCode: 'RAP-01',
        summary: 'Dominio de estilos, saltos de sección, numeración diferenciada y combinación de correspondencia masiva.',
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
        summary: 'Uso de funciones SI, BUSCARV/BUSCARX, filtros avanzados y resumen de grandes volúmenes con Tablas Dinámicas.',
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

  /* ============================================================
     CURSO EJEMPLO 3: CIUDADANÍA DIGITAL & INTELIGENCIA ARTIFICIAL
     ============================================================ */
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
    description: 'Aprende a integrar ChatGPT, Claude, Copilot y herramientas de análisis visual para optimizar tiempos, redacción de informes y resolución de problemas cotidianos.',
    targetUrl: '#',
    guideUrl: '#',
    materialsFolder: 'materiales/ia-productividad/',
    raps: [
      { code: 'RAP-01', text: 'Diseñar secuencias de prompts avanzados aplicados al entorno laboral.' },
      { code: 'RAP-02', text: 'Aplicar criterios de verificación, ética y seguridad de la información con IA.' }
    ],
    sessions: [
      {
        id: 'sesion-1',
        number: 1,
        title: 'Ingeniería de Prompts y Pensamiento Estructurado',
        hours: '10 Horas',
        icon: '🧠',
        rapCode: 'RAP-01',
        summary: 'Métodos para dialogar con modelos de lenguaje, parámetros de control y creación de asistentes personalizados.',
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

// Utilidades para acceder a la base de datos
function getAllCourses() {
  return COURSES_DATA;
}

function getCourseById(id) {
  return COURSES_DATA.find(c => c.id === id) || null;
}

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.COURSES_DATA = COURSES_DATA;
  window.getAllCourses = getAllCourses;
  window.getCourseById = getCourseById;
}

