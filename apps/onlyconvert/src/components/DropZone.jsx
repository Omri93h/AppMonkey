import React, { useRef } from 'react';

export default function DropZone({ onFiles, allowedExts = [] }) {
  const inputRef = useRef();

  // PDF route: only .pdf; DOCX route: only .docx
  const acceptAttr = allowedExts.includes('.pdf')
    ? '.pdf,application/pdf'
    : '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const handleFiles = filesArr => {
    const filtered = filesArr.filter(file =>
      allowedExts.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    onFiles(filtered);
  };

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        handleFiles(Array.from(e.dataTransfer.files));
      }}
      onClick={() => inputRef.current.click()}
      className="cursor-pointer w-full h-80 border-4 border-dashed flex items-center justify-center mb-6"
    >
      <input
        type="file"
        ref={inputRef}
        multiple
        accept={acceptAttr}
        onChange={e => handleFiles(Array.from(e.target.files))}
        className="hidden"
      />
      <p className="text-gray-600 text-center">
        Drag & drop files here, or click to select
      </p>
    </div>
  );
}
