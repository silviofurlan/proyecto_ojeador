import Banner  from '../Banner';
import { LoginForm } from '../LoginForm';

export default function Login() {
  return ( 
     <div>
    <Banner />
    <div id="contenedorBanner">
    <div className="datosBanner">
        <h1>Iniciar Sesión</h1>
    </div>
    </div>

    <LoginForm />
    </div>)

}
