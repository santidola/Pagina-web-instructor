/**
 * Single Responsibility Principle (SRP):
 * Dedicated module for the official GFPI-F-135 Learning Guide data.
 */

export const GUIDE_DATA = {
  formatVersion: 'Formato GFPI-F-135 · Versión 04',
  identification: {
    programName: 'ALFABETIZACIÓN INFORMÁTICA',
    programCode: '22810239 – Versión 1',
    projectPhase: 'No aplica – Programa de formación complementaria',
    duration: '70 Horas Totales',
    competence:
      '220501046 — APLICAR HERRAMIENTAS OFIMÁTICAS, REDES SOCIALES Y COLABORATIVAS DE ACUERDO CON EL PROYECTO A DESARROLLAR.',
    raps: [
      {
        code: '2205010460201',
        text: 'MANEJAR LAS FUNCIONALIDADES BÁSICAS DE UN SISTEMA OPERATIVO DE ACUERDO CON LAS NECESIDADES DEL CLIENTE.'
      },
      {
        code: '2205010460202',
        text: 'APLICAR LAS FUNCIONES DE UN PROCESADOR DE TEXTO SEGÚN LAS CARACTERÍSTICAS DEL DOCUMENTO A ELABORAR.'
      },
      {
        code: '2205010460203',
        text: 'APLICAR LAS FUNCIONES DE UNA HOJA DE CÁLCULO SEGÚN LAS CARACTERÍSTICAS DE LAS OPERACIONES A DESARROLLAR.'
      },
      {
        code: '2205010460204',
        text: 'APLICAR LAS FUNCIONES DE UN PROGRAMA DE REALIZACIÓN DE DIAPOSITIVAS SEGÚN LAS CARACTERÍSTICAS DE LA PRESENTACIÓN A DESARROLLAR.'
      },
      {
        code: '2205010460101',
        text: 'UTILIZAR LOS SERVICIOS DE INTERNET DE ACUERDO CON LAS NECESIDADES.'
      }
    ]
  },
  presentationParagraphs: [
    'La presente guía de aprendizaje corresponde al programa de formación complementaria Alfabetización Informática y orienta el desarrollo práctico de habilidades para el uso de herramientas informáticas y servicios de Internet. Las actividades se articulan con la planeación pedagógica del programa y buscan que el aprendiz aplique los conocimientos en situaciones concretas, mediante demostraciones, ejercicios guiados, resolución de problemas y elaboración de productos digitales.',
    'Durante la guía se trabajarán de manera progresiva las funcionalidades básicas de un sistema operativo, el manejo de un procesador de texto, las funciones de una hoja de cálculo, la elaboración de presentaciones y el uso de servicios de Internet. Se priorizará el aprendizaje haciendo, de manera que cada concepto se relacione con una tarea observable y con una evidencia de aprendizaje.',
    'La formación se desarrollará en un ambiente de aprendizaje con equipos de cómputo y recursos TIC. Cuando las condiciones del centro lo permitan, se utilizarán conexión a Internet, proyector y herramientas ofimáticas. El instructor podrá organizar el trabajo individual o colaborativo según la disponibilidad de equipos y las necesidades del grupo.',
    'Al finalizar, el aprendiz integrará las habilidades desarrolladas en un producto práctico que evidencie organización de archivos, elaboración de un documento, manejo básico de datos, creación de una presentación y utilización responsable de servicios de Internet.'
  ],
  evaluationMatrix: [
    {
      id: 'eval-3-1',
      activity: '3.1 Reflexión inicial',
      hours: '2 Horas',
      evidence: 'Participación y meta personal de aprendizaje.',
      criteria: 'Relaciona el uso de la tecnología con necesidades concretas y reconoce expectativas de aprendizaje.',
      instruments: 'Observación directa y preguntas orientadoras.'
    },
    {
      id: 'eval-3-2',
      activity: '3.2 Contextualización',
      hours: '4 Horas',
      evidence: 'Lista de chequeo diagnóstica y ejercicios de reconocimiento.',
      criteria: 'Identifica conocimientos previos y reconoce funcionalidades básicas de herramientas informáticas.',
      instruments: 'Lista de chequeo diagnóstica y observación.'
    },
    {
      id: 'eval-ses-1',
      activity: '3.3 Sesión 1 – Móvil & S.O.',
      hours: '10 Horas',
      evidence: 'Demostración de ajustes, alarma programada y bloqueo seguro.',
      criteria: 'Opera funciones básicas del sistema operativo, gestión de apps y ajustes del dispositivo móvil de forma segura.',
      instruments: 'Lista de chequeo y observación directa.'
    },
    {
      id: 'eval-ses-2',
      activity: '3.3 Sesión 2 – Texto & Correo',
      hours: '11 Horas',
      evidence: 'Documento digital terminado y correo formal enviado con adjunto.',
      criteria: 'Redacta documentos de texto y comunica información por correo estructurado con asunto, objetivo, saludo y despedida.',
      instruments: 'Rúbrica de producto y lista de chequeo.'
    },
    {
      id: 'eval-ses-3',
      activity: '3.3 Sesión 3 – Hojas de cálculo',
      hours: '14 Horas',
      evidence: 'Presupuesto en Excel con filas, columnas, fórmulas de suma y saldo.',
      criteria: 'Construye tablas de ingresos y gastos cotidianos aplicando fórmulas de suma y sustracción de forma autónoma.',
      instruments: 'Lista de chequeo y revisión de libro de cálculo.'
    },
    {
      id: 'eval-ses-4',
      activity: '3.3 Sesión 4 – Internet & Fraudes',
      hours: '10 Horas',
      evidence: 'Búsqueda oficial validada y taller de detección de mensajes fraudulentos.',
      criteria: 'Navega en internet distinguiendo buscador de navegador, ubica páginas oficiales y previene estafas y links sospechosos.',
      instruments: 'Casos prácticos y lista de chequeo.'
    },
    {
      id: 'eval-ses-5',
      activity: '3.3 Sesión 5 – Inteligencia Artificial',
      hours: '11 Horas',
      evidence: 'Registro de prompts de IA (foto de la pieza y dinámica del mendigo).',
      criteria: 'Interactúa con asistentes de IA mediante instrucciones claras y adapta los resultados con sentido crítico y ético.',
      instruments: 'Rúbrica de prompts y observación.'
    },
    {
      id: 'eval-3-4',
      activity: '3.4 Transferencia',
      hours: '8 Horas',
      isHighlight: true,
      evidence: 'Producto integrador "Mi Solución Digital Práctica" y socialización.',
      criteria: 'Integra las competencias desarrolladas en una propuesta cotidiana real y explica el procedimiento realizado.',
      instruments: 'Rúbrica final, lista de chequeo y autoevaluación.'
    }
  ]
};
