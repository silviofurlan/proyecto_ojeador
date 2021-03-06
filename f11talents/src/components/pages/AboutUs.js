import Divisoria from "../Divisoria";

export default function AboutUs() {
    return (
        <div>
            <Divisoria />
            <div className='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Sobre nosotros</h1>
                </div>
            </div>

            <>
                <div className='wrapper'>
                    <div className='pagHome'>
                        <div className='filaTexto'>
                            F11-Talents es una plataforma totalmente gratís que
                            tiene como finalidad aproximar la realización del
                            sueño de un ser jugador(a) profesional de fútbol.
                        </div>
                        <div className='filaTexto'>
                            El Compromiso f11-Talents con nuestros clientes es
                            el de prestar un servicio permanente y personalizado
                            con la máxima difusión de los perfiles online
                            registrados en la plataforma. Pedimos a los
                            futbolistas, padres y ojeadores que depositan su
                            confianza en nosotros un comportamiento intachable,
                            seriedad, sentido de la responsabilidad y el máximo
                            interés y esfuerzo a la hora de intentar llegar lo
                            más lejos posible en la carrera deportiva.
                        </div>

                        <div className='filaTexto'>
                            Prestamos nuestros servicios a futbolistas
                            profesionales y aficionados, clubes y jóvenes
                            promesas. Te promocionaremos al máximo en internet.
                            En la mayor brevedad nos pondremos en contacto
                            contigo, para publicitarte si nos encaja tu perfil y
                            promocionarte online en un mundo donde cada vez hay
                            más contactos y más oportunidades mediante el uso de
                            las nuevas tecnologías.
                        </div>
                    </div>
                    <div className='contenedorWrapperContactarMapa'>
                        <div className='contenedor-NosotrosFoto'>
                            <div className='foto'></div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}
