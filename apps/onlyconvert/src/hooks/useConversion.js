import { useState } from 'react';
const baseUrl = import.meta.env.VITE_API_URL || '';

export function useConversion(endpoint) {
  const [progressMap, setProgressMap] = useState({});
  const [resultMap, setResultMap] = useState({});

  const convert = async (files) => {
    const updatedProgress = {};
    const updatedResults = {};

    for (const file of files) {
      updatedProgress[file.name] = 0;
      setProgressMap({ ...updatedProgress });

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error();
        const blob = await response.blob();
        updatedResults[file.name] = URL.createObjectURL(blob);
        updatedProgress[file.name] = 100;
      } catch {
        updatedProgress[file.name] = -1;
      }

      setProgressMap({ ...updatedProgress });
      setResultMap({ ...updatedResults });
    }
  };

  return { convert, progressMap, resultMap };
}
