import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../configuration/firebase';
import { logout } from '../configuration/authService';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
        return () => unsubscribe();
      }, []);
    
    const handleLogout = async () => {
        await logout()
        .then(() => {
            alert("Sesión cerrada");
          })
          .catch((error) => {
            console.error("Error al cerrar sesión:", error);
          });
        navigate('/');
    };

    const handleButtonClick = () => {
        navigate('/mood');
    };

    const handleButtonClick2 = () => {
        navigate('/login');
    };

    return (
        <>
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-4 shadow-md z-10 py-4 bg-[#41506b] rounded-4xl" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <a href="#inicio"><img src="https://i.postimg.cc/v8XSyg7f/Moodsic-Logo.png" alt="Moodsic Logo" className="w-16 h-16 object-contain cursor-pointer" /></a>
                <div className="ml-30">
                    <ul className="hidden md:flex flex-row gap-10 font-bold text-lg">
                        <li><a href="#inicio" className="cursor-pointer p-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200">Inicio</a></li>
                        <li><a href="#como-funciona" className="cursor-pointer p-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200">Como Funciona</a></li>
                        <li><a href="#funciones" className="cursor-pointer p-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200">Funciones</a></li>
                        <li><a href="#faq" className="cursor-pointer p-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200">Preguntas</a></li>
                        {user && (
                            <li><a href="/user-panel" className="cursor-pointer p-2 rounded-2xl hover:bg-blue-600 transition-colors duration-200">Perfil</a></li>
                        )}
                    </ul>
                </div>
                <div className="gap-2 flex">
                    {user ? (
                        <button
                            className="md:text-lg text-xs bg-red-500 hover:bg-red-700 text-white p-2 rounded-2xl transition-colors duration-200 cursor-pointer font-bold"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                        ) : (
                        <button
                            className="md:text-lg text-xs bg-green-500 hover:bg-green-700 text-white p-2 rounded-2xl transition-colors duration-200 cursor-pointer font-bold"
                            onClick={handleButtonClick2}
                        >
                            Iniciar Sesión
                        </button>
                    )}
                    <button className="md:text-lg text-xs bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-2xl transition-colors duration-200 cursor-pointer font-bold" onClick={handleButtonClick}>Explorar Mood</button>
                </div>
                <button className="md:hidden text-white p-2" aria-label="Abrir menú" onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
        </nav>
        {isOpen && (
            <div className="flex flex-col justify-center items-center fixed inset-0 bg-black bg-opacity-95 z-[100] space-y-8 text-2xl text-white font-bold">
                <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
                <a href="#como-funciona" onClick={() => setIsOpen(false)}>Como Funciona</a>
                <a href="#funciones" onClick={() => setIsOpen(false)}>Funciones</a>
                <a href="#faq" onClick={() => setIsOpen(false)}>Preguntas</a>
                {user && (
                    <a href="/user-panel" onClick={() => setIsOpen(false)}>Perfil</a>
                )}
                <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-white text-3xl" aria-label="Cerrar menú">✕</button>
            </div>
        )}
        </>
    );
}

export default Navbar;