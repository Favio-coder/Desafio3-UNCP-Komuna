import React from 'react';
import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

const problemsData = [
  {
    region: 'Tarma',
    problem: 'Falta de acceso a agua potable',
    count: 4,
    projects: 12,
    color: 'blue'
  },
  {
    region: 'Chanchamayo',
    problem: 'Manejo inadecuado de residuos',
    count: 7,
    projects: 8,
    color: 'green'
  },
  {
    region: 'Satipo',
    problem: 'Baja participación en educación',
    count: 13,
    projects: 9,
    color: 'orange'
  }
];

const ProblemCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Problemas destacados en Junín
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las principales necesidades de nuestras comunidades y cómo puedes ayudar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problemsData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className={`h-2 bg-${item.color}-500`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">{item.region}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.problem}
                </h3>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <span className="text-sm text-gray-600">{item.count} problemas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-sm text-gray-600">{item.projects} proyectos</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemCards;