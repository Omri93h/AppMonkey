import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        {import.meta.env.VITE_APP_TITLE} respects your privacy. We collect no personal data beyond necessary cookies and logs for service functionality.
      </p>
      <p className="mb-2">
        Files you upload are stored temporarily (1 hour) and deleted automatically. We use SSL encryption in transit.
      </p>
      <p className="mb-2">
        For questions, contact <a href="mailto:support@onlyconvert.com" className="text-blue-600 underline">support@onlyconvert.com</a>.
      </p>
    </main>
  );
}
