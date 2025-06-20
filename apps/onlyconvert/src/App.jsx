import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import SEO from 'core-ui/components/SEO';
import Analytics from 'core-ui/components/Analytics';
import AdsBanner from 'core-ui/components/AdsBanner';
import Header from 'core-ui/components/Header';
import Footer from 'core-ui/components/Footer';
import NotificationProvider from './components/NotificationProvider';
import FileUpload from './components/FileUpload';
import { convertPdfToDocx, convertDocxToPdf, convertPdfToText } from 'core-ui/hooks/useConversion';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to OnlyConvert</h1>
      <p className="text-gray-600">Choose a converter from the menu above to get started.</p>
    </div>
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
          <nav className="flex justify-center items-center my-4">
            <NavLink to="/pdf-to-docx" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}>
              PDF to DOCX
            </NavLink>
            <span className="text-gray-400 px-2">|</span>
            <NavLink to="/docx-to-pdf" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}>
              DOCX to PDF
            </NavLink>
            <span className="text-gray-400 px-2">|</span>
            <NavLink to="/pdf-to-text" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}>
              PDF to TXT
            </NavLink>
          </nav>
          <div className="flex-1 min-h-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pdf-to-docx" element={<FileUpload convertFn={convertPdfToDocx} outputExt=".docx" />} />
              <Route path="/docx-to-pdf" element={<FileUpload convertFn={convertDocxToPdf} outputExt=".pdf" />} />
              <Route path="/pdf-to-text" element={<FileUpload convertFn={convertPdfToText} outputExt=".txt" />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}
