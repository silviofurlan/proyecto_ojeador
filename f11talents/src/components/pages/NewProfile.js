import Divisoria from "../Divisoria";
import NewProfileForm from "../NewProfileForm";
import { Link } from "react-router-dom";

export default function NewProfile() {
    return (
        <div>
            <Divisoria />
            <div className='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Compelta el formulário para crear el nuevo perfil</h1>
                </div>
            </div>

            <div className='wrapper'>
                <div className='contenedorWrapperFormCrearPerfil'>
                    <NewProfileForm />
                </div>

                <div className='botonVolver'>
                    <Link to='/micuenta' className='butvolver'>
                        <p className='butvolver'>Volver</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
