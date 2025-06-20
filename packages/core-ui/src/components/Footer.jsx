import React from 'react';

const Footer = ({ className = '' }) => (
  <footer
    className={`p-4 bg-gray-100 text-center w-full ${className}`}
    style={{ position: 'fixed', bottom: 0, left: 0 }}
  >
    <p className="text-sm text-gray-600">© 2025 OnlyConvert. All rights reserved.</p>
  </footer>
);

export default Footer;
