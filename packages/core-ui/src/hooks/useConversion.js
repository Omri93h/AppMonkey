import { useState } from 'react';

export default function useConversion(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function convert(file) {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = import.meta.env.VITE_API_URL + '/convert/' + endpoint;
      const response = await fetch(url, { method: 'POST', body: formData });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.detail || 'Conversion failed');
      }
      const blob = await response.blob();
      const disposition = response.headers.get('Content-Disposition');
      const match = disposition && disposition.match(/filename="([^"]+)"/);
      const filename = match ? match[1] : 'result';
      const urlObject = URL.createObjectURL(blob);
      setResult({ url: urlObject, filename });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { convert, loading, error, result };
}
