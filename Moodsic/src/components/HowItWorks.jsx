const HowItWorks = () => {
  return (
    <section className="mt-40 px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-16">¿Cómo funciona?</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
        {/* Paso 1 */}
        <div className="bg-[#41506b] rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 text-yellow-200">Paso 1</h3>
          <p className="text-lg text-white mb-4">Elige tu estado de ánimo</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFoMWwycm4ydDJhenUyM2ZqMjNvN294dWk4ZGoxNHB1MXljdDBrZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U4FCupGQC0aVEkpTjV/giphy.gif"
            alt="Persona mostrando estados de animos"
            className="rounded-xl w-full max-w-xs object-cover"
          />
        </div>

        {/* Paso 2 */}
        <div className="bg-[#41506b] rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 text-orange-200">Paso 2</h3>
          <p className="text-lg text-white mb-4">Genera tu recomendación de canciones</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDJ6bjBkNzA4cGRqeTJmYzg5OXJ2N3JsNm5mb2pyb3o3YTdmczVjaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MT5UUV1d4CXE2A37Dg/giphy.gif"
            alt="IA analizadora de emociones"
            className="rounded-xl w-full max-w-xs object-cover"
          />
        </div>

        {/* Paso 3 */}
        <div className="bg-[#41506b] rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 text-green-200">Paso 3</h3>
          <p className="text-lg text-white mb-4">¡Disfruta y descubre nueva música!</p>
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJvcjdnOGhzNXl5OGp3MDdlMWUzeDBrMGRxdXMxNzI2Yms5NWQzZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tiNlHkA1WdUh3jRDW/giphy.gif"
            alt="Mono animado disfrutando de la música"
            className="rounded-xl w-full max-w-xs object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;