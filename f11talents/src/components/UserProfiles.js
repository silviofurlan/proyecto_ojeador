import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '..';
import { PlayerCard } from './PlayerCard';
import { useGetMyProfiles } from '../hooks/useGetMyProfiles';

export default function UserProfiles() {
  const { token } = useContext(AuthTokenContext);
  const [myProfiles] = useGetMyProfiles(token);
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          {myProfiles.length > 0
            ? myProfiles.map((profile) => (
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
