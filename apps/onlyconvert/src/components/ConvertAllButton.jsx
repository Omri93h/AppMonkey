import React from 'react';

export default function ConvertAllButton({ onClick, disabled }) {
  return (<div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-32 bg-blue-600 text-white rounded flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
    >
      Convert All
    </button>
  </div>
  );
}
