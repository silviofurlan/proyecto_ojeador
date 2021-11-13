import Banner from '../Banner';
import { SearchForm } from '../SearchForm';

export default function SearchPage() {
  return (
    <div>
      <Banner />
      <div className='contenedorBanner'>
        <div className='dataBanner'>
          <h1>Búsqueda de Talentos</h1>
        </div>
      </div>

      <div className='wrapper'>
        <SearchForm />
      </div>
    </div>
  );
}
