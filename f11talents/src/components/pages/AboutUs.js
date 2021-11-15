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

            <div className='datosContactar'>
                <p>
                    F11-Talents es una plataforma totalmente gratis que tiene
                    como finalidad aproximar la realización del sueño de un ser
                    jugador(a) profesional de fútbol.
                </p>
            </div>
        </div>
    );
}
