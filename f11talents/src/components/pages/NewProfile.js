import Banner from '../Banner';
import NewProfileForm from '../NewProfileForm';

export default function NewProfile() {
  return (
    <div>
      <Banner />
      <div id='contenedorBanner'>
        <div className='datosBanner'>
          <h1>Compelta el formulário para crear el nuevo perfil</h1>
        </div>
      </div>

      <NewProfileForm />
    </div>
  );
}
