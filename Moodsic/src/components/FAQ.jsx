import { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqItems = [
      {
        question: "¿Qué puedo hacer sin crear una cuenta?",
        answer: "Puedes generar las recomendaciones de música y explorar el contenido disponible. Sin embargo, algunas funciones avanzadas requieren una cuenta registrada.",
        restricted: false,
      },
      {
        question: "¿Cuáles son las ventajas de tener una cuenta registrada?",
        answer: "Los usuarios registrados pueden acceder a contenido exclusivo, guardar su progreso, personalizar su experiencia y acceder a recursos adicionales.",
        restricted: true,
      },
      {
        question: "¿Cómo me registro?",
        answer: "Es muy fácil. Solo necesitas hacer clic en el botón 'Iniciar sesión' en la parte superior de la página y crearse una cuenta en la sección 'Registro'.",
        restricted: false,
      },
      {
        question: "¿Puedo acceder a contenido exclusivo sin una cuenta?",
        answer: "No, el contenido exclusivo está reservado para usuarios registrados. Sin embargo, ofrecemos una gran cantidad de recursos gratuitos.",
        restricted: true,
      },
      {
        question: "¿Es gratis crear una cuenta?",
        answer: "Sí, crear una cuenta es completamente gratuito. No hay cargos ni obligaciones para registrarse.",
        restricted: false,
      },
      {
        question: "¿Cómo puedo modificar mi perfil?",
        answer: "Puedes modificar tu perfil accediendo a la configuración en tu cuenta. Desde allí puedes cambiar tu nombre, correo y preferencias.",
        restricted: true,
      },
    ];
  
    const handleToggle = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div className="min-h-[80vh] py-20 text-white text-left">
        <h2 className="text-center text-4xl font-extrabold text-white mb-8">Preguntas frecuentes</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-[#41506b] rounded-xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl ${
                item.restricted ? "border-4 border-yellow-300" : ""
              }`}
              onClick={() => handleToggle(index)}
            >
              <div className="flex justify-between items-center p-5">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <span className="text-xl text-white">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className={`p-5 transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default FAQ;