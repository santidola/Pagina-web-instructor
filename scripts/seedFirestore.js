/**
 * Script de terminal para subir todas las colecciones (incluyendo session_materials) a Cloud Firestore
 * Uso: npm run seed
 */
import { FirestoreCourseRepository } from '../src/services/FirestoreCourseRepository.js';

async function runSeed() {
  console.log('🚀 Subiendo todas las colecciones y documentos PDF/Guías a Cloud Firestore...');
  const summary = await FirestoreCourseRepository.seedInitialData();
  console.log('✅ ¡ÉXITO! Se crearon y poblaron las 6 colecciones en Cloud Firestore:');
  console.log(`   - courses (${summary.coursesCount} documentos)`);
  console.log(`   - session_materials (${summary.materialsCount} guías/PDFs almacenados directamente en Firestore)`);
  console.log('   - learning_guides (1 documento GFPI-F-135)');
  console.log(`   - glossary_terms (${summary.glossaryCount} documentos)`);
  console.log(`   - checklist_items (${summary.checklistCount} documentos)`);
  console.log('   - portal_resources (1 documento)');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Error al subir las colecciones a Firestore:', err.message);
  process.exit(1);
});
