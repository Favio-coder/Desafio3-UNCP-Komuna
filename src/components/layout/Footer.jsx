// Footer.jsx - Versión sin íconos de redes sociales
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ubicación */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">K</span>
              </div>
              <h3 className="text-xl font-bold">mathfounding komuna</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Segundo Piso del edificio inteligente de la U.N.C.P.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">De 8 am - 1 pm</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+51 123 456 789</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@komuna.com</p>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/docente" className="text-gray-300 hover:text-white transition-colors">Docentes</a></li>
              <li><a href="/estudiante" className="text-gray-300 hover:text-white transition-colors">Estudiantes</a></li>
              <li><a href="/comunero" className="text-gray-300 hover:text-white transition-colors">Comuneros</a></li>
            </ul>
          </div>

          {/* Redes sociales - versión sin íconos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Horario de atención</h3>
              <p className="text-gray-300 text-sm">Lunes a Viernes</p>
              <p className="text-gray-300 text-sm">8:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 mathfounding komuna. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;