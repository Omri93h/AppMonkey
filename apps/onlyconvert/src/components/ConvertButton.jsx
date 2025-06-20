import React from 'react';
import LoadingSpinner from 'core-ui/components/LoadingSpinner';

export default function ConvertButton({ status, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={status==='loading'||status==='success'}
      className="h-8 w-24 bg-blue-600 text-white rounded disabled:opacity-50 flex items-center justify-center"
    >
      {status==='loading'
        ? <LoadingSpinner className="w-4 h-4 text-white" />
        : status==='success'
        ? '✅'
        : 'Convert'}
    </button>
  );
}
