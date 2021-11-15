import Intro from "../Intro";

import Register from "./Register";
// import SearchCase from '../SearchCase';
import { useContext } from "react/cjs/react.development";
import { AuthTokenContext } from "../..";

export default function Home() {
    const { token } = useContext(AuthTokenContext);

    if (!token) {
        return (
            <>
                <Intro />
                <div className='wrapper'>
                    <Register />
                </div>
            </>
        );
    } else {
        return (
            <>
                <Intro />
                <div className='wrapper'>
                    <div className='pagHome'>
                        <div className='filaTexto'>
                            El Compromiso f11-Talents con nuestros clientes es
                            el de prestar un servicio permanente y personalizado
                            con la máxima difusión de los perfiles online
                            registrados en la plataforma. Pedimos a los
                            futbolistas, padres y ojeadors que depositan su
                            confianza en nosotros un comportamiento intachable,
                            seriedad, sentido de la responsabilidad y el máximo
                            interés y esfuerzo a la hora de intentar llegar lo
                            más lejos posible en la carrera deportiva.
                        </div>

                        <div className='filaTexto'>
                            Prestamos nuestros servicios a futbolistas
                            profesionales y aficionados, clubes y jóvenes
                            promesas. Si tienes entre 5 y 18 años y quieres
                            obtener oportunidades a tu medida en el mundo del
                            fútbol, contacta con nosotros. Te promocionaremos al
                            máximo en internet. En la mayor brevedad nos
                            pondremos en contacto contigo, para publicitarte si
                            nos encaja tu perfil y promocionarte online en un
                            mundo donde cada vez hay más contactos y más
                            oportunidades mediante el uso de las nuevas
                            tecnologías.
                        </div>
                        <div className='casosExito'>
                            <div className='columnas'>
                                <img
                                    src='https://source.unsplash.com/400x400?soccer'
                                    alt='foto'
                                />
                            </div>

                            <div className='columnas'>
                                <img
                                    src='https://source.unsplash.com/400x400?soccer'
                                    alt='foto'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
