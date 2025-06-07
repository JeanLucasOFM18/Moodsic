import { useEffect, useState } from 'react';
import { auth, db } from '../configuration/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../configuration/authService';

const UserPanel = () => {

  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setNewName(docSnap.data().name);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleRecomendar = async () => {
    navigate('/mood');
  };

  const home = async () => {
    navigate('/');
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const updates = { name: newName };

    await updateDoc(doc(db, 'usuarios', user.uid), updates);
    setEditing(false);
  };

  return (
    <div className="min-h-screen text-white p-6 flex flex-col gap-6 items-center">

      <h1 className="text-xl lg:text-5xl font-bold">🎧 Bienvenido, {userData?.name} 🎧</h1>

      {!editing && (
        <button onClick={() => setEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Editar Perfil
        </button>
      )}

      {editing && (
        <div className="bg-[#2e3b4e] p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
          <label>Nombre:
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="text-white w-full p-2 rounded" />
          </label>

          <button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Guardar cambios
          </button>

          <button onClick={() => setEditing(false)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      )}
        <div className="text-white p-4 rounded-lg shadow-lg text-center w-full max-w-md bg-[#41506b]">
            <h2 className="lg:text-xl font-semibold">¿Listo para descubrir nueva música?</h2>
            <div className='flex gap-5 items-center justify-center'>
              <button
              onClick={home}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 cursor-pointer"
              >
              Ir al Home
              </button>
              <button
              onClick={handleRecomendar}
              className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
              >
              Generar recomendaciones
              </button>
            </div>
            <img src='https://i.postimg.cc/gkSJ5Z4C/userpanel.png' alt='Personas escuchando música' className='bottom-0 w-full max-w-5xl object-contain z-1' />
        </div>

        <div className="w-full max-w-3xl">
            <h3 className="text-2xl mt-6 mb-2">Tus canciones favoritas:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData?.likedSongs?.map((cancion, i) => (
                <div
                key={i}
                className="p-4 bg-[#41506b] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                <p className="text-2xl font-bold text-white">{cancion.name}</p>
                <p className="text-orange-400">{cancion.artist}</p>
                <p className="text-gray-200 mt-2">{cancion.reason}</p>

                <div className="mt-4">
                    <img
                    src={cancion.image_url}
                    alt={`${cancion.name} album cover`}
                    className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
                <a
                    href={cancion.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block w-full px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                    Escuchar en Spotify
                </a>
                </div>
            ))}
            </div>
        </div>

        <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
            Cerrar sesión
        </button>
    </div>
  );
};

export default UserPanel;