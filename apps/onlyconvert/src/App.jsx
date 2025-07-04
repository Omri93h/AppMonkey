import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SEO from './core-ui/components/SEO';
import Analytics from './core-ui/components/Analytics';
import AdsBanner from './core-ui/components/AdsBanner';
import Header from './core-ui/components/Header';
import Footer from './core-ui/components/Footer';
import NotificationProvider from './components/NotificationProvider';
import LoadingSpinner from './core-ui/components/LoadingSpinner';
import { convertPdfToDocx, convertDocxToPdf, convertPdfToText } from './core-ui/hooks/useConversion';

function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">{import.meta.env.VITE_APP_TITLE} – Free and Fast</h1>
      <p className="text-gray-600 mb-4">{import.meta.env.VITE_APP_DESC}</p>
      {/* Publisher content is available here */}
      <AdsBanner />
    </main>
  );
}

const FileUpload = lazy(() => import('./components/FileUpload'));
const Help = lazy(() => import('./components/Help'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/CookiePolicy'));

export default function App() {
  const generalLinks = [
    { to: '/', label: 'Home' },
    { to: '/help', label: 'Help' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/cookies', label: 'Cookie Policy' },
  ];
  const converterLinks = [
    { to: '/pdf-to-docx', label: 'PDF to DOCX' },
    { to: '/docx-to-pdf', label: 'DOCX to PDF' },
    { to: '/pdf-to-text', label: 'PDF to TXT' },
  ];

  return (
    <NotificationProvider>
      <SEO title={import.meta.env.VITE_APP_TITLE} description={import.meta.env.VITE_APP_DESC} />
      <Analytics measurementId={import.meta.env.VITE_GA_ID} />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* General Links */}
          <nav className="flex justify-center items-center divide-x divide-gray-300 my-2">
            {generalLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => isActive ? 'font-bold px-6' : 'px-6'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {/* Converter Links */}
          <nav className="flex justify-center items-center divide-x divide-gray-300 my-2">
            {converterLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => isActive ? 'font-bold px-6' : 'px-6'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {/* Content & Ads */}
          <div className="flex-1 min-h-0">
            <Suspense fallback={<LoadingSpinner />}>
              {/* Show ads only when publisher content is available */}
              <AdsBanner />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pdf-to-docx" element={<FileUpload convertFn={convertPdfToDocx} outputExt=".docx" />} />
                <Route path="/docx-to-pdf" element={<FileUpload convertFn={convertDocxToPdf} outputExt=".pdf" />} />
                <Route path="/pdf-to-text" element={<FileUpload convertFn={convertPdfToText} outputExt=".txt" />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}
