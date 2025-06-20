import React from 'react';

const Header = ({ className = '' }) => (
  <header className={`bg-blue-600 text-white p-4 rounded ${className}`}>
    <h1 className="text-xl font-semibold text-center">{document.title}</h1>
    <nav className="space-x-4 text-center mt-2">
      <a href="/pdf-to-docx">PDF to DOCX</a>
      <a href="/docx-to-pdf">DOCX to PDF</a>
    </nav>
  </header>
);

export default Header;
