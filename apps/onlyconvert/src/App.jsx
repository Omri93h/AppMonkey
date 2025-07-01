import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SEO from 'core-ui/components/SEO';
import Analytics from 'core-ui/components/Analytics';
import AdsBanner from 'core-ui/components/AdsBanner';
import Header from 'core-ui/components/Header';
import Footer from 'core-ui/components/Footer';
import NotificationProvider from './components/NotificationProvider';
import LoadingSpinner from 'core-ui/components/LoadingSpinner';
import { convertPdfToDocx, convertDocxToPdf, convertPdfToText } from 'core-ui/hooks/useConversion';

// Static home page
function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">{import.meta.env.VITE_APP_TITLE} – Free and Fast</h1>
      <p className="text-gray-600 mb-4">{import.meta.env.VITE_APP_DESC}</p>
    </main>
  );
}

// Lazy-loaded pages
const FileUpload = lazy(() => import('./components/FileUpload'));
const Help = lazy(() => import('./components/Help'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/CookiePolicy'));

export default function App() {
  return (
    <NotificationProvider>
      <SEO title={import.meta.env.VITE_APP_TITLE} description={import.meta.env.VITE_APP_DESC} />
      <Analytics measurementId={import.meta.env.VITE_GA_ID} />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <AdsBanner />
          <nav className="flex justify-center space-x-4 my-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/pdf-to-docx">PDF→DOCX</NavLink>
            <NavLink to="/docx-to-pdf">DOCX→PDF</NavLink>
            <NavLink to="/pdf-to-text">PDF→TXT</NavLink>
            <NavLink to="/help">Help</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
            <NavLink to="/terms">Terms</NavLink>
            <NavLink to="/cookies">Cookies</NavLink>
          </nav>
          <div className="flex-1 min-h-0">
            <Suspense fallback={<LoadingSpinner />}>
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
