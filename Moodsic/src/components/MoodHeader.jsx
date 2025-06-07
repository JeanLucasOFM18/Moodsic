import { Wand2, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MoodHeader = ({ onSelect }) => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] rounded-4xl p-4 gap-6 bg-[#41506b] text-white text-center">
      <button
        onClick={handleButtonClick}
        className="absolute top-15 md:left-50 left-15 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
      >
        ← Volver
      </button>
      <h2 className="font-extrabold text-3xl md:text-4xl drop-shadow-lg">
        ¿Cómo te gustaría seleccionar tu estado de ánimo?
      </h2>
      <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
        Puedes elegir entre una guía visual o expresarte libremente con tus propias palabras.
      </p>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <button
          onClick={() => onSelect("guided")}
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl textlg md:text-xl transition-transform hover:scale-105 shadow-lg cursor-pointer"
        >
          <Wand2 className="w-6 h-6" />
          Elección guiada
        </button>
        <button
          onClick={() => onSelect("text")}
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl text-lg md:text-xl transition-transform hover:scale-105 shadow-lg cursor-pointer"
        >
          <PenLine className="w-6 h-6" />
          Escribe tus sentimientos
        </button>
      </div>
    </div>
  );
};


export default MoodHeader;