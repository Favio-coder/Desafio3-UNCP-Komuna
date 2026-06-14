import React from 'react';
import ChatBot from '../components/comunero/ChatBot';
import { Shield, Clock, Heart } from 'lucide-react';

const ComuneroPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Asistente Virtual para Comuneros
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe tu problema o necesidad, y nuestro asistente te ayudará a encontrar
            proyectos que puedan solucionarlo
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="text-primary-600" size={24} />
            </div>
            <h3 className="font-semibold">Ayuda gratuita</h3>
            <p className="text-sm text-gray-500">Sin costo para los comuneros</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold">Respuesta rápida</h3>
            <p className="text-sm text-gray-500">Orientación inmediata</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="text-orange-600" size={24} />
            </div>
            <h3 className="font-semibold">Proyectos reales</h3>
            <p className="text-sm text-gray-500">Conectamos con soluciones existentes</p>
          </div>
        </div>

        {/* Chat Component */}
        <ChatBot />
      </div>
    </div>
  );
};

export default ComuneroPage;