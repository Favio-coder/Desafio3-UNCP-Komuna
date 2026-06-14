import React from 'react';
import { Users, FileText, Target, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '150+',
      label: 'Comunidades atendidas',
      color: 'blue'
    },
    {
      icon: FileText,
      value: '45+',
      label: 'Proyectos activos',
      color: 'green'
    },
    {
      icon: Target,
      value: '12',
      label: 'ODS impactados',
      color: 'orange'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Satisfacción',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestro impacto en números
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Resultados que respaldan nuestra misión de transformar comunidades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${getColorClasses(stat.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;