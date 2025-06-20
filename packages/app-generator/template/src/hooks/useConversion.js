export async function convertPdfToDocx(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(\`\${import.meta.env.VITE_API_URL}/convert/pdf-to-docx\`, {
    method: 'POST',
    body: fd,
  })
  if (!res.ok) throw new Error('PDF→DOCX conversion failed')
  return await res.blob()
}

export async function convertDocxToPdf(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(\`\${import.meta.env.VITE_API_URL}/convert/docx-to-pdf\`, {
    method: 'POST',
    body: fd,
  })
  if (!res.ok) throw new Error('DOCX→PDF conversion failed')
  return await res.blob()
}
