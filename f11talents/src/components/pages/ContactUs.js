import Divisoria from "../Divisoria";
import { FormContact } from "../FormContact";

export default function ContactUs() {
    return (
        <div>
            <Divisoria />
            <div className='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Contactar con nosotros</h1>
                </div>
            </div>

            <div className='wrapper'>
                <div className='contenedorWrapperContactar'>
                    {/* <h1>Escríbanos un email</h1> */}
                    <div className='filaTextoContactar'>
                        Cualquier duda a este correo electrónico:
                        <div>
                            <br></br>
                            <strong>info@f11-talents.es</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contenedorWrapperContactarMapa'>
                <div className='contenedor-ContactarMapa'>
                    <div className='formulario'>
                        <FormContact />
                    </div>
                    <div className='mapa'></div>
                </div>
            </div>
        </div>
    );
}
