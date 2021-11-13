import Banner from '../Banner';
import { RecoverPassword } from '../RecoverPassword';

export default function Recover() {
  return (
    <>
      <div>
        <Banner />
        <div className='datosBanner'>
          <h1>Recupera tu cuenta</h1>
        </div>
        <RecoverPassword />
      </div>
    </>
  );
}
