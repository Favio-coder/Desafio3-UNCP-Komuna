import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

const SubirProyectoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    problema: '',
    distrito: '',
    objetivos: ''
  });
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en Supabase
    alert('Proyecto publicado exitosamente');
    navigate('/docente');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-600 p-6">
            <h1 className="text-2xl font-bold text-white">Subir nuevo proyecto</h1>
            <p className="text-white/90 mt-1">Comparte tu iniciativa con otras comunidades</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título del proyecto
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej. Huertos escolares sostenibles"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                placeholder="Cuéntanos en qué consiste tu proyecto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Problema */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Problema que aborda
              </label>
              <input
                type="text"
                name="problema"
                value={formData.problema}
                onChange={handleChange}
                placeholder="¿Qué problema soluciona?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Distrito */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distrito / Comunidad
              </label>
              <select
                name="distrito"
                value={formData.distrito}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un distrito</option>
                <option value="Tarma">Tarma</option>
                <option value="Chanchamayo">Chanchamayo</option>
                <option value="Satipo">Satipo</option>
              </select>
            </div>

            {/* Objetivos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objetivos
              </label>
              <textarea
                name="objetivos"
                value={formData.objetivos}
                onChange={handleChange}
                rows="3"
                placeholder="¿Qué esperas lograr?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del proyecto
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-500">Sube una imagen (máx. 5MB)</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/docente')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Publicar proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubirProyectoPage;