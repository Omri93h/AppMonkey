import React from 'react';
import { useLocation } from 'react-router-dom';

const contentRoutes = ['/', '/pdf-to-docx', '/docx-to-pdf', '/pdf-to-text'];

export default function AdsBanner() {
  const { pathname } = useLocation();
  const client = import.meta.env.VITE_ADS_CLIENT;
  const slot = import.meta.env.VITE_ADS_SLOT;

  // show only on specified routes and when env vars are set
  if (!contentRoutes.includes(pathname) || !client || !slot) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </>
  );
}
