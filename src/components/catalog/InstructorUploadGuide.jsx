/**
 * Single Responsibility Principle (SRP):
 * Renders the instructional card explaining how to add new courses and session materials.
 */
import React from 'react';

export function InstructorUploadGuide() {
  return (
    <div className="instructor-upload-guide-card animate-on-scroll">
      <div className="upload-guide-icon">📂</div>
      <div className="upload-guide-content">
        <h3>¿Cómo agregar un nuevo curso o subir materiales de sesión?</h3>
        <p>
          El sistema ya está desacoplado y listo para recibir más cursos. Cuando tengas el material de una nueva
          formación o sesión, sólo debes seguir estos pasos:
        </p>
        <div className="upload-guide-steps">
          <span className="upload-step-pill">1. Pásame el nombre y las sesiones del curso</span>
          <span className="upload-step-pill">
            2. Sube tus archivos a la carpeta <code>public/materiales/[curso]/sesion-X/</code>
          </span>
          <span className="upload-step-pill">3. Quedará publicado y enlazado automáticamente</span>
        </div>
      </div>
    </div>
  );
}
