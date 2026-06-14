import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FolderOpen, TrendingUp, Plus, Eye, Calendar, Target, Tag } from 'lucide-react';
import { supabase } from '../services/supabase';

const DocentePage = () => {
  const [misProyectos, setMisProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProyectos() {
      try {
        const { data: proyectos, error } = await supabase
          .from('proyectos')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (proyectos) {
          setMisProyectos(proyectos);
        }
      } catch (error) {
        console.error('Error cargando proyectos:', error);
      } finally {
        setLoading(false);
      }
    }

    getProyectos();
  }, []);

  // Función para capitalizar primera letra de la categoría
  const capitalizar = (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  // Función para obtener color según ODS
  const getODSColor = (ods) => {
    const odsColors = {
      'ODS 1: Fin de la pobreza': 'bg-red-100 text-red-700',
      'ODS 2: Hambre Cero': 'bg-orange-100 text-orange-700',
      'ODS 3: Salud y Bienestar': 'bg-green-100 text-green-700',
      'ODS 4: Educación de Calidad': 'bg-blue-100 text-blue-700',
      'ODS 5: Igualdad de Género': 'bg-purple-100 text-purple-700',
      'ODS 6: Agua Limpia y Saneamiento': 'bg-cyan-100 text-cyan-700',
      'ODS 7: Energía Asequible y No Contaminante': 'bg-yellow-100 text-yellow-700',
      'ODS 8: Trabajo Decente y Crecimiento Económico': 'bg-indigo-100 text-indigo-700',
      'ODS 9: Industria, Innovación e Infraestructura': 'bg-pink-100 text-pink-700',
      'ODS 10: Reducción de las Desigualdades': 'bg-rose-100 text-rose-700',
      'ODS 11: Ciudades y Comunidades Sostenibles': 'bg-emerald-100 text-emerald-700',
      'ODS 12: Producción y Consumo Responsables': 'bg-teal-100 text-teal-700',
      'ODS 13: Acción por el Clima': 'bg-lime-100 text-lime-700',
      'ODS 14: Vida Submarina': 'bg-sky-100 text-sky-700',
      'ODS 15: Vida de Ecosistemas Terrestres': 'bg-green-100 text-green-700',
      'ODS 16: Paz, Justicia e Instituciones Sólidas': 'bg-gray-100 text-gray-700',
      'ODS 17: Alianzas para lograr los Objetivos': 'bg-violet-100 text-violet-700',
    };
    
    return odsColors[ods] || 'bg-gray-100 text-gray-700';
  };

  // Función para obtener color según categoría
  const getCategoriaColor = (categoria) => {
    const categoriaColors = {
      'agricultura': 'bg-emerald-100 text-emerald-700',
      'agua': 'bg-cyan-100 text-cyan-700',
      'salud': 'bg-green-100 text-green-700',
      'educacion': 'bg-blue-100 text-blue-700',
      'infraestructura': 'bg-orange-100 text-orange-700',
      'tecnologia': 'bg-purple-100 text-purple-700',
      'medio_ambiente': 'bg-lime-100 text-lime-700',
      'energia': 'bg-yellow-100 text-yellow-700',
      'emprendimiento': 'bg-indigo-100 text-indigo-700',
      'turismo': 'bg-pink-100 text-pink-700',
      'inclusion social': 'bg-rose-100 text-rose-700',
      'seguridad alimentaria': 'bg-amber-100 text-amber-700',
      'transporte': 'bg-slate-100 text-slate-700',
      'vivienda': 'bg-brown-100 text-brown-700',
      'gestion publica': 'bg-teal-100 text-teal-700',
      'otro': 'bg-gray-100 text-gray-700',
    };
    
    return categoriaColors[categoria] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Docentes
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Comparte tus proyectos y ayuda a transformar más comunidades.
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
            <p className="text-4xl font-bold">{misProyectos.length * 25}</p>
            <p className="text-sm opacity-90">personas beneficiadas</p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link to="/subir-proyecto" className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <Upload className="text-primary-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Subir proyecto</h3>
              <p className="text-sm text-gray-500">Comparte un nuevo proyecto</p>
            </div>
          </Link>
          
          <Link to="/explorar" className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <FolderOpen className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Ver peticiones</h3>
              <p className="text-sm text-gray-500">Explora problemas de la comunidad</p>
            </div>
          </Link>
        </div>

        {/* Mis proyectos - CON SCROLL (altura máxima de 400px) */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Proyectos publicados</h2>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
            Total: {misProyectos.length}
          </span>
        </div>
        
        {/* Contenedor con scroll - altura máxima 500px */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-500">Cargando proyectos...</p>
            </div>
          ) : misProyectos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No hay proyectos publicados aún</p>
              <Link to="/subir-proyecto" className="mt-2 inline-block text-primary-600 hover:text-primary-700">
                Subir mi primer proyecto →
              </Link>
            </div>
          ) : (
            misProyectos.map((proyecto, idx) => (
              <div 
                key={idx} 
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-l-primary-500"
              >
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div className="flex-1">
                    {/* Título */}
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {proyecto.titulo}
                    </h3>
                    
                    {/* Facultad */}
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <TrendingUp size={14} />
                      <span>{proyecto.facultad || 'Facultad no especificada'}</span>
                    </div>
                    
                    {/* Tags: ODS y Categoría */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proyecto.ods && (
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getODSColor(proyecto.ods)}`}>
                          <Target size={12} />
                          <span>{proyecto.ods}</span>
                        </span>
                      )}
                      {proyecto.categoria && (
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(proyecto.categoria)}`}>
                          <Tag size={12} />
                          <span>{capitalizar(proyecto.categoria)}</span>
                        </span>
                      )}
                    </div>
                    
                    {/* Fecha de creación */}
                    {proyecto.created_at && (
                      <div className="flex items-center space-x-1 mt-3 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>Publicado: {new Date(proyecto.created_at).toLocaleDateString('es-PE')}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Estadísticas rápidas */}
                 
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Estilos para el scrollbar personalizado */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c7d2fe;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #818cf8;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DocentePage;