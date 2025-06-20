import React from 'react';

export default function DownloadLink({ url, filename }) {
  return (
    <a
      href={url}
      download={filename}
      className={`h-8 w-24 bg-green-600 text-white rounded flex items-center justify-center ${!url ? 'opacity-50 pointer-events-none' : ''}`}
    >
      Download
    </a>
  );
}
