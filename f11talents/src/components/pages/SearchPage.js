import { PlayerCard } from '../PlayerCard';
import { useListProfiles } from '../../hooks/useListProfiles';
import { SearchForm } from '../SearchForm';

export default function SearchPage() {
  const [profilesList] = useListProfiles();

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          <section id='introContenedor'>
            <h1>
              <span>Búsqueda de Talentos</span>
            </h1>
          </section>
          <div>
            <SearchForm />
          </div>
          {profilesList.length > 0
            ? profilesList.map((profile) => (
                <PlayerCard
                  resume={profile}
                  avatar={profile.avatar}
                  key={profile.id}
                />
              ))
            : 'No hay datos'}
        </div>
      </header>
    </div>
  );
}
