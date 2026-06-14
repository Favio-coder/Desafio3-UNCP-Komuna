import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Building2, MessageCircle } from 'lucide-react';
import chatbotImage from '../../assets/chatbot.jpeg';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#5a9d4e] mb-6">
              Conectando ideas,{' '}
              <span className="text-[#5a9d4e]">transformando comunidades</span>
            </h1>
            <p className="text-lg text-black mb-8">
              komuna es una plataforma donde docentes y estudiantes pueden descubrir,
              compartir y desarrollar proyectos de responsabilidad social que impulsen
              el bienestar de las comunidades de Junín.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link to="/docente" className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200">
                    <GraduationCap className="text-[#4f46e5]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Soy docente</h3>
                    <p className="text-sm text-gray-500">Quiero compartir un proyecto</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/estudiante" className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                    <Users className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Soy estudiante</h3>
                    <p className="text-sm text-gray-500">Quiero buscar y compartir proyectos</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/comunero" className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all col-span-full">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200">
                    <Building2 className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Soy Komunero</h3>
                    <p className="text-sm text-gray-500">Quiero recibir ayuda</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 text-black shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle class="text-[#b27a60]" size={24} />
                <h3 className="text-xl font-bold text-[#b27a60]">KomuBot está aquí para ayudarte</h3>
              </div>
              <p className="mb-4 opacity-90">
                Resuelve tus dudas, conoce proyectos, recibe orientación y mucho más.
              </p>
              <Link
                to="/comunero"
                className="bg-[#b27a60] inline-flex items-center space-x-2  px-4 py-2 rounded-lg hover:bg-[#923c14] transition-colors"
              >
                <span className='text-white'>Chatear con KomuBot</span>
                <ArrowRight className="text-white" size={18} />
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-2xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl -z-10"></div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Hero;