import { Redirect, useLocation } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { useGetProfile } from '../../hooks/useGetProfile';
import Avatar from '../Avatar';
import { PlayerCard } from '../PlayerCard';

export default function PlayerProfilePage() {
  const { token, user } = useContext(AuthTokenContext);
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const [profileData, errorMessage] = useGetProfile(id, token);

  if (!token) {
    return <Redirect to='/login' />;
  }
  if (user.id === profileData.idUser) console.log(user.id, profileData.idUser);
  return (
    <div className='main'>
      <section className='contenedorDatosPersonales'>
        <section class='datosPesonales'>
          <PlayerCard
            resume={profileData}
            avatar={profileData.avatar}
            key={profileData.id}
          />
          <section className='fotosJugador'>
            <section class='contenedorSlider'>
              <ul className='sliderFotos'>
                {profileData.photos && profileData.photos.length > 6 ? (
                  profileData.photos.map((photo) => (
                    <li className='slider-1'>
                      <img
                        src={`http://localhost:4000/fotos/${photo}`}
                        alt='Foto Jugador'
                      />
                    </li>
                  ))
                ) : (
                  <button className='botonesFotos'>Añadir Fotos</button>
                )}
              </ul>
            </section>
          </section>

          <section className='videos'>
            <section class='grid-item'>
              <iframe
                className='iframeVideo'
                width='260'
                height='215'
                src={profileData.videosUrl}
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
