import { useState, useEffect } from "react";
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../configuration/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { toast } from 'react-toastify';

const GuidedForm = () => {

    const [step, setStep] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [intensity, setIntensity] = useState(5);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [likedSongs, setLikedSongs] = useState({});
    const [songsInfo, setSongsInfo] = useState({}); 

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
          }
        }
    };

    useEffect(() => {
    if (result?.songs?.length) {
        result.songs.forEach((song, index) => {
        fetch(`${backendUrl}/track-info`, {
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

    const emociones = [
        {
            title: "Feliz",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2x0eDV5cTY0bzJ6cDY2eWxsMThlZGJ1Yjc1eW04YmJjeG9ycWphaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdfyKrN7HGTIY/giphy.gif"
        },
        {
            title: "Triste",
            img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjBybzVndzhiNjdhcjV3MXRoN3B6N2VxYWRjczBoYjlnM2Q5MWcxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10tIjpzIu8fe0/giphy.gif"
        },
        {
            title: "Ansioso",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM21hODFzbTJ1aGNqN3BxdmNhd2Y4OGNtNHAwODh5NHNuM3Vpdm43NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fu2NNkJVuULPBWexiJ/giphy.gif"
        },
        {
            title: "Relajado",
            img: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTNtbHR0NXZtNmxiczY2aTB2am82ZWd6MWJhNDdkdWU0cXg1NzZyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/piO6cmvxIK0A05MNkY/giphy.gif"
        },
        {
            title: "Enojado",
            img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzNiZ240eGg1NTBmbncyM3BwbGVnanVqeTh2cnQ4eGoxemc2NDh4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11tTNkNy1SdXGg/giphy.gif"
        },
        {
            title: "Emocionado",
            img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW1laXkzOHU3bDAxYnJteTh5MHJpbTFvZ2didzIyd2ozN2Z1d3V5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11sBLVxNs7v6WA/giphy.gif"
        },
        {
            title: "Nostalgico",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3h5aWJ0c210dnByazNrdDd1cXhyMDF5NjRmNmMxNWhnbTRtNXE3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ISOckXUybVfQ4/giphy.gif"
        },
        {
            title: "Motivado",
            img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGhxMDk5djZ1ZGU3MmpqZHh3Nmdkb2NjZm10Nmp5YmZoOXB6bGNzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NtFZQIhDj7tN0NoM3s/giphy.gif"
        },
        {
            title: "Aburrido",
            img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzBhcjB5MTBxczI0NnFhamFiZmYyNDh5NHEzaWNsa3Y1cWw5cmhxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RKS1pHGiUUZ2g/giphy.gif"
        }
    ]

    const actividad = [
        {
            title: "Trabajando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdndzajR2aWxid2dqaDNvZGswaGYxdDZuYzZyaTk5YWhtYmc4eHl0MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13rQ7rrTrvZXlm/giphy.gif"
        },
        {
            title: "Estudiando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNmenNicThibnUzdjVydXl0NzltNDU3eW1maXNiODVsZmp6dzhyNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IPbS5R4fSUl5S/giphy.gif"
        },
        {
            title: "Caminando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanllM3NqNzhyZjNlbng2Zzg2cDRiMGp5ZmxveHhzNDhsYnl1eDgyOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QpWDP1YMziaQw/giphy.gif"
        },
        {
            title: "Descansando",
            img: "https://media.giphy.com/media/V23RNlUq2yo1bEB5ff/giphy.gif?cid=ecf05e479t9rdrx1pxbh3g95i89vl0jtf8koxqc4pvob3y9a&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        },
        {
            title: "Viajando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHdiaHpzdDVrczdjNHA0Mmtud251cG5sODMyNHhsaHRyMnpkZXJsbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lXC2gmHf2ypUs/giphy.gif"
        },
        {
            title: "Cocinando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMno2YnY0cmk4Y2R3c2ZxZ2hmbDN6ZW96eTdyOWR0cXh0MTFkdWwycyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hbd8nlok7kqnS/giphy.gif"
        },
        {
            title: "Limpiando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnZycnBsajZwbDA0cGljNGNmaDh1bnY3dXdzczJpeXNhZXl6N2U4cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NV4cSrRYXXwfUcYnua/giphy.gif"
        },
        {
            title: "Meditando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzg2MzBkcXJoN2V1eXdrbHpkN3pycmt0d2RndjgxOXcwb3lpYzkzeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H7kfFDvD9HSYGRbvid/giphy.gif"
        },
        {
            title: "Llorando",
            img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDY5Mjc4dDJsemtqMzNvcjZha3d5YXBqYTlrOWt3a3U3cW5uNWhlMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6wrvdHFbwBrUFenu/giphy.gif"
        }
    ]

    const genres = [
        { name: "Lo-fi", icon: "🌙" },
        { name: "Rock", icon: "🎸" },
        { name: "Pop", icon: "🎤" },
        { name: "Jazz", icon: "🎷" },
        { name: "Electrónica", icon: "🎛️" },
        { name: "Clásica", icon: "🎻" },
        { name: "Indie", icon: "🪕" },
        { name: "Hip-hop", icon: "🎧" },
        { name: "Ambiental", icon: "🌿" },
        { name: "R&B", icon: "💃" },
        { name: "Trap", icon: "🔊" },
        { name: "Reggaeton", icon: "🔥" },
    ];

    const handleSubmit = async (prompt) => {
        if (!prompt.trim()) return alert('Por favor ingresa un texto.');
        try {
            const res = await fetch(`${backendUrl}/playlist`, {
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
    };

    const toggleGenre = (genre) => {
        setSelectedGenres((prev) => {
          if (prev.includes(genre)) {
            return prev.filter((g) => g !== genre);
          } else if (prev.length < 3) { // Límite opcional
            return [...prev, genre];
          }
          return prev;
        });
    };

    const generarPrompt = () => {
        const emocion = selectedEmotion ? selectedEmotion : 'una emoción no especificada';
        const actividadActual = selectedActivity ? selectedActivity : 'una actividad no especificada';
        const estilos = selectedGenres.length > 0 ? selectedGenres.join(', ') : 'ningún estilo de música en particular';
    
        return `Quiero escuchar música porque me siento ${emocion.toLowerCase()} con una intensidad de ${intensity}/10. 
    Estoy ${actividadActual.toLowerCase()} y me gustan los siguientes estilos musicales: ${estilos}.`;
    };

    const handleGenerate = () => {
        setLoading(true);
        setStep(5);
        const nuevoPrompt = generarPrompt();
        setPrompt(nuevoPrompt);
        handleSubmit(nuevoPrompt);
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };
    
    return (
        <div className="w-full">
            {step === 1 && (
                <div>
                    <h3 className="font-bold text-4xl mb-10">¿Cómo te sientes ahora?</h3>
                    <div className="px-6 md:px-20 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {emociones.map((e, indx) => (
                        <div key={indx} onClick={() => setSelectedEmotion(e.title)} className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-[1.05] shadow-md hover:shadow-xl ${
                            selectedEmotion === e.title ? "ring-4 ring-green-400 scale-[1.07]" : "bg-[#35bcbf]"
                        }`} style={{ animation: "fadeIn 0.5s ease", animationDelay: `${indx * 100}ms` }}>
                            <img src={e.img} alt={e.title} className="h-30 w-full object-cover" />
                            <p className="p-2 text-xl font-semibold text-white">{e.title}</p>
                            {selectedEmotion === e.title && (
                            <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full p-1 shadow">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            )}
                        </div>
                        ))}
                    </div>
                    {selectedEmotion && (
                        <div className="mt-10 text-center">
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                        >
                            Continuar ➡️
                        </button>
                        </div>
                    )}
                </div>
            )}

            {step === 2 && (
                <div className="mt-50 px-6 md:px-20 gap-10 flex flex-col">
                <h3 className="text-4xl font-bold mb-4">¿Con qué intensidad te sientes <span className="text-orange-600">{selectedEmotion}</span>?</h3>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white">1</span>
                    <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="w-full accent-orange-600"
                    />
                    <span className="text-sm text-white">10</span>
                </div>
                <p className="mt-2 text-white">Intensidad: <strong>{intensity}</strong></p>

                <div className="mt-8 flex justify-between">
                    <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                    >
                    ⬅️ Volver
                    </button>
                    <button
                    type="submit"
                    onClick={() => setStep(3)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                    >
                    Continuar ➡️
                    </button>
                </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3 className="font-bold text-4xl mb-10">¿Qué estás haciendo?</h3>
                    <div className="px-6 md:px-20 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {actividad.map((e, indx) => (
                        <div key={indx} onClick={() => setSelectedActivity(e.title)} className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-[1.05] shadow-md hover:shadow-xl ${
                            selectedActivity === e.title ? "ring-4 ring-green-400 scale-[1.07]" : "bg-[#35bcbf]"
                        }`} style={{ animation: "fadeIn 0.5s ease", animationDelay: `${indx * 100}ms` }}>
                            <img src={e.img} alt={e.title} className="h-30 w-full object-cover" />
                            <p className="p-2 text-xl font-semibold text-white">{e.title}</p>
                            {selectedActivity === e.title && (
                            <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full p-1 shadow">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            )}
                        </div>
                        ))}
                    </div>

                    {selectedActivity && (
                        <div className="mt-8 flex justify-between">
                        <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                        >
                        ⬅️ Volver
                        </button>
                        <button
                        type="submit"
                        onClick={() => setStep(4)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                        >
                        Continuar ➡️
                        </button>
                    </div>
                    )}
                </div>
            )}

            {step === 4 && (
                <div className="px-6 md:px-20">
                    <h3 className="text-4xl font-bold mb-6 text-center">¿Qué tipo de música te gusta?</h3>
                    <p className="text-gray-300 text-center mb-8">Elige hasta 3 géneros que más te gusten 🎧</p>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {genres.map(({ name, icon }) => {
                        const selected = selectedGenres.includes(name);
                        return (
                        <button
                            key={name}
                            onClick={() => toggleGenre(name)}
                            className={`transition-all rounded-2xl p-6 border text-center shadow-sm hover:shadow-md 
                            ${selected ? "bg-green-500 text-white border-green-500 shadow-lg scale-105" 
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                        >
                            <div className="text-4xl mb-2">{icon}</div>
                            <div className="font-semibold">{name}</div>
                        </button>
                        );
                    })}
                    </div>

                    <div className="mt-10 flex justify-between items-center">
                    <button
                        onClick={() => setStep(3)}
                        className="bg-gray-400 hover:bg-gray-600 text-white font-medium py-2 px-5 rounded-full cursor-pointer transition-all duration-200"
                    >
                        ⬅️ Volver
                    </button>

                    {selectedGenres.length > 0 && (
                        <button
                        onClick={() => handleGenerate()}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full cursor-pointer transition-all duration-200"
                        >
                        Continuar ➡️
                        </button>
                    )}
                    </div>
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
    );
}

export default GuidedForm;