import React from 'react';

const PoliticasPrivacidadExtendidas = () => {
  const secciones = [
    {
      titulo: "1. Introducción y Marco Legal",
      contenido: "Al interactuar con los servicios de FINEX AI, el usuario celebra un acuerdo vinculante que rige el acceso a nuestra infraestructura de gestión de activos. Estas políticas se actualizan periódicamente para cumplir con las normativas financieras internacionales y garantizar un entorno de inversión transparente. El uso continuado de la plataforma tras cualquier modificación constituye la aceptación tácita de los nuevos términos establecidos por la dirección técnica y legal."
    },
    {
      titulo: "2. Protocolo de Identificación (KYC y AML)",
      contenido: "En estricto cumplimiento de las leyes contra el blanqueo de capitales y la financiación del terrorismo, FINEX AI implementa protocolos de 'Conozca a su Cliente'. Esto implica la verificación obligatoria de la identidad mediante documentos oficiales y, en casos específicos, la declaración del origen lícito de los fondos. La empresa se reserva el derecho de restringir operaciones o congelar activos de manera preventiva si se detectan anomalías en el perfil transaccional del inversor o si la documentación proporcionada resulta insuficiente o alterada."
    },
    {
      titulo: "3. Gestión de Riesgos y Deslinde de Responsabilidad",
      contenido: "El mercado de activos digitales y financieros es inherentemente volátil. El inversor reconoce que FINEX AI proporciona herramientas tecnológicas de optimización, pero no garantiza utilidades fijas ni la preservación del capital inicial. Los rendimientos pasados no son indicativos de resultados futuros. Al aceptar este contrato, usted libera a la empresa de cualquier responsabilidad por pérdidas resultantes de correcciones del mercado, fallos en la red blockchain externa o eventos de fuerza mayor que afecten la liquidez global."
    },
    {
      titulo: "4. Política Operativa de Retiros y Depósitos",
      contenido: "Todas las transacciones de entrada y salida están sujetas a procesos de auditoría interna para garantizar la integridad de los fondos. Los retiros se procesarán en un plazo determinado por la carga de la red y las verificaciones de seguridad manuales si el monto supera los umbrales establecidos. Es responsabilidad del usuario asegurarse de proporcionar la dirección de billetera correcta; FINEX AI no puede recuperar fondos enviados a direcciones erróneas o redes no compatibles (ej. enviar USDT por una red no soportada)."
    },
    {
      titulo: "5. Seguridad Informática y Responsabilidad del Usuario",
      contenido: "Aunque FINEX AI emplea encriptación de grado militar y almacenamiento en frío para los activos, la seguridad final de la cuenta individual depende del usuario. Es imperativo el uso de la Autenticación de Dos Factores (2FA). La empresa no se responsabiliza por pérdidas derivadas de ataques de phishing, compromiso de correos electrónicos personales o el uso de dispositivos infectados por malware por parte del inversor. Cualquier brecha de seguridad detectada por el usuario debe ser reportada de inmediato a nuestro soporte técnico."
    },
    {
      titulo: "6. Propiedad Intelectual y Uso del Software",
      contenido: "Todos los algoritmos de arbitraje, interfaces de usuario, logotipos y códigos fuente son propiedad intelectual protegida de FINEX AI. Se prohíbe estrictamente cualquier intento de ingeniería inversa, uso de bots no autorizados para extraer datos o la redistribución de material propietario sin autorización escrita. El incumplimiento de esta cláusula resultará en la terminación inmediata del servicio y las acciones legales pertinentes en las jurisdicciones correspondientes."
    }
  ];

  return (
    <section className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera de la Sección */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Políticas de <span className="text-cyan-400 italic">Privacidad y Servicio</span>
          </h2>
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 w-32 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Este documento detalla las normativas que rigen nuestra relación comercial y la protección de su capital dentro del ecosistema de inversión de FINEX AI.
          </p>
        </div>

        {/* Contenido Explicativo */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="space-y-12 relative z-10">
            {secciones.map((seccion, index) => (
              <div key={index} className="border-b border-slate-800/50 pb-8 last:border-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
                  <h3 className="text-white text-2xl font-bold">{seccion.titulo}</h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed text-justify md:pl-5">
                  {seccion.contenido}
                </p>
              </div>
            ))}
          </div>



        </div>
      </div>
    </section>
  );
};

export default PoliticasPrivacidadExtendidas;