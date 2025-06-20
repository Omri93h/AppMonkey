import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { notifySuccess, notifyError } from './NotificationProvider';
import DropZone from './DropZone';
import ConvertAllButton from './ConvertAllButton';
import DownloadAllButton from './DownloadAllButton';
import FileItem from './FileItem';

export default function FileUpload({ convertFn, outputExt }) {
  const loc = useLocation();
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});
  const [results, setResults] = useState({});
  const [names, setNames] = useState({});

  useEffect(() => {
    setFiles([]);
    setStatus({});
    setResults({});
    setNames({});
  }, [loc.pathname]);

  const pathSegment = loc.pathname.split('/')[1] || '';
  const inputType = pathSegment.split('-')[0] || '';
  const allowedExts = ['.' + inputType];

  const addFiles = incoming => {
    const filtered = incoming.filter(f =>
      allowedExts.some(ext => f.name.toLowerCase().endsWith(ext))
    );
    setFiles(prev => Array.from(new Set([...prev, ...filtered])));
  };

  const handleConvert = async file => {
    setStatus(s => ({ ...s, [file.name]: 'loading' }));
    try {
      const { blob } = await convertFn(file);
      const url = URL.createObjectURL(blob);
      setResults(r => ({ ...r, [file.name]: url }));
      const index = files.indexOf(file) + 1;
      const filename = 'OnlyConvert-com-' + index + outputExt;
      setNames(n => ({ ...n, [file.name]: filename }));
      setStatus(s => ({ ...s, [file.name]: 'success' }));
      notifySuccess(file.name + ' -> ' + filename);
    } catch {
      setStatus(s => ({ ...s, [file.name]: 'error' }));
      notifyError(file.name + ' failed to convert');
    }
  };

  const allDone =
    files.length > 0 &&
    files.every(f => ['success', 'error'].includes(status[f.name]));

  return (
    <div className="max-w-3xl mx-auto">
      <DropZone onFiles={addFiles} allowedExts={allowedExts} />
      {files.length > 0 && (
        <>
          <ConvertAllButton
            onClick={() => files.forEach(handleConvert)}
            disabled={files.every(f => ['loading', 'success'].includes(status[f.name]))}
          />
          <DownloadAllButton
            files={files}
            results={results}
            names={names}
            disabled={!allDone}
          />
        </>
      )}
      {files.map(file => (
        <FileItem
          key={file.name}
          file={file}
          status={status[file.name]}
          url={results[file.name]}
          downloadName={names[file.name]}
          onConvert={handleConvert}
        />
      ))}
    </div>
  );
}
