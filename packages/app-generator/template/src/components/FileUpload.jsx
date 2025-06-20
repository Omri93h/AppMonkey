import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from 'core-ui/components/LoadingSpinner';
import { Check, X } from 'lucide-react';

const FileUpload = ({ endpoint }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [resultMap, setResultMap] = useState({});
  const location = useLocation();

  useEffect(() => {
    setFiles([]);
    setStatusMap({});
    setResultMap({});
  }, [location.pathname]);

  const addFiles = newFiles => {
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...newFiles.filter(f => !names.has(f.name))];
    });
  };

  const onFilesSelected = e => addFiles(Array.from(e.target.files));
  const onDrop = e => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files)); };

  const convertSingle = async file => {
    const key = file.name;
    setStatusMap(prev => ({ ...prev, [key]: 'loading' }));
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultMap(prev => ({ ...prev, [key]: url }));
      setStatusMap(prev => ({ ...prev, [key]: 'success' }));
    } catch {
      setStatusMap(prev => ({ ...prev, [key]: 'error' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
        className="w-full h-80 border-4 border-dashed p-6 cursor-pointer rounded-lg flex items-center justify-center mb-6"
      >
        <input type="file" ref={inputRef} multiple onChange={onFilesSelected} className="hidden" />
        <p className="text-gray-600 text-center">
          Drag & drop files here, or click to select
        </p>
      </div>

      {files.map(file => {
        const status = statusMap[file.name];
        const url = resultMap[file.name];
        const isLoading = status === 'loading';
        const isSuccess = status === 'success';
        const isError = status === 'error';

        return (
          <div key={file.name} className="grid grid-cols-3 gap-4 items-center p-2 border-b">
            <span className="truncate">{file.name}</span>
            <button
              onClick={() => convertSingle(file)}
              disabled={isLoading || isSuccess}
              className="w-full px-2 py-1 bg-blue-600 text-white rounded disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading
                ? <LoadingSpinner />
                : isSuccess
                ? <Check />
                : isError
                ? <X className="text-red-500" />
                : 'Convert'}
            </button>
            <a
              href={url || '#'}
              download
              className={
                "w-full text-center block px-2 py-1 bg-green-600 text-white rounded " +
                (url ? "" : "pointer-events-none opacity-50")
              }
            >
              Download
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default FileUpload;
