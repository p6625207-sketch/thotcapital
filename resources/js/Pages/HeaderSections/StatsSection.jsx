import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      value: "+2.250.000",
      unit: "USDT",
      label: "INVERSIÓN TOTAL",
    },
    {
      value: "+4200",
      unit: "",
      label: "DEPÓSITO TOTAL",
    },
    {
      value: "+12300",
      unit: "",
      label: "RETIRO TOTAL",
    },
    {
      value: "+4230",
      unit: "",
      label: "TOTAL DE USUARIOS",
    },
  ];

  return (
    <section className="mt-2 -mb-12 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Número y Unidad en Amarillo */}
              <div className="flex flex-col mb-1">
                <span className="text-[#facc15] text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-[#facc15] text-2xl md:text-3xl font-bold">
                    {stat.unit}
                  </span>
                )}
              </div>
              
              {/* Etiqueta en Azul */}
              <span className="text-[#0056b3] text-sm md:text-base font-bold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;