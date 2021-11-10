import { PlayerCard } from '../PlayerCard';
import { useSearchProfiles } from '../../hooks/useSearchProfiles';
import { SearchForm } from '../SearchForm';

export default function SearchPage() {

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          <section id='introContenedor'>
            <h1>
              <span>Búsqueda de Talentos</span>
            </h1>
          </section>
          

          <div id='contenedorCartas'>
      <div className='gridContenedor'>
      </div>
   
            <SearchForm />
          </div>

          {/* {results.length > 0
            ? results.map((profile) => (
                <PlayerCard
                  resume={profile}
                  avatar={profile.avatar}
                  key={profile.id}
                />
              ))
            : 'No hay datos'} */}
        </div>
      </header>
    </div>
  );
}

