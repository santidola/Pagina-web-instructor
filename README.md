# 🎓 Portal del Instructor SENA — React + Principios SOLID

>Aplicación web educativa desarrollada en **React 18 + Vite** bajo principios de arquitectura limpia y **SOLID** para el Portal del Instructor SENA y el programa **"Alfabetización Informática"** (Código 22810239 – Versión 1).

---

## 🏗️ Arquitectura React basada en Principios SOLID

| Principio | Implementación en el Proyecto |
|---|---|
| **S — Single Responsibility (SRP)** | Separación estricta entre datos de dominio (`src/data/`), servicios de negocio (`src/services/`), estado reactivo (`src/hooks/`), componentes de presentación (`src/components/`) y páginas (`src/pages/`). |
| **O — Open/Closed (OCP)** | `SimulatorRegistry.jsx` y `materialMetadataService.js` utilizan mapas declarativos de estrategias. Se pueden agregar nuevos simuladores interactivos o tipos de materiales sin modificar `SessionPanel` ni `CoursePage`. |
| **L — Liskov Substitution (LSP)** | Todos los simuladores registrados en `SimulatorRegistry` cumplen un contrato uniforme `({ session, course }) => JSX.Element`, siendo intercambiables de manera transparente. |
| **I — Interface Segregation (ISP)** | Componentes atómicos como `MaterialCardItem`, `CatalogControls` y `CourseCard` reciben únicamente las propiedades específicas que necesitan, sin acoplarse a objetos globales. |
| **D — Dependency Inversion (DIP)** | `ServiceContext.jsx` inyecta abstracciones (`courseRepository`, `storageService`, `materialMetadataService`, `aiAssistantService`) para desacoplar los componentes y hooks de implementaciones concretas como `window.localStorage`. |

---

## 📂 Estructura del Proyecto

```text
Pagina-web-instructor/
├── public/
│   ├── img/logo-sena.svg          # Logo oficial SENA
│   └── materiales/                # Guías y hojas de trabajo interactivas por sesión
├── src/
│   ├── components/
│   │   ├── catalog/               # HeroSection, CatalogControls, CourseCard, ClassChecklist
│   │   ├── course/                # CourseHeroBanner, SessionPanel, SessionMaterialsCard, MaterialCardItem
│   │   ├── layout/                # Navbar, Footer, MainLayout
│   │   └── simulators/            # SimulatorRegistry y 5 laboratorios interactivos
│   ├── context/
│   │   └── ServiceContext.jsx     # Inyección de dependencias (DIP)
│   ├── data/                      # Datos modulares de cursos, guía GFPI-F-135, glosario y simuladores
│   ├── hooks/                     # Custom hooks (useCourseCatalog, useChecklistProgress, useGlossarySearch, useFullscreen)
│   ├── pages/                     # HomePage, CoursePage, GuidePage, GlossaryPage
│   ├── services/                  # courseRepository, storageService, materialMetadataService, aiAssistantService
│   ├── styles/index.css           # Hoja de estilos institucional SENA modernizada
│   ├── App.jsx                    # Configuración de rutas (React Router v6)
│   └── main.jsx                   # Punto de entrada React
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Comandos de Desarrollo y Producción

```powershell
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción (carpeta dist/)
npm run build
```
