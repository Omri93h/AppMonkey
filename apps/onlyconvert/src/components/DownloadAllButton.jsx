import React from 'react';

export default function DownloadAllButton({ files, results, names, disabled }) {
  const handleDownloadAll = () => {
    files.forEach(file => {
      const url = results[file.name];
      const filename = names[file.name];
      if (url && filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDownloadAll}
      disabled={disabled}
      className="h-8 w-32 mx-auto bg-green-600 text-white rounded flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none mt-2"
    >
      Download All
    </button>
  );
}
