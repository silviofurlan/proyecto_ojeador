import Divisoria from "../Divisoria";
import NewProfileForm from "../NewProfileForm";

export default function NewProfile() {
    return (
        <div>
            <Divisoria />
            <div id='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Compelta el formulário para crear el nuevo perfil</h1>
                </div>
            </div>

            <NewProfileForm />
        </div>
    );
}
