/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Custom hook managing the state, file parsing, validation, and Cloud Firestore
 * persistence for uploading new session materials.
 */
import { useState, useEffect, useCallback } from 'react';
import { useServices } from '../context/ServiceContext';
import {
  readFileContent,
  inferMaterialTypeFromFile
} from '../utils/fileReaderUtil';

export function useMaterialUpload({
  courses = [],
  defaultCourseId = '',
  defaultSessionId = '',
  onSuccess
} = {}) {
  const { firestoreRepository } = useServices();

  const [selectedCourseId, setSelectedCourseId] = useState(
    defaultCourseId || courses[0]?.id || 'alfabetizacion-digital'
  );
  const [selectedSessionId, setSelectedSessionId] = useState(
    defaultSessionId || 'sesion-1'
  );
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'link'
  const [materialName, setMaterialName] = useState('');
  const [materialType, setMaterialType] = useState('pdf');
  const [filePayload, setFilePayload] = useState(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultCourseId) setSelectedCourseId(defaultCourseId);
  }, [defaultCourseId]);

  useEffect(() => {
    if (defaultSessionId) setSelectedSessionId(defaultSessionId);
  }, [defaultSessionId]);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const availableSessions = currentCourse?.sessions || [];

  useEffect(() => {
    if (
      availableSessions.length > 0 &&
      !availableSessions.some((s) => s.id === selectedSessionId)
    ) {
      setSelectedSessionId(availableSessions[0].id);
    }
  }, [availableSessions, selectedSessionId]);

  const handleFileSelect = useCallback(
    async (file) => {
      if (!file) return;
      setError('');
      setIsReadingFile(true);
      try {
        const inferredType = inferMaterialTypeFromFile(file);
        setMaterialType(inferredType);

        if (!materialName.trim()) {
          const cleanTitle = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[_-]+/g, ' ');
          setMaterialName(cleanTitle);
        }

        const payload = await readFileContent(file);
        setFilePayload(payload);
      } catch (err) {
        setError(err?.message || 'Error al leer el archivo seleccionado.');
      } finally {
        setIsReadingFile(false);
      }
    },
    [materialName]
  );

  const resetForm = useCallback(() => {
    setMaterialName('');
    setMaterialType('pdf');
    setFilePayload(null);
    setExternalUrl('');
    setError('');
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      setError('');

      if (!selectedCourseId || !selectedSessionId) {
        setError('Selecciona un curso y una sesión de destino.');
        return;
      }

      if (!materialName.trim()) {
        setError('Ingresa el título o nombre descriptivo del material.');
        return;
      }

      if (uploadMode === 'file' && !filePayload) {
        setError('Selecciona un archivo PDF, guía HTML o documento desde tu equipo.');
        return;
      }

      if (uploadMode === 'link' && !externalUrl.trim()) {
        setError('Ingresa la dirección URL del recurso o documento.');
        return;
      }

      setIsSubmitting(true);
      try {
        const result = await firestoreRepository.uploadMaterialToSession({
          courseId: selectedCourseId,
          sessionId: selectedSessionId,
          name: materialName.trim(),
          type: uploadMode === 'link' ? 'link' : materialType,
          mimeType: filePayload?.mimeType || 'application/pdf',
          content: filePayload?.content || '',
          fileName: filePayload?.fileName || '',
          fileSize: filePayload?.fileSize || 0,
          externalUrl: uploadMode === 'link' ? externalUrl.trim() : '',
          activateCourse: true
        });

        resetForm();
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err) {
        console.error('Error uploading material to Firestore:', err);
        setError(
          err?.message?.includes('PERMISSION_DENIED')
            ? 'Permiso denegado en Firestore: verifica que las reglas de Firestore permitan escritura.'
            : err?.message || 'No se pudo guardar el material en Cloud Firestore.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      selectedCourseId,
      selectedSessionId,
      materialName,
      uploadMode,
      filePayload,
      externalUrl,
      materialType,
      firestoreRepository,
      resetForm,
      onSuccess
    ]
  );

  return {
    selectedCourseId,
    setSelectedCourseId,
    selectedSessionId,
    setSelectedSessionId,
    availableSessions,
    uploadMode,
    setUploadMode,
    materialName,
    setMaterialName,
    materialType,
    setMaterialType,
    filePayload,
    setFilePayload,
    externalUrl,
    setExternalUrl,
    isReadingFile,
    isSubmitting,
    error,
    handleFileSelect,
    handleSubmit,
    resetForm
  };
}
