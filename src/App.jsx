/**
 * Single Responsibility Principle (SRP) & Dependency Inversion Principle (DIP):
 * Application root configuring ServiceProvider and declarative routing.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ServiceProvider } from './context/ServiceContext';
import { HomePage } from './pages/HomePage';
import { CoursePage } from './pages/CoursePage';
import { GuidePage } from './pages/GuidePage';
import { GlossaryPage } from './pages/GlossaryPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/curso" element={<CoursePage />} />
          <Route path="/curso.html" element={<CoursePage />} />
          <Route path="/curso/:courseId" element={<CoursePage />} />
          <Route path="/programa" element={<CoursePage defaultCourseId="alfabetizacion-digital" />} />
          <Route path="/programa.html" element={<CoursePage defaultCourseId="alfabetizacion-digital" />} />
          <Route path="/guia" element={<GuidePage />} />
          <Route path="/guia.html" element={<GuidePage />} />
          <Route path="/glosario" element={<GlossaryPage />} />
          <Route path="/glosario.html" element={<GlossaryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}

export default App;
