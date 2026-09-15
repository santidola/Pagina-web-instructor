# 🎓 SENA - Portal del Instructor (Classroom Hub & Landing Page)

> Plataforma web interactiva, liviana y moderna para la organización pedagógica y proyección en aula de clases, cursos complementarios, fichas activas, guías y recursos de aprendizaje del **SENA**.

---

## 📑 Tabla de Contenido
1. [Visión y Propósito del Proyecto](#-visión-y-propósito-del-proyecto)
2. [Arquitectura y Stack Tecnológico](#-arquitectura-y-stack-tecnológico)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Modelo de Datos Tipado (`src/data/courses.ts`)](#-modelo-de-datos-tipado)
5. [Módulos y Componentes de la Interfaz](#-módulos-y-componentes-de-la-interfaz)
6. [Estrategia Git y Convención de Commits](#-estrategia-git-y-convención-de-commits)
7. [Plan de Trabajo Detallado (Historias de Usuario y Tareas)](#-plan-de-trabajo-detallado-historias-de-usuario-y-tareas)
8. [Guía de Inicio y Ejecución Local](#-guía-de-inicio-y-ejecución-local)
9. [Guía de Despliegue Gratuito (Vercel & GitHub Pages)](#-guía-de-despliegue-gratuito)

---

## 🎯 Visión y Propósito del Proyecto

El objetivo de este proyecto es proveer al instructor del **SENA** una herramienta digital ágil, elegante y de carga instantánea que sirva como **Centro de Mando (Hub Central)** durante sus sesiones presenciales o virtuales.

### ¿Por qué este enfoque liviano (Zero-Backend)?
- **Velocidad Extrema e Independencia:** Al no requerir bases de datos ni servidores backend dedicados, la página carga en milisegundos y no sufre caídas por latencia o cold starts.
- **Diseñado para el Proyector del Aula:** Interfaz con tipografía nítida, paleta institucional SENA y conmutador de **Modo Claro / Modo Oscuro** optimizado para proyectores con baja luminosidad o salones iluminados.
- **Fácil de Actualizar:** Toda la información (fichas, horarios, enlaces a diapositivas, guías en PDF y cronogramas) se gestiona de forma centralizada en un archivo tipado (`src/data/courses.ts`).
- **Costo Cero Permanente:** Despliegue estático 100% gratuito en proveedores globales como Vercel o GitHub Pages con certificado SSL incluido.

---

## 🛠 Arquitectura y Stack Tecnológico

| Herramienta | Rol en la Aplicación |
|---|---|
| **React 18+** | Biblioteca base para la construcción de interfaces reactivas y modulares basadas en componentes. |
| **TypeScript** | Tipado estático estricto para garantizar consistencia en la estructura de cursos, fichas y lecciones. |
| **Vite** | Empaquetador ultrarrápido con Hot Module Replacement (HMR) instantáneo para desarrollo. |
| **Tailwind CSS** | Sistema de diseño basado en utilidades, garantizando una estética moderna, responsiva y accesible. |
| **Lucide Icons** | Conjunto de iconos vectoriales limpios y coherentes para la navegación institucional. |
| **Framer Motion** | Micro-animaciones fluidas para transiciones de modales, acordeones y pestañas. |

---

## 📂 Estructura del Proyecto

```text
pagina-web-instructor/
├── public/
│   ├── favicon.ico
│   └── sena-logo.svg             # Logo institucional del SENA
├── src/
│   ├── assets/                   # Imágenes, avatares o material gráfico
│   ├── components/
│   │   ├── Navbar.tsx            # Barra superior institucional y selector de tema (Dark/Light)
│   │   ├── Hero.tsx              # Presentación del instructor y botón directo "Clase de Hoy"
│   │   ├── QuickLinks.tsx        # Enlaces a plataformas SENA (Zajuna, SOFIA Plus, Bibliotecas)
│   │   ├── CourseGrid.tsx        # Contenedor y filtrado por número de ficha / nombre
│   │   ├── CourseCard.tsx        # Tarjeta individual de curso/ficha con badges informativos
│   │   ├── CourseViewerModal.tsx # Modal con pestañas: Unidades, Guías y Cronograma
│   │   ├── TodayClassModal.tsx   # Modal destacado de alto contraste para proyección en aula
│   │   └── CodePreviewModal.tsx  # Visor emergente con resaltado de bloques de código
│   ├── data/
│   │   └── courses.ts            # Fuente única de verdad: contratos TS y datos de fichas
│   ├── App.tsx                   # Coordinador central de estado y vistas
│   ├── index.css                 # Importación de Tailwind CSS y reglas de alto contraste
│   └── main.tsx                  # Bootstrap de React
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🧱 Modelo de Datos Tipado (`src/data/courses.ts`)

La aplicación basa su fiabilidad en contratos de TypeScript explícitos:

```typescript
// Perfil y datos de contacto del instructor
export interface InstructorProfile {
  name: string;
  role: string;
  center: string;
  regional: string;
  bio: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl: string;
}

// Enlaces rápidos a plataformas institucionales
export interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  badge?: string;
  icon: 'book' | 'code' | 'external-link' | 'graduation-cap';
}

// Lecciones dentro de una unidad temática
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  slidesUrl?: string;
  videoUrl?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

// Unidad temática del programa formativo
export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

// Guía o evidencia de aprendizaje
export interface Activity {
  id: string;
  code: string; // ej: GA3-220501093-AA1-EV01
  title: string;
  type: 'Taller' | 'Evidencia' | 'Cuestionario' | 'Proyecto';
  dueDate: string;
  description: string;
  guideDownloadUrl?: string;
  deliveryMethod: string; // ej: "Subir a Zajuna en la sección de evidencias"
  status: 'Abierta' | 'Por Calificar' | 'Cerrada';
}

// Hitos semanales del curso
export interface ScheduleItem {
  week: number;
  dates: string;
  topic: string;
  milestone: string;
}

// Estructura completa de una Ficha o Curso SENA
export interface Course {
  id: string;
  ficha: string; // Número de Ficha SENA (ej: "2670123")
  programName: string;
  shortName: string;
  level: 'Tecnólogo' | 'Técnico' | 'Complementario' | 'Especialización';
  status: 'En curso' | 'Finalizado' | 'Próximo';
  schedule: string; // ej: "Lunes a Viernes 07:00 - 13:00"
  classroom: string; // ej: "Ambiente de Redes 204"
  currentUnit: string; // Tema proyectable para la "Clase de Hoy"
  bannerColor: string; // Degradado Tailwind para la tarjeta
  units: Unit[];
  activities: Activity[];
  schedulePlan: ScheduleItem[];
}
```

---

## 🖥 Módulos y Componentes de la Interfaz

### 1. Header & Barra Institucional
- Logotipo oficial del SENA y nombre del Centro de Formación.
- Indicador del estado de la jornada y botón switch para alternar entre **Modo Claro** y **Modo Oscuro**.
- Botón de contacto directo por correo institucional.

### 2. Hero Section & Presentación Docente
- Saludo personalizado del instructor, badge de especialidad y centro formativo.
- Botón de acción principal: **`Proyectar "Clase de Hoy"`**, el cual abre un panel de alta visibilidad para que los aprendices al entrar al aula vean inmediatamente el objetivo del día.
- Barra de accesos directos: **Zajuna LMS**, **SOFIA Plus**, **Repositorio de GitHub** y **Sistema de Bibliotecas SENA**.

### 3. Buscador y Filtro Dinámico de Fichas
- Input reactivo que filtra en tiempo real por número de ficha (ej: `2670123`) o palabras clave del programa formativo (ej: `ADSO`, `Frontend`, `Software`).

### 4. Cuadrícula de Cursos Activos (Cards)
- Cada tarjeta contiene:
  - Encabezado con degradado y badge de nivel de formación.
  - Número de ficha destacado.
  - Horario formativo y ambiente de aprendizaje físico o virtual.
  - Indicador de estado animado (`En curso` con pulso verde institucional).
  - Botón **"Ver Contenido"** que activa el visor modal detallado.

### 5. Visor Integral de Contenido (Modal/Drawer)
Organizado en 3 pestañas principales:
- 📖 **Unidades y Lecciones:** Desglose temático con enlaces a diapositivas y botón de visualización rápida de fragmentos de código de ejemplo.
- 📋 **Guías y Actividades:** Código oficial de la evidencia SENA, fecha límite, enlace de descarga de la guía en PDF e instrucciones claras sobre la entrega institucional en Zajuna.
- 📅 **Cronograma:** Tabla de seguimiento semana a semana con fechas e hitos pedagógicos clave.

---

## 🌿 Estrategia Git y Convención de Commits

Para mantener un repositorio profesional y ordenado:

### Formato de Commits (Conventional Commits)
`<tipo>(<componente>): <descripción breve y en presente>`

- `feat(ui)`: Nueva funcionalidad visual o componente interactivo.
- `data(courses)`: Actualización o inclusión de nuevas fichas, guías o lecciones.
- `style(theme)`: Ajustes de Tailwind CSS o modo de contraste para proyección.
- `chore(deps)`: Configuración de paquetes, Vite o despliegue.
- `docs(readme)`: Actualizaciones en la documentación del repositorio.

---

## 📋 Plan de Trabajo Detallado (Historias de Usuario y Tareas)

A continuación se detalla la hoja de ruta de desarrollo organizada bajo metodología ágil, dividida en **Épicas**, **Historias de Usuario (US)** con formato estándar (*Como / Quiero / Para*), **Criterios de Aceptación** y **Tareas con Commits Convencionales**:

---

### 🚀 Épica 1: Arquitectura Base y Entorno de Desarrollo

#### Historia US-01: Inicialización del Proyecto y Sistema de Diseño
- **Como:** Desarrollador frontend / Instructor SENA.
- **Quiero:** Configurar un entorno con React 18, TypeScript, Vite y Tailwind CSS con la paleta de colores institucional.
- **Para:** Disponer de una base de código limpia, ultrarrápida, escalable y con Hot Module Replacement (HMR).
- **Rama Git:** `feature/US-01-project-setup`
- **Criterios de Aceptación:**
  - Proyecto inicializado con Vite y template oficial de React + TypeScript.
  - Tailwind CSS instalado y configurado con directivas `@tailwind` en `src/index.css`.
  - Iconografía con `lucide-react` y animaciones con `framer-motion` instaladas en `package.json`.
  - Compilación exitosa y libre de errores de tipado al ejecutar `npm run build`.
- **Tareas y Commits:**
  1. `chore(setup): scaffold React 18 + Vite + TypeScript project`
  2. `chore(tailwind): install and configure Tailwind CSS and theme colors`
  3. `chore(deps): install lucide-react and framer-motion dependencies`
  4. `docs(setup): document local scripts and development instructions`

#### Historia US-02: Modelo de Datos Centralizado y Tipado Estricto
- **Como:** Instructor SENA.
- **Quiero:** Definir las interfaces de TypeScript y el archivo de datos `src/data/courses.ts`.
- **Para:** Gestionar de forma centralizada y segura la información de mis fichas, unidades, lecciones y guías sin requerir bases de datos.
- **Rama Git:** `feature/US-02-data-model-typescript`
- **Criterios de Aceptación:**
  - Interfaces definidas para `Course`, `Unit`, `Lesson`, `Activity`, `ScheduleItem`, `InstructorProfile` y `QuickLink`.
  - Datos mock iniciales con al menos dos cursos SENA reales (ej. ADSO Ficha 2670123 y curso complementario).
  - Tipado estricto sin uso de `any` para garantizar autocompletado y robustez en los componentes.
- **Tareas y Commits:**
  1. `feat(types): define TypeScript interfaces for courses, units and activities`
  2. `feat(data): create instructor profile and institutional quick links constants`
  3. `feat(data): populate initial mock data with ADSO and complementary courses`

---

### 🏛 Épica 2: Identidad Institucional y Navegación Docente

#### Historia US-03: Barra Superior Institucional y Modo Proyector (Dark / Light)
- **Como:** Instructor dictando clases en un aula o ambiente de formación.
- **Quiero:** Contar con una barra institucional con el logotipo del SENA y un selector de tema (Modo Claro / Modo Oscuro) de alto contraste.
- **Para:** Adaptar instantáneamente la visibilidad de la página según la iluminación del salón o las características del proyector.
- **Rama Git:** `feature/US-03-navbar-theme-toggle`
- **Criterios de Aceptación:**
  - Barra de navegación fija (*sticky top*) con efecto de desenfoque (`backdrop-blur`).
  - Logotipo institucional del SENA y nombre del Centro de Formación / Regional.
  - Botón toggle interactivo con iconos de sol/luna para alternar entre modo oscuro y claro.
  - Botón directo para contacto por correo institucional.
- **Tareas y Commits:**
  1. `feat(navbar): implement institutional header with SENA brand badges`
  2. `feat(theme): implement dark and light mode toggle with high contrast support`
  3. `style(navbar): add sticky positioning, blur effect and mobile responsiveness`

#### Historia US-04: Hero Section y Accesos Rápidos Institucionales
- **Como:** Aprendiz o visitante de la plataforma.
- **Quiero:** Conocer la presentación del docente y acceder con un solo clic a las plataformas institucionales del SENA.
- **Para:** Identificar a mi instructor y tener a la mano enlaces directos a Zajuna, SOFIA Plus, GitHub y Bibliotecas.
- **Rama Git:** `feature/US-04-hero-quicklinks`
- **Criterios de Aceptación:**
  - Hero section con saludo, rol formativo, centro y avatar del instructor.
  - Tarjeta de información docente con jornada y ambiente habitual.
  - Botones de llamada a la acción principales: `Proyectar "Clase de Hoy"` y `Ver Fichas Activas`.
  - Grid de enlaces rápidos con badges institucionales y apertura segura en nueva pestaña (`target="_blank" rel="noreferrer"`).
- **Tareas y Commits:**
  1. `feat(hero): build instructor presentation section with avatar and bio`
  2. `feat(quicklinks): create institutional shortcut cards with icons and badges`
  3. `style(hero): design gradient backgrounds and responsive layout for mobile`

---

### 🔍 Épica 3: Catálogo y Búsqueda de Fichas SENA

#### Historia US-05: Buscador Reactivo y Filtrado por Ficha
- **Como:** Aprendiz SENA.
- **Quiero:** Escribir mi número de ficha o el nombre de mi programa en un buscador instantáneo.
- **Para:** Encontrar inmediatamente el material correspondiente a mi grupo sin hacer scroll manual.
- **Rama Git:** `feature/US-05-search-filter`
- **Criterios de Aceptación:**
  - Input de búsqueda con icono de lupa y placeholder orientativo (`Buscar por Ficha o Nombre...`).
  - Filtrado en tiempo real sin recarga de página sobre el número de ficha, nombre corto y título del programa.
  - Mensaje visual claro y amigable cuando no haya coincidencias en la búsqueda.
- **Tareas y Commits:**
  1. `feat(search): implement search input with real-time filtering logic`
  2. `feat(search): add empty state feedback when no courses match query`
  3. `style(search): add focus rings and keyboard accessibility`

#### Historia US-06: Cuadrícula de Tarjetas de Cursos y Fichas Activas
- **Como:** Aprendiz o instructor.
- **Quiero:** Ver una cuadrícula de tarjetas con el número de ficha, nivel formativo, horario y estado de cada curso.
- **Para:** Reconocer de forma gráfica y rápida las fichas activas y acceder al contenido de cada una.
- **Rama Git:** `feature/US-06-course-cards`
- **Criterios de Aceptación:**
  - Grid responsivo (1 columna en móvil, 2 en tablet, 3 en pantalla de escritorio).
  - Cada tarjeta incluye banner de color distintivo, badge de nivel (Tecnólogo/Técnico) y número de ficha.
  - Datos de horario y ambiente físico/virtual claramente diferenciados con iconos.
  - Indicador animado de estado (`En curso` con pulso verde activo).
  - Botón `Ver Contenido` que abre el visor detallado.
- **Tareas y Commits:**
  1. `feat(cards): implement CourseCard component with gradient banners and badges`
  2. `feat(cards): display schedule, classroom location and status pulse`
  3. `style(cards): add hover elevation effects and smooth transitions`

---

### 📖 Épica 4: Visor Pedagógico de Contenidos (Modal / Drawer)

#### Historia US-07: Visor de Unidades, Lecciones y Previsualizador de Código
- **Como:** Aprendiz SENA.
- **Quiero:** Navegar por las unidades formativas, acceder a los enlaces de diapositivas y previsualizar fragmentos de código de ejemplo.
- **Para:** Repasar las lecciones vistas en clase y estudiar los conceptos técnicos tratados.
- **Rama Git:** `feature/US-07-course-viewer-units`
- **Criterios de Aceptación:**
  - Modal o drawer superpuesto con animación suave y cierre mediante botón `X` o clic exterior.
  - Pestaña de `Unidades y Lecciones` que lista módulos y temas con su respectiva duración estimada.
  - Enlaces directos a diapositivas y presentaciones externas.
  - Modal secundario con bloque de código fuente monoespaciado y botón para copiar o inspeccionar.
- **Tareas y Commits:**
  1. `feat(modal): create CourseViewerModal container with tab navigation`
  2. `feat(units): render modules and lesson list with slide URLs`
  3. `feat(code): implement CodePreviewModal for sample code snippets`

#### Historia US-08: Gestión de Guías de Aprendizaje y Actividades
- **Como:** Aprendiz SENA.
- **Quiero:** Consultar las evidencias y talleres pendientes con su código de competencia, fecha límite e instrucciones de entrega.
- **Para:** Elaborar mis evidencias a tiempo y enviarlas por los canales oficiales establecidos por la institución.
- **Rama Git:** `feature/US-08-activities-guides`
- **Criterios de Aceptación:**
  - Pestaña `Guías y Actividades` que muestra código oficial de la evidencia (ej. `GA3-220501093-AA1-EV01`).
  - Badge destacado con la fecha límite de entrega de cada taller.
  - Cuadro informativo con instrucciones precisas sobre la entrega institucional en Zajuna.
  - Botón para descarga de guías en formato PDF cuando esté disponible.
- **Tareas y Commits:**
  1. `feat(activities): build activity list with official SENA competency codes`
  2. `feat(activities): add due date countdown badges and delivery guidelines`
  3. `feat(activities): include downloadable PDF guides integration`

#### Historia US-09: Cronograma Semanal y Seguimiento de Hitos
- **Como:** Aprendiz e instructor.
- **Quiero:** Visualizar la distribución temporal del curso semana a semana con sus hitos clave.
- **Para:** Llevar un control transparente del progreso del trimestre formativo y anticipar las entregas.
- **Rama Git:** `feature/US-09-course-schedule`
- **Criterios de Aceptación:**
  - Pestaña `Cronograma` con línea temporal ordenada por número de semana (S1, S2, etc.).
  - Visualización del rango de fechas, tema central e hito/entregable asociado a cada semana.
  - Estilos adaptados tanto para modo claro como para modo oscuro.
- **Tareas y Commits:**
  1. `feat(schedule): implement weekly timeline view with milestone badges`
  2. `style(schedule): polish timeline cards with dark and light mode contrast`

---

### 📽 Épica 5: Herramientas de Proyección en Aula y Despliegue

#### Historia US-10: Modal "Clase de Hoy" para Proyección en Aula
- **Como:** Instructor al iniciar una jornada formativa.
- **Quiero:** Hacer clic en un botón destacado para proyectar en pantalla grande el tema y objetivo de la sesión de hoy.
- **Para:** Que los aprendices al ingresar al aula vean inmediatamente el objetivo de la clase sin perder tiempo navegando.
- **Rama Git:** `feature/US-10-classroom-today-modal`
- **Criterios de Aceptación:**
  - Botón prominente en el Hero con icono y texto `Proyectar "Clase de Hoy"`.
  - Modal de alto impacto visual con tipografía grande y legible desde cualquier punto del aula.
  - Indicación de ficha, tema en desarrollo, ambiente físico y horario.
  - Botón directo para pasar de la vista rápida de hoy al visor temático completo.
- **Tareas y Commits:**
  1. `feat(classroom): build TodayClassModal with projector-optimized typography`
  2. `feat(classroom): link today class quick action with selected course content`
  3. `style(classroom): apply high contrast colors for projector readability`

#### Historia US-11: Optimización Responsiva y Despliegue en Producción
- **Como:** Usuario de la plataforma (aprendiz o docente).
- **Quiero:** Acceder fluidamente desde cualquier smartphone o computadora y disponer de una URL pública y estable.
- **Para:** Consultar el material formativo en cualquier momento con disponibilidad 24/7 y costo cero.
- **Rama Git:** `feature/US-11-optimization-deployment`
- **Criterios de Aceptación:**
  - Interfaz 100% responsiva probada en pantallas móviles, tablets y monitores/proyectores.
  - Bundle de producción optimizado mediante `npm run build` sin errores ni advertencias críticas.
  - Despliegue automático configurado en Vercel o GitHub Pages con certificado SSL activado.
- **Tareas y Commits:**
  1. `chore(a11y): optimize font scaling, aria labels and keyboard navigation`
  2. `chore(build): optimize Vite production bundle and assets`
  3. `docs(deploy): finalize deployment configuration and live URL instructions`

---

## 🚀 Guía de Inicio y Ejecución Local

### 1. Requisitos Previos
- **Node.js**: Versión 18 o superior.
- **npm** o **pnpm**.

### 2. Pasos de Instalación
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible de inmediato en `http://localhost:5173`.

### 3. ¿Cómo agregar o editar una Ficha SENA?
No necesitas tocar la lógica de los componentes. Simplemente abre `src/data/courses.ts` y añade un nuevo objeto al arreglo `COURSES_DATA`:
- Define el número de ficha, programa y ambiente.
- Agrega las unidades con sus respectivas lecciones y diapositivas.
- Agrega las actividades con sus fechas de entrega y enlaces a guías.

---

## 🌐 Guía de Despliegue Gratuito

### Opción A: Despliegue en Vercel (Recomendado - 2 minutos)
1. Sube tu código a un repositorio en **GitHub**.
2. Ingresa a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Selecciona **"Add New" ➔ "Project"** e importa tu repositorio.
4. Vercel detectará la configuración de **Vite** automáticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en **"Deploy"**. Tu portal quedará publicado con dominio gratuito `https://tu-portal.vercel.app` y certificado SSL automático.

### Opción B: Despliegue en GitHub Pages
1. Instala el paquete de GitHub Pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. En `vite.config.ts`, define la ruta base correspondiente a tu repositorio:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/nombre-del-repositorio/',
   });
   ```
3. Añade los scripts en tu `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Ejecuta:
   ```bash
   npm run deploy
   ```
