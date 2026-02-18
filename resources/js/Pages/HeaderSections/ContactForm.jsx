import React from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <section className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Columna de Información de Contacto */}
          
          <div className="space-y-8">
            {/* Dirección */}
            <div className="flex items-center gap-5 group">
              <div className="bg-blue-600 p-4 rounded-full text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-lg">Office Address</h4>
                <p className="text-slate-400 font-medium">Latam</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5 group">
              <div className="bg-blue-600 p-4 rounded-full text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-lg">Email Address</h4>
                <p className="text-slate-400 font-medium tracking-wide">info@thotcapitals.com</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-5 group">
              <div className="bg-blue-600 p-4 rounded-full text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-lg">Phone Number</h4>
                <p className="text-slate-00 font-medium">00123547895</p>
              </div>
            </div>
          </div>

          {/* Columna del Formulario */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Asunto */}
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Write your subject"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <textarea 
                  rows="5"
                  placeholder="Write your message"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              {/* Botón de Envío */}
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 group active:scale-95"
              >
                <span>Send Message</span>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;