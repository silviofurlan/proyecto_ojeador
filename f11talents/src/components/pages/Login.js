import Divisoria from "../Divisoria";
import { LoginForm } from "../LoginForm";

export default function Login() {
    return (
        <div>
            <Divisoria />
            <div className='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Iniciar Sesión</h1>
                </div>
            </div>

            <div className='wrapper'>
                <div className='contenedorWrapperLogin'>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
