import React from 'react';

const PageHero = ({ title, breadcrumbs = [] }) => {
  return (
    <section className="w-full px-2 flex items-center justify-center min-h-[250px]">
      {/* Contenedor central (Glassmorphism) */}
      <div className="bg-[#2b6880] backdrop-blur-md rounded-[40px] shadow-2xl p-12 md:p-20 w-full max-w-4xl text-center border border-white/10">
        
        {/* Título Dinámico */}
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>

        {/* Breadcrumbs (Navegación) */}
        <nav className="flex justify-center items-center space-x-2 text-lg font-medium">
          <a href="/" className="text-[#002853] hover:text-white transition-colors">
            Inicio
          </a>
          <span className="text-white">/</span>
          <span className="text-white capitalize">
            {title.toLowerCase()}
          </span>
        </nav>
      </div>
    </section>
  );
};

export default PageHero;