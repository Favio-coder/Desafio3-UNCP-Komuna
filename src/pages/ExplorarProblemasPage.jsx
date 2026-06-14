// src/pages/ExplorarPeticionesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Calendar, Eye, Phone, 
  CheckCircle, Clock, AlertCircle, X, ExternalLink,
  MessageCircle, User, Building2, Target, Tag
} from 'lucide-react';
import { supabase } from '../services/supabase';

const ExplorarPeticionesPage = () => {
  const [peticiones, setPeticiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeticion, setSelectedPeticion] = useState(null);
  const [proyectoDetalle, setProyectoDetalle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    cargarPeticiones();
  }, []);

  const cargarPeticiones = async () => {
    setLoading(true);
    try {
      const { data: peticionesData, error: peticionesError } = await supabase
        .from('peticiones')
        .select(`
          id,
          proyecto,
          phone_origin,
          estado,
          created_at,
          id_proyect
        `)
        .order('created_at', { ascending: false });

      if (peticionesError) throw peticionesError;

      // Para cada petición, cargar el proyecto relacionado
      const peticionesConProyecto = await Promise.all(
        (peticionesData || []).map(async (peticion) => {
          if (peticion.id_proyect) {
            const { data: proyectoData } = await supabase
              .from('proyectos')
              .select('*')
              .eq('id', peticion.id_proyect)
              .single();
            return { ...peticion, proyecto_detalle: proyectoData };
          }
          return { ...peticion, proyecto_detalle: null };
        })
      );

      setPeticiones(peticionesConProyecto);
    } catch (error) {
      console.error('Error cargando peticiones:', error);
    } finally {
      setLoading(false);
    }
  };

  const verDetalleProyecto = async (peticion) => {
    setSelectedPeticion(peticion);
    setShowModal(true);
    setModalLoading(true);

    try {
      if (peticion.id_proyect) {
        const { data: proyectoData, error: proyectoError } = await supabase
          .from('proyectos')
          .select('*')
          .eq('id', peticion.id_proyect)
          .single();

        if (proyectoError) throw proyectoError;
        setProyectoDetalle(proyectoData);
      } else {
        setProyectoDetalle(null);
      }
    } catch (error) {
      console.error('Error cargando proyecto:', error);
      setProyectoDetalle(null);
    } finally {
      setModalLoading(false);
    }
  };

  const getEstadoColor = (estado) => {
    const estados = {
      'no atendido': 'bg-red-100 text-red-700',
      'en proceso': 'bg-yellow-100 text-yellow-700',
      'atendido': 'bg-green-100 text-green-700',
      'completado': 'bg-blue-100 text-blue-700',
    };
    return estados[estado?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getEstadoIcon = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'no atendido':
        return <AlertCircle size={14} />;
      case 'en proceso':
        return <Clock size={14} />;
      case 'atendido':
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const capitalizar = (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  const capitalizarCategoria = (categoria) => {
    if (!categoria) return '';
    return categoria
      .split('_')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/docente" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4 transition-colors">
            <ArrowLeft size={20} />
            <span>Volver al panel docente</span>
          </Link>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Peticiones de la comunidad</h1>
              <p className="text-gray-500 mt-1">
                Comuneros que han solicitado ayuda a través de KomuBot
              </p>
            </div>
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              Total: {peticiones.length} peticiones
            </div>
          </div>
        </div>

        {/* Lista de peticiones */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : peticiones.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay peticiones aún</h3>
            <p className="text-gray-500">Cuando los comuneros soliciten ayuda, aparecerán aquí.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {peticiones.map((peticion) => (
              <div
                key={peticion.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    {/* Información principal */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2 flex-wrap gap-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {peticion.proyecto || 'Proyecto sin título'}
                        </h3>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(peticion.estado)}`}>
                          {getEstadoIcon(peticion.estado)}
                          <span>{capitalizar(peticion.estado || 'No atendido')}</span>
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Phone size={14} />
                          <span>{peticion.phone_origin || 'Sin contacto'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatFecha(peticion.created_at)}</span>
                        </div>
                      </div>

                      {/* Proyecto relacionado */}
                      {peticion.proyecto_detalle && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Building2 size={14} />
                            <span className="font-medium">Proyecto relacionado:</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-800">{peticion.proyecto_detalle.titulo}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{peticion.proyecto_detalle.facultad}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Botón ver detalles */}
                    <button
                      onClick={() => verDetalleProyecto(peticion)}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-[#923c14] transition-colors"
                    >
                      <Eye size={18} />
                      <span>Ver proyecto</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles del proyecto */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header del modal */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-600 p-6 text-white rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Target size={24} />
                    <h2 className="text-xl font-bold">Detalles del proyecto</h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                {selectedPeticion && (
                  <p className="text-white/80 text-sm mt-2">
                    Solicitado por: {selectedPeticion.phone_origin}
                  </p>
                )}
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                {modalLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
                  </div>
                ) : proyectoDetalle ? (
                  <div className="space-y-6">
                    {/* Título */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {proyectoDetalle.titulo}
                      </h3>
                      <div className="h-1 w-20 bg-primary-600 rounded"></div>
                    </div>

                    {/* Facultad */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Building2 size={18} />
                        <span className="font-medium">Facultad / Carrera</span>
                      </div>
                      <p className="text-gray-800">{proyectoDetalle.facultad || 'No especificada'}</p>
                    </div>

                    {/* ODS */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Target size={18} />
                        <span className="font-medium">Objetivo de Desarrollo Sostenible</span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {proyectoDetalle.ods || 'No especificado'}
                      </span>
                    </div>

                    {/* Categoría */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Tag size={18} />
                        <span className="font-medium">Categoría</span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {capitalizarCategoria(proyectoDetalle.categoria)}
                      </span>
                    </div>

                    {/* Fecha de creación */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Calendar size={18} />
                        <span className="font-medium">Fecha de publicación</span>
                      </div>
                      <p className="text-gray-800">{formatFecha(proyectoDetalle.created_at)}</p>
                    </div>

                    {/* Información de la petición */}
                    {selectedPeticion && (
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Información de la petición</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Número de contacto:</span>
                            <span className="font-medium">{selectedPeticion.phone_origin}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Estado:</span>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedPeticion.estado)}`}>
                              {getEstadoIcon(selectedPeticion.estado)}
                              <span>{capitalizar(selectedPeticion.estado || 'No atendido')}</span>
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Fecha de solicitud:</span>
                            <span>{formatFecha(selectedPeticion.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Proyecto no encontrado</h3>
                    <p className="text-gray-500">El proyecto relacionado ya no está disponible.</p>
                    <p className="text-sm text-gray-400 mt-2">ID: {selectedPeticion?.id_proyect}</p>
                  </div>
                )}
              </div>

              {/* Footer del modal */}
              <div className="sticky bottom-0 bg-gray-50 p-4 border-t flex justify-end gap-3 rounded-b-xl">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cerrar
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorarPeticionesPage;