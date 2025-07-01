import React from 'react';

export default function TermsOfService() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Service is provided “as is” without warranty.</li>
        <li>By using this service, you agree not to upload infringing content.</li>
        <li>We reserve the right to modify or discontinue the service at any time.</li>
        <li>All disputes are governed by applicable law.</li>
      </ol>
    </main>
  );
}
