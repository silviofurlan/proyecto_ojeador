import { useContext, useState } from 'react/cjs/react.development';
import { AuthTokenContext } from '..';
import { useGetMyProfiles } from '../hooks/useGetMyProfiles';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export default function UserProfiles() {
  const { token } = useContext(AuthTokenContext);
  const [myProfiles] = useGetMyProfiles(token);
  const [errors, setErrors] = useState();
  const [ok, setOk] = useState('');
  const [id, setId] = useState();
  console.log(myProfiles);

  if (myProfiles.length < 3) {
    return (
      <div className='contenedorWrapperCartas'>
        <div className='contenedorCartasUsuario'>
          <div className='tresColumnasCartas'>
            {myProfiles.map((profile) => (
              <div key={profile.id}>
                <div className='userProfiles'>
                  <Avatar avatar={profile.avatar} />
                  <div>{profile.name}</div>
                  <Link to={`/profiles?id=${profile.id}`}>Ver perfil</Link>
                </div>
              </div>
            ))}
            <Link to='/newprofile' className='userProfiles'>
              <Avatar />
              <p>Añadir perfil</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='contenedorWrapperCartas'>
      <div className='contenedorCartasUsuario'>
        <div className='tresColumnasCartas'>
          {myProfiles.map((profile) => (
            <>
              {' '}
              <div className='userProfiles'>
                <Avatar avatar={profile.avatar} />
                <div>{profile.name}</div>

                <Link to={`/profiles?id=${profile.id}`}>Ver perfil</Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
