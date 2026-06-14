import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FolderOpen, TrendingUp, Plus } from 'lucide-react';

const DocentePage = () => {
  const misProyectos = [
    { title: 'Huertos escolares sostenibles', location: 'Tarma', status: 'Publicado', views: 12, comments: 5 },
    { title: 'Reciclaje comunitario', location: 'Chanchamayo', status: 'Publicado', views: 8, comments: 3 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Docentes
          </h1>
          <p className="text-gray-600">
            Comparte tus proyectos
            y ayuda a transformar
            más comunidades.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Mis proyectos</h3>
            <p className="text-4xl font-bold">{misProyectos.length}</p>
            <p className="text-sm opacity-90">proyectos publicados</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Impacto generado</h3>
            <p className="text-4xl font-bold">150+</p>
            <p className="text-sm opacity-90">personas beneficiadas</p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link to="/subir-proyecto" className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Upload className="text-primary-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Subir proyecto</h3>
              <p className="text-sm text-gray-500">Comparte un nuevo proyecto</p>
            </div>
          </Link>
          
          <Link to="/explorar" className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FolderOpen className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Ver problemas</h3>
              <p className="text-sm text-gray-500">Explora problemas de la comunidad</p>
            </div>
          </Link>
        </div>

        {/* Mis proyectos */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mis proyectos</h2>
        <div className="space-y-4">
          {misProyectos.map((proyecto, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{proyecto.title}</h3>
                  <p className="text-sm text-gray-500">{proyecto.location}</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded mt-2">
                    {proyecto.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{proyecto.views} vistas</p>
                  <p className="text-sm text-gray-500">{proyecto.comments} comentarios</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocentePage;