import React from 'react';

const Header = ({ className = '' }) => (
  <header className={`bg-blue-600 text-white p-4 rounded ${className}`}>
    <h1 className="text-xl font-semibold text-center">{document.title}</h1>
  </header>
);

export default Header;
