import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, Users, TrendingUp } from 'lucide-react';

const EstudiantePage = () => {
  const problemasDestacados = [
    { title: 'Falta de acceso a agua potable', region: 'Tarma', proyectos: 12 },
    { title: 'Manejo inadecuado de residuos', region: 'Chanchamayo', proyectos: 8 },
    { title: 'Baja participación en educación', region: 'Satipo', proyectos: 9 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Descubre problemáticas reales
          </h1>
          <p className="text-gray-600">
            Únete a proyectos que transforman comunidades
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Search className="text-primary-600" size={20} />
            </div>
            <p className="text-sm font-medium">Explora problemáticas</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="text-green-600" size={20} />
            </div>
            <p className="text-sm font-medium">Únete a proyectos</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="text-orange-600" size={20} />
            </div>
            <p className="text-sm font-medium">Aporta ideas</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <p className="text-sm font-medium">Genera impacto</p>
          </div>
        </div>

        {/* Problemas destacados */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Problemas destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problemasDestacados.map((problema, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary-600 h-2"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{problema.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{problema.region}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-600">{problema.proyectos} proyectos</span>
                  <Link to="/explorar" className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstudiantePage;