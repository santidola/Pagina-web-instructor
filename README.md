# 🎓 Alfabetización Informática — Sitio Web Educativo SENA

> Sitio web institucional moderno, accesible y sereno para el programa de formación complementaria **"Alfabetización Informática"** del SENA (Código 22810239 – Versión 1).

---

## 🎨 Paleta y Diseño Institucional SENA

El diseño utiliza los colores tranquilos y profesionales del SENA:
- **Fondo Principal:** Blanco puro (`#FFFFFF`) y verde muy suave de fondo (`#F7FAF5`, `#E8F5E2`).
- **Verde Institucional SENA:** `#39A900` (con `#2E8B00` para contraste accesible).
- **Acentos:** Verde menta suave (`#A5D6A7`), bordes sutiles (`#E0E8DC`).
- **Textos:** Tono oscuro accesible (`#1B2A1B`, `#4A5D4A`) sobre fondos claros.
- **Tipografía:** Google Fonts (`Inter` para lectura ágil y `Outfit` para títulos estructurados).

---

## 📑 Vistas del Sitio (Multi-Página)

| Vista | Archivo | Descripción |
|---|---|---|
| **1. Inicio** | [`index.html`](index.html) | Presentación del curso, ficha técnica, 3 beneficios, resumen de las 5 sesiones, testimonios, CTA institucional y footer. |
| **2. Plan de Estudio** | [`programa.html`](programa.html) | Desglose completo de las **5 sesiones prácticas de apropiación (56 horas)** con RAPs, saberes conceptuales, actividades de taller y evidencias requeridas. |
| **3. Guía de Aprendizaje** | [`guia.html`](guia.html) | Documento pedagógico formal **Formato GFPI-F-135 (Versión 04)**: Ficha de identificación, presentación, los 4 momentos formativos (Reflexión 2h, Contextualización 4h, Apropiación 56h, Transferencia 8h) y matriz oficial de evaluación. |
| **4. Glosario & Recursos** | [`glosario.html`](glosario.html) | Glosario oficial con **15 términos técnicos** definidos en la guía, con **buscador interactivo en tiempo real**, referentes bibliográficos del SENA y accesos directos a SOFIA Plus, Zajuna y MiSena. |

---

## 📂 Estructura del Proyecto

```text
Pagina-web-instructor/
├── css/
│   └── styles.css        # Hoja de estilos compartida (paleta clara SENA)
├── js/
│   └── main.js           # Navbar sticky, menú móvil, modal y buscador en vivo
├── index.html            # Vista 1: Inicio / Landing
├── programa.html         # Vista 2: Plan de Estudio (5 sesiones de apropiación)
├── guia.html             # Vista 3: Guía de Aprendizaje oficial GFPI-F-135
├── glosario.html         # Vista 4: Glosario de términos con buscador en tiempo real
└── README.md             # Documentación del proyecto
```

---

## 🚀 Cómo Verlo en Local

### Opción 1: Abrir directamente en el navegador
Haz doble clic sobre cualquiera de los archivos `.html` (por ejemplo, `index.html`) o arrástralo a tu navegador web favorito (Chrome, Edge, Firefox).

### Opción 2: Servidor local ligero
En PowerShell o terminal dentro de la carpeta:

```powershell
# Con Python
python -m http.server 8080
```
Luego abre: [http://localhost:8080](http://localhost:8080)

```powershell
# O con Node.js / npx
npx serve .
```

---

## 📋 Ficha Técnica del Curso (Basada en la Guía SENA)

- **Denominación del Programa:** Alfabetización Informática
- **Código del Programa:** 22810239 – Versión 1
- **Competencia:** 220501046 – Aplicar herramientas ofimáticas, redes sociales y colaborativas de acuerdo con el proyecto a desarrollar.
- **Duración de la Guía:** 70 Horas
- **Resultados de Aprendizaje (RAP):**
  - `2205010460201` – Manejar las funcionalidades básicas de un sistema operativo.
  - `2205010460202` – Aplicar las funciones de un procesador de texto.
  - `2205010460203` – Aplicar las funciones de una hoja de cálculo.
  - `2205010460204` – Aplicar las funciones de un programa de presentaciones.
  - `2205010460101` – Utilizar los servicios de Internet de acuerdo con las necesidades.
- **Producto Integrador (Transferencia):** *"Mi Solución Digital"* (8 horas).
