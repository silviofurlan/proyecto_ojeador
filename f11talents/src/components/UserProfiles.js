import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '..';
import { PlayerCard } from './PlayerCard';
import { useGetMyProfiles } from '../hooks/useGetMyProfiles';
import { Link } from 'react-router-dom';

export default function UserProfiles() {
  const { token } = useContext(AuthTokenContext);
  const [myProfiles] = useGetMyProfiles(token);
  console.log('My profiles', myProfiles);
  return (
    <div className='contenedorWrapperCartas'>
      <div className='contenedorCartasUsuario'>
        <div className='tresColumnasCartas'>
          {myProfiles.length > 0 && myProfiles.length < 3
            ? myProfiles.map((profile) => (
                <>
                  {' '}
                  <div>
                    <PlayerCard
                      resume={profile}
                      avatar={profile.avatar}
                      key={profile.id}
                    />
                    <Link to={`/profiles?id=${profile.id}`}>Ver perfil</Link>
                  </div>
                  <Link to='/newprofile'>Añadir perfil</Link>
                </>
              ))
            : myProfiles.map((profile) => (
                <>
                  {' '}
                  <div>
                    <PlayerCard
                      resume={profile}
                      avatar={profile.avatar}
                      key={profile.id}
                    />
                  </div>
                  <Link to={`/profiles?id=${profile.id}`}>Ver perfil</Link>
                </>
              ))}
        </div>
      </div>
    </div>
  );
}
