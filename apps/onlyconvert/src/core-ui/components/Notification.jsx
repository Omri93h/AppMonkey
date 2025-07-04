import React from 'react';

const Notification = ({ message, type = 'info' }) => (
  <div
    className={[
      'p-4 mb-4 rounded',
      type === 'error' ? 'bg-red-100 text-red-800' :
      type === 'success' ? 'bg-green-100 text-green-800' :
      'bg-blue-100 text-blue-800'
    ].join(' ')}
  >
    {message}
  </div>
);

export default Notification;
