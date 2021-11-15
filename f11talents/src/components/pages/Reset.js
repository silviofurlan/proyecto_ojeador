import Divisoria from "../Divisoria";
import { ResetPassword } from "../ResetPassword";

export default function Reset() {
    return (
        <div>
            <Divisoria />
            <div className='datosBanner'>
                <h1>Elige una nueva contraseña</h1>
            </div>
            <ResetPassword />
        </div>
    );
}
