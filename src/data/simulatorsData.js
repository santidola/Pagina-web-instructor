/**
 * Single Responsibility Principle (SRP) & Open/Closed Principle (OCP):
 * Declarative configurations for interactive classroom simulators.
 * New AI presets, phishing cases, or budget rows can be added here
 * without modifying any simulator component code.
 */

export const INITIAL_MOBILE_SETTINGS = [
  { id: 'wifi', label: '📶 Conexión Wi-Fi SENA', featureName: 'Wi-Fi SENA', enabled: true },
  { id: 'bluetooth', label: '🔵 Bluetooth', featureName: 'Bluetooth', enabled: false },
  { id: 'sound', label: '🔊 Sonido y Notificaciones', featureName: 'Sonido', enabled: true },
  { id: 'pin', label: '🔒 Bloqueo por PIN / Huella', featureName: 'Bloqueo PIN', enabled: true }
];

export const INITIAL_EMAIL_STATE = {
  to: 'instructor.sena@correo.edu.co',
  subject: 'Entrega Taller 01 - Ficha 22810239',
  greeting: 'Apreciado/a Instructor/a y Equipo Académico:',
  body: 'Por medio del presente correo hago entrega formal del documento de texto elaborado en Google Docs y adjunto el archivo solicitado para su correspondiente revisión.',
  farewell: 'Agradezco su atención y quedo atento/a a sus comentarios. Cordialmente,',
  signature: 'Nombre del Aprendiz · Ficha SENA 22810239'
};

export const INITIAL_SENA_EXPENSES = [
  { id: 'exp-1', cell: 'B2', concept: 'Efectivo', amount: 120000 },
  { id: 'exp-2', cell: 'B3', concept: 'Servicios casa', amount: 85000 },
  { id: 'exp-3', cell: 'B4', concept: 'Cuota banco agosto', amount: 90000 },
  { id: 'exp-4', cell: 'B5', concept: 'Seguridad social', amount: 30000 },
  { id: 'exp-5', cell: 'B6', concept: 'Gym (¡Prueba cambiarlo!)', amount: 0 }
];

export const INITIAL_SENA_SALARY = 500000;

export const PHISHING_CASES = [
  {
    id: 'case-1',
    title: 'Caso 1: SMS de Entrega de Paquete',
    badge: 'SMS Sospechoso',
    isFraud: true,
    message:
      '"ENTREGA: Su paquete #39281 presenta retraso por dirección incompleta. Actualice sus datos y pague $3.500 para entrega hoy en: http://envios-servientrega-rastreo.cc/pago"',
    explanation:
      'Es FRAUDE. Ninguna empresa de mensajería cobra tarifas por enlaces no oficiales con dominios extraños (.cc). Buscan clonar tu tarjeta bancaria.'
  },
  {
    id: 'case-2',
    title: 'Caso 2: Correo Institucional del SENA',
    badge: 'Correo Oficial',
    isFraud: false,
    message:
      '"Apreciado aprendiz: Le recordamos que sus calificaciones del curso de Alfabetización Informática están disponibles. Por favor ingrese directamente a zajuna.sena.edu.co con su usuario y contraseña."',
    explanation:
      'Es SEGURO. No contiene enlaces acortados sospechosos, no solicita claves por correo y te invita a ingresar de manera autónoma al portal oficial (.edu.co).'
  },
  {
    id: 'case-3',
    title: 'Caso 3: Notificación Judicial con Adjunto',
    badge: 'Correo Malicioso',
    isFraud: true,
    message:
      '"JUZGADO MUNICIPAL: Proceso No 17821310-62. Notificación de demanda en su contra. Descargue el archivo adjunto y use la clave 201281 para abrir su citación."',
    explanation:
      'Es FRAUDE. Ninguna citación judicial de Fiscalía o juzgado llega con un archivo adjunto comprimido con clave ni enlaces automáticos de descarga. Contiene Malware.'
  }
];

export const AI_PROMPT_PRESETS = [
  {
    key: 'silla',
    label: '🪑 Reto 1: Foto Silla & Ronaldo',
    keywords: ['silla', 'ronaldo'],
    prompt:
      'Transforma esta foto de la silla vacía. Mantén el fondo y la silla tal como están, pero añade a Cristiano Ronaldo sentado en ella.',
    response: `<strong>Resultado del Reto 1 (Transformación con IA):</strong><br/>
1. <strong>Análisis de la imagen:</strong> La IA reconoce la silla plástica blanca y el fondo de la habitación.<br/>
2. <strong>Generación contextual:</strong> Mantiene la perspectiva, la iluminación y proyecta la figura de Cristiano Ronaldo sentado de forma anatómicamente proporcional.<br/>
💡 <em>Aprendizaje de clase:</em> La IA generativa de imágenes respeta los elementos fijos cuando se le especifica claramente en el Prompt.`
  },
  {
    key: 'convulsion',
    label: '🚑 Reto 2: Primeros Auxilios',
    keywords: ['convulsion', 'auxilio', 'primeros auxilios'],
    prompt:
      'Actúa como un asistente de primeros auxilios que orienta a una persona sin conocimientos médicos. Voy caminando por la calle y, de repente, alguien cae al suelo y comienza a convulsionar. Estoy muy nervioso y no sé qué hacer. Oriéntame de manera natural, directa y urgente, indicándome paso a paso qué debo hacer, qué errores debo evitar y cuándo solicitar ayuda médica.',
    response: `<strong>Protocolo de Emergencia Paso a Paso:</strong><br/>
1. <strong>Protege a la persona:</strong> Retira objetos duros, piedras o bordes filosos cercanos para evitar golpes en la cabeza.<br/>
2. <strong>NO la sujetes ni inmovilices:</strong> Deja que la convulsión siga su curso natural sin forzar sus extremidades.<br/>
3. <strong>NO introduzcas nada en la boca:</strong> No metas dedos, cucharas ni trapos. No des agua ni medicamentos.<br/>
4. <strong>Cronometra el tiempo:</strong> Si la convulsión dura más de 5 minutos, se repite o la persona tiene dificultad para respirar, <strong>llama de inmediato al 123 (Línea de Emergencias)</strong>.<br/>
5. <strong>Al terminar:</strong> Colócala de lado (posición lateral de seguridad) y acompáñala con calma.`
  },
  {
    key: 'safari',
    label: '🦁 Reto 3: Safari en África',
    keywords: ['safari', 'africa', 'viaje'],
    prompt:
      'Actúa como un asesor profesional de viajes especializado en turismo internacional. Quiero organizar un viaje para realizar un safari en África. Diseña un itinerario de viaje que incluya destinos recomendados, duración del recorrido, actividades y experiencias. Calcula un presupuesto estimado que contemple tiquetes aéreos saliendo desde Medellín, alojamiento, alimentación, transporte y actividades de safari. Presenta los costos en pesos colombianos y dólares, especificando que son valores aproximados.',
    response: `<strong>Itinerario Sugerido: Safari Clásico en Kenia & Tanzania (8 Días / 7 Noches)</strong><br/>
• <strong>Día 1-2:</strong> Vuelo Medellín ➔ Bogotá ➔ Madrid / Doha ➔ Nairobi. Aclimatación y descanso.<br/>
• <strong>Día 3-4:</strong> Traslado a la Reserva Nacional Masái Mara. Safaris al amanecer y atardecer para avistar 'Los 5 Grandes' (león, leopardo, elefante, búfalo y rinoceronte).<br/>
• <strong>Día 5-6:</strong> Parque Nacional Serengueti. Visita guiada a una aldea cultural Masái.<br/>
• <strong>Día 7-8:</strong> Cráter de Ngorongoro y regreso a Nairobi para vuelo de retorno a Colombia.<br/><br/>
💰 <strong>Presupuesto Estimado por Persona:</strong><br/>
- Tiquetes aéreos desde Medellín: ~$1,800 USD ($7.200.000 COP aprox.).<br/>
- Paquete Safari todo incluido (alojamiento, 4x4 con guía, entradas a parques): ~$2,500 USD ($10.000.000 COP).<br/>
- Total aproximado: ~$4,300 USD ($17.200.000 COP).<br/>
⚠️ <em>Importante:</em> Recuerda verificar vacuna de fiebre amarilla y visado con 30 días de anticipación.`
  },
  {
    key: 'ecuaciones',
    label: '📐 Reto 4: Profesor de Matemáticas',
    keywords: ['ecuacion', 'matematica'],
    prompt:
      'Actúa como un profesor de matemáticas (ROL). Soy un estudiante que está aprendiendo desde cero y tengo dificultades con las operaciones básicas (CONTEXTO). Explícame cómo resolver ecuaciones de primer grado, paso a paso, utilizando un ejemplo práctico (TAREA). Organiza la explicación en pasos numerados y termina con tres ejercicios para practicar (FORMATO).',
    response: `<strong>¡Hola! Vamos a aprender ecuaciones paso a paso:</strong><br/>
Imagina una balanza en equilibrio. Lo que esté en el lado izquierdo debe pesar exactamente lo mismo que el lado derecho.<br/><br/>
<strong>Ejemplo Práctico:</strong> <code>x + 5 = 12</code><br/>
1. <strong>Identifica la incógnita:</strong> 'x' es una caja misteriosa cuyo contenido queremos descubrir.<br/>
2. <strong>Despeja la incógnita:</strong> Para dejar a 'x' sola, debemos quitar el +5. Si le restamos 5 a la izquierda, también debemos restarle 5 a la derecha: <code>x = 12 - 5</code>.<br/>
3. <strong>Calcula el resultado:</strong> <code>x = 7</code>. Si verificamos: 7 + 5 = 12. ¡La balanza está perfecta!<br/><br/>
<strong>Ejercicios para practicar:</strong><br/>
a) x + 8 = 15<br/>
b) x - 4 = 10<br/>
c) 2x = 14`
  },
  {
    key: 'pieza',
    label: '🧹 Caso: Foto de la Pieza',
    keywords: ['habitacion', 'pieza', 'desorden'],
    prompt:
      'Tengo una habitación de 3x3 metros desordenada con ropa en la cama y papeles en la mesa. ¿Puedes darme un plan en 4 pasos para organizarla en 30 minutos?',
    response: `<strong>Plan Rápido de Organización (30 Minutos):</strong><br/>
1. <strong>Fase Despeje de Cama (7 min):</strong> Dobla o cuelga la ropa limpia en el armario y coloca la ropa sucia en el canasto.<br/>
2. <strong>Fase Superficies (8 min):</strong> Clasifica los papeles de la mesa: archiva los importantes en una carpeta y recicla los que ya no sirvan.<br/>
3. <strong>Fase Piso Despejado (7 min):</strong> Levanta zapatos y objetos del suelo, ubicándolos en su lugar o debajo de la cama en cajas.<br/>
4. <strong>Fase Ventilación y Aroma (8 min):</strong> Abre la ventana 10 minutos, tiende la cama con firmeza y rocía un toque de ambientador. ¡Tu mente descansará el doble!`
  },
  {
    key: 'mendigo',
    label: '❤️ Caso: Cartel Empático',
    keywords: ['ciego', 'mendigo', 'cartel'],
    prompt:
      'En la calle hay un cartel que dice: "Soy ciego, por favor ayúdenme". Reescribe este mensaje con empatía humana para tocar el corazón de las personas y generar mayor solidaridad.',
    response: `<strong>Propuesta Creativa y Empática (La fuerza del lenguaje positivo):</strong><br/>
<em>"Hoy es un día hermoso y soleado... pero yo no puedo verlo. Tu generosidad ilumina mi camino."</em><br/><br/>
💡 <strong>Explicación pedagógica:</strong> En lugar de enfocarse solo en la carencia o la lástima, el nuevo mensaje conecta al lector con la gratitud de su propio sentido de la vista, despertando empatía genuina y deseo espontáneo de colaborar.`
  }
];
