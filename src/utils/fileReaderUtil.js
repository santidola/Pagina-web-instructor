/**
 * Single Responsibility Principle (SRP) & Open/Closed Principle (OCP):
 * Pure file processing utilities for reading uploaded files, inferring SENA
 * material types from extensions/MIME types, and generating Blob URLs for PDFs.
 */

const EXTENSION_TYPE_MAP = {
  pdf: 'pdf',
  html: 'pdf',
  htm: 'pdf',
  doc: 'document',
  docx: 'document',
  txt: 'document',
  xls: 'sheet',
  xlsx: 'sheet',
  csv: 'sheet',
  ppt: 'slides',
  pptx: 'slides',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  svg: 'image',
  webp: 'image'
};

export function inferMaterialTypeFromFile(file) {
  if (!file?.name) return 'pdf';
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return EXTENSION_TYPE_MAP[ext] || 'pdf';
}

export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isHtml = file.type === 'text/html' || ext === 'html' || ext === 'htm';

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo seleccionado.'));

    if (isHtml) {
      reader.onload = () =>
        resolve({
          content: reader.result,
          mimeType: 'text/html',
          fileName: file.name,
          fileSize: file.size
        });
      reader.readAsText(file, 'UTF-8');
    } else {
      reader.onload = () =>
        resolve({
          content: reader.result,
          mimeType: file.type || (ext === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
          fileName: file.name,
          fileSize: file.size
        });
      reader.readAsDataURL(file);
    }
  });
}

export function dataUrlToBlobUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return null;
  }
  try {
    const [header, base64Data] = dataUrl.split(',');
    const mimeMatch = header.match(/data:([^;]+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Error converting DataURL to Blob URL:', err);
    return null;
  }
}
