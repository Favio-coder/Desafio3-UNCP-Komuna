// src/pages/ExplorarProblemasPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

const ExplorarProblemasPage = () => {
  const problemas = [
    { titulo: 'Falta de acceso a agua potable', region: 'Tarma', descripcion: 'Comunidades sin acceso a agua limpia para consumo diario' },
    { titulo: 'Manejo inadecuado de residuos', region: 'Chanchamayo', descripcion: 'Problemas de contaminación por falta de gestión de residuos' },
    { titulo: 'Baja participación en educación', region: 'Satipo', descripcion: 'Deserción escolar y falta de acceso a educación de calidad' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/estudiante" className="flex items-center space-x-2 text-primary-600 mb-6">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Explorar problemas</h1>
        <div className="space-y-4">
          {problemas.map((problema, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{problema.titulo}</h3>
              <div className="flex items-center space-x-2 text-gray-500 mb-3">
                <MapPin size={16} />
                <span className="text-sm">{problema.region}</span>
              </div>
              <p className="text-gray-600">{problema.descripcion}</p>
              <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                Ver proyectos relacionados
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorarProblemasPage;