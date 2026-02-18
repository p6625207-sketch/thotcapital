import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-[#0f1123]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between p-4 text-left transition-all ${
          isOpen ? 'bg-[#0056b3] text-white' : 'text-gray-400 hover:bg-white/5'
        }`}
      >
        <span className="text-sm font-bold md:text-base">{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} className="text-blue-500" />}
      </button>
      
      {isOpen && (
        <div className="p-4 text-sm text-gray-300 bg-[#0f1123] border-t border-white/5 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Cómo hacer un retiro?",
      answer: "Para realizar un retiro, dirígete a tu panel de control, selecciona la opción de retiro y sigue los pasos indicados."
    },
    {
      question: "No he recibido mi retiro",
      answer: "El tiempo de procesamiento de su retiro variará dependiendo de su método de pago."
    },
    {
      question: "¿Cómo funciona el plan MLM binario?",
      answer: "El plan Binary MLM es una estrategia de compensación de mercadeo en red utilizada para potenciar sus ganancias."
    },
    {
        question: "¿Cómo depositar dinero?",
        answer: "Puede depositar fondos utilizando criptomonedas como USDT a través de nuestra pasarela segura."
    }
  ];

  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado estilo imagen */}
        <div className="text-center mb-10">
          <p className="text-[#0056b3] text-xs md:text-sm font-bold uppercase tracking-widest mb-4">
            SIEMPRE NOS PREOCUPAMOS POR NUESTROS CLIENTES, HEMOS TRATADO DE RESPONDER ALGUNAS PREGUNTAS FRECUENTES SOBRE SU NEGOCIO
          </p>
          <h2 className="text-gray-300 text-3xl md:text-4xl font-bold opacity-50">
            Una pregunta frecuente
          </h2>
        </div>

        {/* Grid de Acordeones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;