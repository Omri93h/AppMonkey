import React from 'react';

export default function Help() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Help</h1>
      <p className="mb-4">
        To use {import.meta.env.VITE_APP_TITLE}, select a converter from the menu above, upload your file, click <strong>Convert</strong>, then download the result.
      </p>
      <p>
        If you need further assistance, contact us at <a href="mailto:support@onlyconvert.com" className="text-blue-600 underline">support@onlyconvert.com</a>.
      </p>
    </main>
  );
}
