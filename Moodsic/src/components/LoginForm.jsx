import { useState } from 'react';
import { login } from '../configuration/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {
            toast.error("Completa todos los campos.", {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
                closeOnClick: true,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("El correo electrónico no es válido.", {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
                closeOnClick: true,
            });
            return;
        }

        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres.", {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
                closeOnClick: true,
            });
            return;
        }

        try {
            await login(email, password);
            navigate('/user-panel');
        } catch (error) {
            toast.error("Credenciales incorrectas o usuario no registrado.", {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
                closeOnClick: true,
            });
        }
    };

    return (
        <div className="mt-15 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800">
            <div className="px-8 py-10 md:px-10">
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">¡Bienvenido de nuevo!</h2>
                <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">Nos alegra verte otra vez. Inicia sesión para continuar.</p>
                <div className="mt-10">
                    <div className="relative">
                        <input placeholder="nombre@ejemplo.com" className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mt-6">
                        <input placeholder="••••••••" className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mt-10">
                        <button className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 cursor-pointer" type="submit" onClick={handleLogin}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
            <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
                <div className="text-sm text-blue-900 dark:text-blue-300 text-center">¿No tienes una cuenta?
                    <a className="font-medium underline ml-2" href="/register">Regístrate</a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;