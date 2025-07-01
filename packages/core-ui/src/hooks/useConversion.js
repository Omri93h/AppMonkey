import axios from 'axios';

export async function convertPdfToDocx(file) {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axios.post('/api/pdf-to-docx', form, { responseType: 'blob' });
  return new File([data], file.name.replace(/\\.pdf$/i, '.docx'), { type: data.type });
}

export async function convertDocxToPdf(file) {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axios.post('/api/docx-to-pdf', form, { responseType: 'blob' });
  return new File([data], file.name.replace(/\\.docx$/i, '.pdf'), { type: data.type });
}

export async function convertPdfToText(file) {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axios.post('/api/pdf-to-text', form, { responseType: 'json' });
  return data.text;
}
