import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label superior en azul brillante */}
        <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
          MÉTODOS DE PAGO
        </span>
        
        {/* Título principal */}
        <h2 className="text-white text-3xl md:text-4xl font-bold mt-2 mb-6">
          Nuestro sistema de pago para usted
        </h2>
        
        {/* Línea divisoria sutil */}
        <div className="h-[1px] bg-gray-800 w-full mb-12"></div>

        {/* Contenedor de iconos */}
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-white p-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Representación del logo Tether (USDT) */}
              <div className="w-14 h-14 bg-[#50af95] rounded-full flex items-center justify-center text-white font-bold text-3xl select-none">
                ₮
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;