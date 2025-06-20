import React from 'react';
import SEO from 'core-ui/src/components/SEO';
import Analytics from 'core-ui/src/components/Analytics';
import Header from 'core-ui/src/components/Header';
import Footer from 'core-ui/src/components/Footer';
import FileUpload from './components/FileUpload';

const App = () => (
  <>
    <SEO title="%VITE_APP_TITLE%" description="%VITE_APP_DESC%" />
    <Analytics />
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <FileUpload />
      </main>
      <Footer />
    </div>
  </>
);

export default App;
