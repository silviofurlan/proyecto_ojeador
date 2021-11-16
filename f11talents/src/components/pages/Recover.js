import Divisoria from "../Divisoria";
import { RecoverPassword } from "../RecoverPassword";

export default function Recover() {
    return (
        <>
            <div>
                <Divisoria />
                <div className='contenedorBanner'>
                    <div className='datosBanner'>
                        <h1>Recupera tu cuenta</h1>
                    </div>
                </div>

                <div className='wrapper'>
                    <RecoverPassword />
                </div>
            </div>
        </>
    );
}
