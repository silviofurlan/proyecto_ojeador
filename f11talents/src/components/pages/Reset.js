import Banner from '../Banner';
import { ResetPassword } from '../ResetPassword';

export default function Reset() {
  return (
    <div>
      <Banner />
      <div className='datosBanner'>
        <h1>Elige una nueva contraseña</h1>
      </div>
      <ResetPassword />
    </div>
  );
}
