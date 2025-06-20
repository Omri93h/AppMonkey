// core-ui/src/hooks/useConversion.js
const API = import.meta.env.VITE_API_URL;

async function extractFilename(res) {
  const disp = res.headers.get('content-disposition') || '';
  const match = /filename="?(.+?)"?($|;)/i.exec(disp);
  return match ? match[1] : '';
}

export async function convertPdfToDocx(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(\`\${API}/convert/pdf-to-docx\`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Conversion failed');
  const blob = await res.blob();
  const ext = '.docx';
  let filename = await extractFilename(res);
  if (!filename.toLowerCase().endsWith(ext)) {
    filename = file.name.replace(/\\.pdf$/i, ext);
  }
  return { blob, filename };
}

export async function convertDocxToPdf(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(\`\${API}/convert/docx-to-pdf\`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Conversion failed');
  const blob = await res.blob();
  const ext = '.pdf';
  let filename = await extractFilename(res);
  if (!filename.toLowerCase().endsWith(ext)) {
    filename = file.name.replace(/\\.docx$/i, ext);
  }
  return { blob, filename };
}
