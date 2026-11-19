/**
 * Single Responsibility Principle (SRP):
 * Dedicated module for Glossary terms, Official Bibliographic References, and SENA Platforms.
 */

export const GLOSSARY_TERMS = [
  {
    id: 'archivo',
    icon: '📄',
    term: 'Archivo',
    definition: 'Elemento digital que contiene información, como un documento, imagen, audio, video o PDF.'
  },
  {
    id: 'carpeta',
    icon: '📁',
    term: 'Carpeta',
    definition: 'Espacio utilizado para organizar y almacenar archivos de manera estructurada.'
  },
  {
    id: 'sistema-operativo',
    icon: '🖥️',
    term: 'Sistema Operativo',
    definition: 'Software que administra los recursos del computador y permite utilizar programas, archivos y dispositivos.'
  },
  {
    id: 'procesador-texto',
    icon: '📝',
    term: 'Procesador de Texto',
    definition: 'Aplicación que permite crear, editar, dar formato, guardar y compartir documentos.'
  },
  {
    id: 'hoja-calculo',
    icon: '📊',
    term: 'Hoja de Cálculo',
    definition: 'Aplicación que permite organizar datos en filas y columnas, realizar operaciones y representar información mediante gráficos.'
  },
  {
    id: 'formula',
    icon: '🧮',
    term: 'Fórmula',
    definition: 'Expresión utilizada en una hoja de cálculo para realizar un cálculo a partir de valores o referencias de celdas.'
  },
  {
    id: 'grafico',
    icon: '📈',
    term: 'Gráfico',
    definition: 'Representación visual de datos que facilita su interpretación.'
  },
  {
    id: 'presentacion',
    icon: '📽️',
    term: 'Presentación',
    definition: 'Conjunto organizado de diapositivas utilizado para comunicar información ante un público.'
  },
  {
    id: 'internet',
    icon: '🌐',
    term: 'Internet',
    definition: 'Red que permite acceder a información y utilizar servicios de comunicación y colaboración.'
  },
  {
    id: 'navegador',
    icon: '🧭',
    term: 'Navegador',
    definition: 'Programa utilizado para acceder y visualizar contenidos disponibles en Internet.'
  },
  {
    id: 'buscador',
    icon: '🔍',
    term: 'Buscador',
    definition: 'Servicio que permite localizar información en Internet mediante palabras o frases de búsqueda.'
  },
  {
    id: 'correo-electronico',
    icon: '✉️',
    term: 'Correo Electrónico',
    definition: 'Servicio que permite enviar y recibir mensajes y archivos por medios digitales.'
  },
  {
    id: 'blog',
    icon: '📰',
    term: 'Blog',
    definition: 'Espacio digital utilizado para publicar contenidos organizados sobre uno o varios temas.'
  },
  {
    id: 'seguridad-internet',
    icon: '🔒',
    term: 'Seguridad en Internet',
    definition: 'Conjunto de prácticas orientadas a proteger dispositivos, cuentas, información y datos personales.'
  },
  {
    id: 'evidencia-aprendizaje',
    icon: '🎯',
    term: 'Evidencia de Aprendizaje',
    definition: 'Producto o actuación que permite demostrar el aprendizaje alcanzado por el aprendiz.'
  }
];

export const BIBLIOGRAPHIC_REFERENCES = [
  {
    id: 'ref-1',
    author: 'Servicio Nacional de Aprendizaje – SENA.',
    text: 'Diseño curricular del programa de formación complementaria "Alfabetización Informática", código 22810239, versión 1. Documento base para la planeación pedagógica y esta guía de aprendizaje.'
  },
  {
    id: 'ref-2',
    author: 'Servicio Nacional de Aprendizaje – SENA.',
    text: 'Planeación pedagógica del programa "Alfabetización Informática", formato GFPI-F-134, versión 05. Documento utilizado para definir resultados de aprendizaje, actividades, horas, evidencias y estrategias didácticas.'
  },
  {
    id: 'ref-3',
    author: 'Servicio Nacional de Aprendizaje – SENA.',
    text: 'Formato Guía de Aprendizaje GFPI-F-135, versión 04. Estructura y orientaciones para el desarrollo de la presente guía.'
  }
];

export const SENA_PLATFORMS = [
  {
    id: 'sofia-plus',
    name: 'SOFIA Plus',
    url: 'https://oferta.senasofiaplus.edu.co/',
    description: 'Portal de gestión académica, fichas y certificados.'
  },
  {
    id: 'zajuna',
    name: 'Zajuna LMS',
    url: 'https://zajuna.sena.edu.co/',
    description: 'Ambiente Virtual de Aprendizaje (AVA) del SENA.'
  },
  {
    id: 'correo-misena',
    name: 'Correo MiSena',
    url: 'https://correo.misena.edu.co/',
    description: 'Cuentas institucionales oficiales de correo para aprendices.'
  },
  {
    id: 'biblioteca',
    name: 'Sistema de Bibliotecas',
    url: 'https://biblioteca.sena.edu.co/',
    description: 'Bases de datos digitales, libros y recursos de consulta.'
  }
];
