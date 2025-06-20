export async function convertPdfToDocx(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(import.meta.env.VITE_API_URL + '/convert/pdf-to-docx', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('PDF→DOCX conversion failed');
  const disp = res.headers.get('content-disposition') || '';
  let filename = file.name.replace(/\\.pdf$/i, '.docx');
  const m = disp.match(/filename="?(.+)"?/);
  if (m) filename = m[1];
  const blob = await res.blob();
  return { blob, filename };
}

export async function convertDocxToPdf(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(import.meta.env.VITE_API_URL + '/convert/docx-to-pdf', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('DOCX→PDF conversion failed');
  const disp = res.headers.get('content-disposition') || '';
  let filename = file.name.replace(/\\.docx$/i, '.pdf');
  const m = disp.match(/filename="?(.+)"?/);
  if (m) filename = m[1];
  const blob = await res.blob();
  return { blob, filename };
}
