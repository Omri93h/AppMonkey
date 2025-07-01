import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SEO from 'core-ui/components/SEO';
import Analytics from 'core-ui/components/Analytics';
import AdsBanner from 'core-ui/components/AdsBanner';
import Header from 'core-ui/components/Header';
import Footer from 'core-ui/components/Footer';
import NotificationProvider from './components/NotificationProvider';
import Help from './components/Help';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import FileUpload from './components/FileUpload';
import { convertPdfToDocx, convertDocxToPdf, convertPdfToText } from 'core-ui/hooks/useConversion';

function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">{import.meta.env.VITE_APP_TITLE} – Free and Fast</h1>
      <p className="text-gray-600 mb-4">{import.meta.env.VITE_APP_DESC}</p>
    </main>
  );
}

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
            <NavLink to="/pdf-to-docx">PDF to DOCX</NavLink>
            <NavLink to="/docx-to-pdf">DOCX to PDF</NavLink>
            <NavLink to="/pdf-to-text">PDF to TXT</NavLink>
            <NavLink to="/help">Help</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/terms">Terms of Service</NavLink>
            <NavLink to="/cookies">Cookie Policy</NavLink>
          </nav>
          <div className="flex-1 min-h-0">
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
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}
