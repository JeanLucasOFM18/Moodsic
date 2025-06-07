import { useState, useEffect } from "react";
import { auth, db } from '../configuration/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { toast } from 'react-toastify';

const FreeInput = () => {

    const [text, setText] = useState("");
    const [result, setResult] = useState('');
    const [step, setStep] = useState(0);
    const [songsInfo, setSongsInfo] = useState({});
    const [likedSongs, setLikedSongs] = useState({});
    const [loading, setLoading] = useState(false);

    const submmitText = async (prompt) => {
        setStep(1);
        setLoading(true);
        if (!prompt.trim()) return alert('Por favor ingresa un texto.');
        try {
            const res = await fetch('http://localhost:3000/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: prompt }),
            });

            const data = await res.json();
            let cleanResult = data.result.replace(/```json|```/g, "").trim();
            setResult(JSON.parse(cleanResult));
            setLoading(false);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al obtener las recomendaciones.');
        }
    }

    const handleLikeAndSave = async (index, song) => {
        const user = auth.currentUser;
        if (!user) {
            toast.error("Debes iniciar sesión.", {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
                closeOnClick: true,
            });
            return;
        }
      
        setLikedSongs((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      
        if (!likedSongs[index]) {
          const userRef = doc(db, 'usuarios', user.uid);
      
          const songData = {
            name: song.name,
            artist: song.artist,
            image_url: song.image_url,
            spotify_url: song.spotify_url,
          };
      
          try {
            await updateDoc(userRef, {
              likedSongs: arrayUnion(songData),
            });
          } catch (err) {
                toast.error("Error al guardar la canción", {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                    closeOnClick: true,
                });
                return;
          }
        }
    };

    useEffect(() => {
        if (result?.songs?.length) {
            result.songs.forEach((song, index) => {
            fetch("http://localhost:3000/track-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: song.name, artist: song.artist }),
            })
                .then(res => res.json())
                .then(data => {
                setSongsInfo(prev => ({ ...prev, [index]: data }));
                });
            });
        }
    }, [result]);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div>
            {step === 0 && (
                <div className="flex flex-col justify-center items-center gap-6 mt-30 p-6 bg-[#41506b] rounded-3xl shadow-xl max-w-xl mx-auto">
  
                <h2 className="text-2xl font-bold text-white">✍️ ¡Escribe tu mensaje!</h2>
              
                <textarea
                  className="w-full min-h-[150px] p-4 rounded-2xl text-white text-base resize-none shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Escribe algo aquí..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              
                <button
                  onClick={() => submmitText(text)}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  🚀 Enviar
                </button>
              </div>
            )}

            {loading && (
                <div className="h-[90vh] flex flex-col items-center justify-center text-white text-center">
                    <div className="text-3xl font-bold mb-6">🎶 Generando tus recomendaciones...</div>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                </div>
            )}

            {result && (
            <div className="mt-4 p-4 rounded">
                <button
                    onClick={handleButtonClick}
                    className="absolute top-15 md:left-50 left-15 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
                >
                    ← Volver
                </button>
                <h3 className="font-bold text-white md:mt-0 mt-15 text-4xl mb-10">Te recomiendo escuchar estas canciones:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.songs
                .map((song, index) => ({
                    ...song,
                    ...songsInfo[index]
                }))
                .filter(item =>
                    item.name &&
                    item.artist &&
                    item.reason &&
                    item.image_url &&
                    item.spotify_url
                )
                .map((item, index) => (
                    <div
                    key={index}
                    className="p-4 bg-[#41506b] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                    <p className="text-2xl font-bold text-white">{item.name}</p>
                    <p className="text-orange-400">{item.artist}</p>
                    <p className="text-gray-200 mt-2">{item.reason}</p>

                    <div className="mt-4">
                        <img
                        src={item.image_url}
                        alt={`${item.name} album cover`}
                        className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <button
                        onClick={() => handleLikeAndSave(index, item)}
                        className={`text-2xl transition-transform duration-200 ${likedSongs[index] ? 'text-red-500 scale-110' : 'text-white hover:text-red-400'}`}
                        title={likedSongs[index] ? 'Ya te gusta' : 'Me gusta'}
                        >
                        {likedSongs[index] ? '❤️' : '🤍'}
                    </button>
                    {item.track_id && (
                    <div className="mt-4">
                        <iframe
                        style={{ borderRadius: '12px' }}
                        src={`https://open.spotify.com/embed/track/${item.track_id}?utm_source=generator`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        ></iframe>
                    </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
            )}

        </div>
    )
}

export default FreeInput;