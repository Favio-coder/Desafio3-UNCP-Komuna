// src/pages/MisProyectosPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MisProyectosPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/docente" className="flex items-center space-x-2 text-primary-600 mb-6">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Mis proyectos</h1>
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500">Aquí aparecerán tus proyectos publicados</p>
        </div>
      </div>
    </div>
  );
};

export default MisProyectosPage;