import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DocentePage from './pages/DocentePage';
import EstudiantePage from './pages/EstudiantePage';
import ComuneroPage from './pages/ComuneroPage';
import SubirProyectoPage from './pages/SubirProyectoPage';
import MisProyectosPage from './pages/MisProyectosPage';
import ExplorarProblemasPage from './pages/ExplorarProblemasPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docente" element={<DocentePage />} />
            <Route path="/estudiante" element={<EstudiantePage />} />
            <Route path="/comunero" element={<ComuneroPage />} />
            <Route path="/subir-proyecto" element={<SubirProyectoPage />} />
            <Route path="/mis-proyectos" element={<MisProyectosPage />} />
            <Route path="/explorar" element={<ExplorarProblemasPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;