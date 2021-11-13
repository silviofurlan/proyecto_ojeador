import { Redirect, useLocation } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { useGetProfile } from '../../hooks/useGetProfile';
import { PlayerCard } from '../PlayerCard';

export default function PlayerProfilePage() {
  const { token, user } = useContext(AuthTokenContext);
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const [profileData, errorMessage] = useGetProfile(id, token);

  if (!token) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='main'>
      <section id='contenedorBanner'>
        <div class='datosBanner'>
          <h1>
            !Bien venido usuario <strong>Jugador!</strong>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
            voluptate veniam cum doloribus eum eaque, voluptatem sed. Quam
            corporis ea voluptatibus enim itaque, assumenda possimus iusto
            excepturi. Voluptates, consequatur excepturi!
          </p>
        </div>
      </section>

      <section id='contenedorDatosPersonales'>
        <section class='datosPesonales'>
          <PlayerCard
            resume={profileData}
            avatar={profileData.avatar}
            key={profileData.id}
          />
          <section className='fotosJugador'>
            <section class='contenedorSlider'>
              <ul className='sliderFotos'>
                {profileData.photos ? (
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

              <ul className='menuFotos'>
                <li>
                  <a href='#slide-1'>1</a>
                </li>
                <li>
                  <a href='#slide-2'>2</a>
                </li>
                <li>
                  <a href='#slide-3'>3</a>
                </li>
              </ul>
              <ul className='botonesFotos'>
                <button>Editar</button>
                <button>Guardar</button>
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
