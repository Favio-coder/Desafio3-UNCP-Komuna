import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Loader2, Check, AlertCircle, Eye, MessageCircle, Users, Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabase';

const SubirProyectoPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [proyectoPublicado, setProyectoPublicado] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    facultad: '',
    ods: '',
    categoria: '',
  });

  // Lista de carreras/facultades válidas
  const facultades = [
    "Enfermería", "Medicina Humana", "Arquitectura", "Ingeniería Civil", 
    "Ingeniería de Minas", "Ingeniería de Sistemas", "Ingeniería Eléctrica y Electrónica", 
    "Ingeniería Mecánica", "Ingeniería Metalúrgica y de Materiales", "Ingeniería Química", 
    "Ingeniería Química Industrial", "Ingeniería Química Ambiental", "Administración de Empresas", 
    "Contabilidad", "Economía", "Administración de Negocios - Tarma", 
    "Administración Hotelera y Turismo - Tarma", "Antropología", "Ciencias de la Comunicación", 
    "Derecho y Ciencias Políticas", "Sociología", "Trabajo Social", 
    "Educación Inicial", "Educación Primaria", 
    "Educación Filosofía, Ciencias Sociales y Relaciones Humanas", 
    "Educación Lengua, Literatura y Comunicación", "Educación Ciencias Naturales y Ambientales", 
    "Educación Ciencias Matemáticas e Informática", "Educación Física y Psicomotricidad", 
    "Agronomía", "Ingeniería Forestal y Ambiental", "Ingeniería en Industrias Alimentarias", 
    "Zootecnia", "Ing. Agroindustrial - Tarma", "Ing. Agronomía Tropical - Satipo", 
    "Ing. Forestal Tropical - Satipo", "Ing. Industrias Alimentarias Tropical - Satipo", 
    "Zootecnia Tropical- Satipo"
  ];

  // Lista de ODS
  const odsList = [
    "ODS 1: Fin de la pobreza",
    "ODS 2: Hambre Cero",
    "ODS 3: Salud y Bienestar",
    "ODS 4: Educación de Calidad",
    "ODS 5: Igualdad de Género",
    "ODS 6: Agua Limpia y Saneamiento",
    "ODS 7: Energía Asequible y No Contaminante",
    "ODS 8: Trabajo Decente y Crecimiento Económico",
    "ODS 9: Industria, Innovación e Infraestructura",
    "ODS 10: Reducción de las Desigualdades",
    "ODS 11: Ciudades y Comunidades Sostenibles",
    "ODS 12: Producción y Consumo Responsables",
    "ODS 13: Acción por el Clima",
    "ODS 14: Vida Submarina",
    "ODS 15: Vida de Ecosistemas Terrestres",
    "ODS 16: Paz, Justicia e Instituciones Sólidas",
    "ODS 17: Alianzas para lograr los Objetivos"
  ];

  // Lista de categorías
  const categorias = [
    "agricultura",
    "agua",
    "salud",
    "educacion",
    "infraestructura",
    "tecnologia",
    "medio_ambiente",
    "energia",
    "emprendimiento",
    "turismo",
    "inclusion_social",
    "seguridad_alimentaria",
    "transporte",
    "vivienda",
    "gestion_publica",
    "otro"
  ];

  // Capitalizar categoría
  const capitalizarCategoria = (categoria) => {
    return categoria
      .split('_')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };

  // Obtener color de ODS
  const getODSColor = (ods) => {
    const colors = {
      'ODS 1': 'bg-red-100 text-red-700',
      'ODS 2': 'bg-orange-100 text-orange-700',
      'ODS 3': 'bg-green-100 text-green-700',
      'ODS 4': 'bg-blue-100 text-blue-700',
      'ODS 5': 'bg-purple-100 text-purple-700',
      'ODS 6': 'bg-cyan-100 text-cyan-700',
      'ODS 7': 'bg-yellow-100 text-yellow-700',
      'ODS 8': 'bg-indigo-100 text-indigo-700',
      'ODS 9': 'bg-pink-100 text-pink-700',
      'ODS 10': 'bg-rose-100 text-rose-700',
      'ODS 11': 'bg-emerald-100 text-emerald-700',
      'ODS 12': 'bg-teal-100 text-teal-700',
      'ODS 13': 'bg-lime-100 text-lime-700',
      'ODS 14': 'bg-sky-100 text-sky-700',
      'ODS 15': 'bg-green-100 text-green-700',
      'ODS 16': 'bg-gray-100 text-gray-700',
      'ODS 17': 'bg-violet-100 text-violet-700',
    };
    const prefix = ods.split(':')[0];
    return colors[prefix] || 'bg-gray-100 text-gray-700';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no puede superar los 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen');
        return;
      }
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones
    if (!formData.titulo.trim()) {
      setError('El título es obligatorio');
      setLoading(false);
      return;
    }
    if (!formData.facultad) {
      setError('La facultad es obligatoria');
      setLoading(false);
      return;
    }
    if (!formData.ods) {
      setError('El ODS es obligatorio');
      setLoading(false);
      return;
    }
    if (!formData.categoria) {
      setError('La categoría es obligatoria');
      setLoading(false);
      return;
    }

    try {
      // Insertar proyecto en Supabase
      const { data, error: supabaseError } = await supabase
        .from('proyectos')
        .insert([
          {
            titulo: formData.titulo,
            facultad: formData.facultad,
            ods: formData.ods,
            categoria: formData.categoria,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (supabaseError) throw supabaseError;

      // Guardar el proyecto publicado para mostrarlo en la pantalla de éxito
      if (data && data[0]) {
        setProyectoPublicado({
          ...data[0],
          ...formData
        });
      }

      setSuccess(true);
      // Ya no redirigimos automáticamente, mostramos la pantalla de éxito
    } catch (err) {
      console.error('Error al publicar:', err);
      setError(err.message || 'Error al publicar el proyecto. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // ========== PANTALLA DE ÉXITO MEJORADA ==========
  if (success && proyectoPublicado) {
    const fechaPublicacion = new Date().toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card de éxito */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header con check */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={40} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-white">¡Proyecto publicado!</h1>
              <p className="text-white/90 mt-1">
                Tu proyecto ha sido compartido exitosamente con la comunidad.
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* ¿Qué sigue? */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué sigue?</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye size={14} className="text-blue-600" />
                    </div>
                    <p className="text-gray-600">Otros docentes y estudiantes podrán ver tu proyecto</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle size={14} className="text-green-600" />
                    </div>
                    <p className="text-gray-600">Podrás recibir comentarios y colaborar</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users size={14} className="text-orange-600" />
                    </div>
                    <p className="text-gray-600">Estarás generando impacto en tu comunidad</p>
                  </div>
                </div>
              </div>

              {/* Resumen del proyecto */}
              <div className="bg-gray-50 rounded-xl p-5 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Resumen de tu proyecto</h2>
                
                <div className="space-y-3">
                  {/* Título */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {proyectoPublicado.titulo}
                    </h3>
                  </div>
                  
                  {/* Facultad */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>🎓 {proyectoPublicado.facultad}</span>
                  </div>
                  
                  {/* ODS y Categoría */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getODSColor(proyectoPublicado.ods)}`}>
                      {proyectoPublicado.ods}
                    </span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {capitalizarCategoria(proyectoPublicado.categoria)}
                    </span>
                  </div>
                  
                  {/* Fecha */}
                  <div className="flex items-center space-x-2 text-sm text-gray-400 pt-2 border-t">
                    <Calendar size={14} />
                    <span>Publicado el {fechaPublicacion}</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/docente')}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <span>Ver mis proyectos</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setProyectoPublicado(null);
                    setFormData({
                      titulo: '',
                      facultad: '',
                      ods: '',
                      categoria: '',
                    });
                    setImagenPreview(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Upload size={18} />
                  <span>Subir otro proyecto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== FORMULARIO PRINCIPAL ==========
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-600 p-6">
            <h1 className="text-2xl font-bold text-white">Subir nuevo proyecto</h1>
            <p className="text-white/90 mt-1">Comparte tu iniciativa con otras comunidades</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Título del proyecto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título del proyecto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej. Huertos escolares sostenibles"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Facultad / Carrera */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facultad / Carrera <span className="text-red-500">*</span>
              </label>
              <select
                name="facultad"
                value={formData.facultad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Selecciona una facultad</option>
                {facultades.map((facultad, idx) => (
                  <option key={idx} value={facultad}>{facultad}</option>
                ))}
              </select>
            </div>

            {/* ODS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objetivo de Desarrollo Sostenible (ODS) <span className="text-red-500">*</span>
              </label>
              <select
                name="ods"
                value={formData.ods}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Selecciona un ODS</option>
                {odsList.map((ods, idx) => (
                  <option key={idx} value={ods}>{ods}</option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria, idx) => (
                  <option key={idx} value={categoria}>
                    {capitalizarCategoria(categoria)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                La categoría ayuda a clasificar tu proyecto para que los comuneros lo encuentren fácilmente.
              </p>
            </div>

            {/* Imagen del proyecto (opcional) */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del proyecto (opcional)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${imagenPreview ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-primary-400'}`}>
                {imagenPreview ? (
                  <div className="relative">
                    <img 
                      src={imagenPreview} 
                      alt="Vista previa" 
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagenPreview(null);
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500">Sube una imagen (máx. 5MB)</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</p>
                    <label className="mt-3 inline-block cursor-pointer">
                      <span className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                        Seleccionar imagen
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImagenChange}
                      />
                    </label>
                  </>
                )}
              </div>
            </div> */}

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle size={18} className="text-red-500" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Resumen del proyecto */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Resumen del proyecto</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Título:</span> {formData.titulo || '—'}</p>
                <p><span className="text-gray-500">Facultad:</span> {formData.facultad || '—'}</p>
                <p><span className="text-gray-500">ODS:</span> {formData.ods || '—'}</p>
                <p><span className="text-gray-500">Categoría:</span> {formData.categoria ? capitalizarCategoria(formData.categoria) : '—'}</p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/docente')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-[#923c14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <span>Publicar proyecto</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubirProyectoPage;