import LoginForm from "../components/LoginForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <LoginForm />
            <ToastContainer/>
        </div>
    );
}

export default Login;