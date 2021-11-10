import Banner  from '../Banner';
import { LoginForm } from '../LoginForm';

export default function ContactUs() {
  return ( 
     <div>
    <Banner />
    <div id="contenedorBanner">

    <div className="datosBanner">
        <h1>Contactar con nosotros</h1>
    </div>
    </div>

    <div className="datosContactar">
        <h1>Escríbanos un email</h1>
        <p>Cualquier duda a este correo electrónico:

        <strong>info@f11-talents.es</strong>

    </p>
    </div>

    </div>)

}
  