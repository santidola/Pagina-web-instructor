/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Cloud Firestore Repository using Firebase Modular SDK v10+.
 * Provides data access and upload methods for all 6 Firestore collections:
 * - courses
 * - session_materials (printable PDFs / guides stored directly in the database, with automatic chunking for >700KB PDFs)
 * - learning_guides
 * - glossary_terms
 * - checklist_items
 * - portal_resources
 */
import { db } from '../config/firebaseConfig.js';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { COURSES_DATA } from '../data/coursesData.js';
import { SESSION_MATERIALS_DATA } from '../data/materialsData.js';
import { GUIDE_DATA } from '../data/guideData.js';
import { GLOSSARY_TERMS, BIBLIOGRAPHIC_REFERENCES, SENA_PLATFORMS } from '../data/glossaryData.js';
import { CLASS_CHECKLIST_ITEMS } from '../data/checklistData.js';

const MAX_SINGLE_DOC_CONTENT_LENGTH = 700000; // ~700 KB safe threshold under Firestore's 1 MB limit

export const FirestoreCourseRepository = {
  /**
   * Obtener todos los cursos desde la colección 'courses' en Cloud Firestore.
   */
  async getAllCourses() {
    const snapshot = await getDocs(collection(db, 'courses'));
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return docs.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  /**
   * Obtener un curso por ID (slug) desde la colección 'courses' en Cloud Firestore.
   */
  async getCourseById(id) {
    const snap = await getDoc(doc(db, 'courses', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  /**
   * Guardar o actualizar un curso en la colección 'courses'.
   */
  async saveCourse(course) {
    const courseId = course.id || course.slug;
    if (!courseId) {
      throw new Error('Course must have an id or slug');
    }
    const docRef = doc(db, 'courses', courseId);
    await setDoc(docRef, {
      ...course,
      id: courseId,
      updatedAt: new Date().toISOString()
    });
  },

  /**
   * Obtener un documento de material / PDF desde la colección 'session_materials'.
   * Si el archivo fue fragmentado en chunks (>700 KB), los reensambla automáticamente.
   */
  async getMaterialById(materialId) {
    const snap = await getDoc(doc(db, 'session_materials', materialId));
    if (!snap.exists()) return null;

    const data = { id: snap.id, ...snap.data() };
    if (data.isChunked) {
      const chunksSnap = await getDocs(collection(db, 'session_materials', materialId, 'chunks'));
      const sortedChunks = chunksSnap.docs
        .map((d) => d.data())
        .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
      data.content = sortedChunks.map((c) => c.data).join('');
    }
    return data;
  },

  /**
   * Guardar o subir un PDF / guía directamente en la colección 'session_materials' de Firestore.
   * Soporta PDFs grandes dividiendo automáticamente el contenido en fragmentos de 700 KB.
   */
  async saveMaterial(material) {
    const materialId = material.id || material.materialId;
    if (!materialId) {
      throw new Error('Material must have an id');
    }

    const rawContent = material.content || '';
    const isChunked = rawContent.length > MAX_SINGLE_DOC_CONTENT_LENGTH;
    const timestamp = new Date().toISOString();
    const docRef = doc(db, 'session_materials', materialId);

    if (!isChunked) {
      await setDoc(docRef, {
        ...material,
        id: materialId,
        isChunked: false,
        updatedAt: timestamp
      });
      return materialId;
    }

    // Fragmentar contenido para archivos PDF mayores a 700 KB
    const chunks = [];
    for (let i = 0; i < rawContent.length; i += MAX_SINGLE_DOC_CONTENT_LENGTH) {
      chunks.push(rawContent.slice(i, i + MAX_SINGLE_DOC_CONTENT_LENGTH));
    }

    await setDoc(docRef, {
      ...material,
      id: materialId,
      content: '',
      isChunked: true,
      chunksCount: chunks.length,
      updatedAt: timestamp
    });

    for (let i = 0; i < chunks.length; i++) {
      const chunkRef = doc(db, 'session_materials', materialId, 'chunks', `chunk_${i}`);
      await setDoc(chunkRef, {
        index: i,
        data: chunks[i]
      });
    }

    return materialId;
  },

  /**
   * Subir un nuevo material (archivo PDF, HTML, documento o enlace) y asociarlo
   * a una sesión de un curso en Cloud Firestore.
   */
  async uploadMaterialToSession({
    courseId,
    sessionId,
    name,
    type = 'pdf',
    mimeType = 'application/pdf',
    content = '',
    fileName = '',
    fileSize = 0,
    externalUrl = '',
    activateCourse = true
  }) {
    const course = await this.getCourseById(courseId);
    if (!course) {
      throw new Error(`No se encontró el curso '${courseId}' en Firestore.`);
    }

    let newMaterialItem;

    if (type === 'link' || externalUrl) {
      newMaterialItem = {
        name: name.trim(),
        type: 'link',
        path: externalUrl.trim(),
        available: true
      };
    } else {
      const slugBase = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 32);

      const materialId = `${courseId}-${sessionId}-${slugBase}-${Date.now().toString().slice(-5)}`;

      await this.saveMaterial({
        id: materialId,
        courseId,
        sessionId,
        name: name.trim(),
        type,
        mimeType,
        fileName,
        fileSize,
        content,
        available: true
      });

      newMaterialItem = {
        materialId,
        name: name.trim(),
        type,
        fileName,
        available: true
      };
    }

    const updatedSessions = (course.sessions || []).map((session) => {
      if (session.id !== sessionId) return session;
      return {
        ...session,
        materials: [...(session.materials || []), newMaterialItem]
      };
    });

    const updatedCourse = {
      ...course,
      sessions: updatedSessions,
      ...(activateCourse && course.status !== 'Activo'
        ? {
            status: 'Activo',
            badgeText: `En Formación · ${course.hoursNumber || 40}h`,
            badgeType: 'badge-green'
          }
        : {})
    };

    await this.saveCourse(updatedCourse);
    return { updatedCourse, addedMaterial: newMaterialItem };
  },

  /**
   * Eliminar un material de una sesión y de la colección 'session_materials'.
   */
  async deleteMaterialFromSession({ courseId, sessionId, materialId, materialIndex }) {
    const course = await this.getCourseById(courseId);
    if (!course) return null;

    const updatedSessions = (course.sessions || []).map((session) => {
      if (session.id !== sessionId) return session;
      const nextMaterials = (session.materials || []).filter((m, idx) => {
        if (materialId && m.materialId === materialId) return false;
        return idx !== materialIndex;
      });
      return {
        ...session,
        materials: nextMaterials
      };
    });

    const updatedCourse = {
      ...course,
      sessions: updatedSessions
    };

    await this.saveCourse(updatedCourse);

    if (materialId) {
      try {
        await deleteDoc(doc(db, 'session_materials', materialId));
      } catch (err) {
        console.warn('Could not delete material doc from session_materials:', err);
      }
    }

    return updatedCourse;
  },

  /**
   * Obtener la Guía de Aprendizaje Oficial desde la colección 'learning_guides'.
   */
  async getLearningGuide(guideId = 'gfpi-f-135-alfabetizacion') {
    const snap = await getDoc(doc(db, 'learning_guides', guideId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  /**
   * Obtener todos los términos del glosario desde la colección 'glossary_terms'.
   */
  async getGlossaryTerms() {
    const snapshot = await getDocs(collection(db, 'glossary_terms'));
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  /**
   * Obtener las actividades del checklist de aula desde la colección 'checklist_items'.
   */
  async getChecklistItems() {
    const snapshot = await getDocs(collection(db, 'checklist_items'));
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  /**
   * Obtener los referentes bibliográficos y plataformas institucionales desde 'portal_resources'.
   */
  async getPortalResources(resourceId = 'sena-official-links') {
    const snap = await getDoc(doc(db, 'portal_resources', resourceId));
    return snap.exists()
      ? { id: snap.id, ...snap.data() }
      : { bibliographicReferences: [], senaPlatforms: [] };
  },

  /**
   * Poblar datos iniciales completos del portal usando writeBatch atómico.
   */
  async seedInitialData() {
    const batch = writeBatch(db);
    const timestamp = new Date().toISOString();

    // 1. Cursos completos (Colección: courses)
    COURSES_DATA.forEach((course, index) => {
      const courseRef = doc(db, 'courses', course.id);
      batch.set(courseRef, {
        ...course,
        order: index + 1,
        updatedAt: timestamp
      });
    });

    // 2. Materiales y Guías Imprimibles / PDF (Colección: session_materials)
    SESSION_MATERIALS_DATA.forEach((material) => {
      const materialRef = doc(db, 'session_materials', material.id);
      batch.set(materialRef, {
        ...material,
        updatedAt: timestamp
      });
    });

    // 3. Guía de Aprendizaje Oficial GFPI-F-135 (Colección: learning_guides)
    const guideRef = doc(db, 'learning_guides', 'gfpi-f-135-alfabetizacion');
    batch.set(guideRef, {
      ...GUIDE_DATA,
      courseId: 'alfabetizacion-digital',
      updatedAt: timestamp
    });

    // 4. Glosario Oficial de 15 términos (Colección: glossary_terms)
    GLOSSARY_TERMS.forEach((item, index) => {
      const glossaryRef = doc(db, 'glossary_terms', item.id);
      batch.set(glossaryRef, {
        ...item,
        order: index + 1,
        updatedAt: timestamp
      });
    });

    // 5. Checklist de Aula Activa (Colección: checklist_items)
    CLASS_CHECKLIST_ITEMS.forEach((item, index) => {
      const checklistRef = doc(db, 'checklist_items', item.id);
      batch.set(checklistRef, {
        ...item,
        order: index + 1
      });
    });

    // 6. Referentes Bibliográficos y Plataformas SENA (Colección: portal_resources)
    const resourcesRef = doc(db, 'portal_resources', 'sena-official-links');
    batch.set(resourcesRef, {
      bibliographicReferences: BIBLIOGRAPHIC_REFERENCES,
      senaPlatforms: SENA_PLATFORMS,
      updatedAt: timestamp
    });

    await batch.commit();
    return {
      coursesCount: COURSES_DATA.length,
      materialsCount: SESSION_MATERIALS_DATA.length,
      glossaryCount: GLOSSARY_TERMS.length,
      checklistCount: CLASS_CHECKLIST_ITEMS.length
    };
  }
};

export function createFirestoreCourseRepository() {
  return FirestoreCourseRepository;
}
