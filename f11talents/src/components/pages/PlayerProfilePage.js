import { Redirect, useLocation } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { useGetProfile } from '../../hooks/useGetProfile';
import { PlayerCard } from '../PlayerCard';
import Divisoria from '../Divisoria';
import { ProfilePhotos } from '../ProfilePhotos';
import { ProfileVideos } from '../ProfileVideos';
export default function PlayerProfilePage() {
  const { token, user } = useContext(AuthTokenContext);
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const [profileData] = useGetProfile(id, token);

  if (!token) {
    return <Redirect to='/login' />;
  }

  if (!profileData) return <p>Cargando...</p>;

  return (
    <div className='main'>
      <Divisoria />
      <div className='contenedorBanner'>
        <div className='datosBanner'>
          <h1>
            {profileData.name}, {profileData.position}
          </h1>
        </div>
      </div>

      <div className='contenedorWrapperPrincipalPerfil'>
        <div className='contenedorWrapperPerfilJugador'>
          <PlayerCard resume={profileData} />
        </div>
        <ProfilePhotos profileData={profileData} />
      </div>

      <ProfileVideos profileData={profileData} />
    </div>
  );
}
