import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mood');
  };

  return (
    <section className="flex flex-col gap-5 justify-center items-center mt-30 md:mt-28 px-6 md:px-20 text-center bg-[#41506b] rounded-4xl">
        <h1 className="z-2 mt-10 text-5xl md:text-8xl font-extrabold leading-tight">Escucha lo que sientes</h1>
        <p className="z-2 text-lg md:text-2xl max-w-3xl">Moodsic genera recomendaciones de canciones personalizadas basadas en tu estado de ánimo.{" "}
        <span className="z-2 whitespace-nowrap">No elijas la música...</span> deja que te encuentre a ti.</p>
        <button className="z-2 bg-blue-500 font-semibold rounded-2xl px-6 py-3 text-lg md:text-2xl text-white hover:bg-blue-800 cursor-pointer shadow-md transition-colors duration-300 mt-3" onClick={handleButtonClick}>Explora tu mood</button>
        <img src="https://i.postimg.cc/tJnZSZy8/Imagen-Hero.png" className="mt-14 bottom-0 w-full max-w-5xl object-contain z-1" alt="Ilustración de una bomba de emociones"/>
    </section>
  );
}

export default Hero;