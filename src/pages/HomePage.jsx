import React from 'react';
import Hero from '../components/home/Hero';
import ProblemCards from '../components/home/ProblemCards';
import StatsSection from '../components/home/StatsSection';
import { Target } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ProblemCards />
      <StatsSection />
      
      {/* ODS Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <Target size={18} />
            <span className="font-medium">Objetivos de Desarrollo Sostenible</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Impulsamos el cambio alineados a los ODS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestros proyectos contribuyen directamente a los Objetivos de Desarrollo Sostenible
            de la ONU para construir un futuro mejor
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;