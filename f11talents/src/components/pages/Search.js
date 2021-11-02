import { PlayerProfileCard } from '../ProfileCard';
import { useListProfiles } from '../../hooks/useListProfiles';

export default function Search() {
  const [profilesList] = useListProfiles();
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          {profilesList.length > 0
            ? profilesList.map((profile) => (
                <PlayerProfileCard
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
