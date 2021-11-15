import React from 'react';

export const ProfilePhotos = ({ profileData }) => {
  const { photos } = profileData;
  let i = 1;
  return (
    <section className='contenedorWrapperPerfilJugador'>
      <section className='contenedorSlider'>
        <div>
          {photos.length > 0 ? (
            <ul className='sliderFotos'>
              {photos.map((photoName) => (
                <li className={`slider-${i++}`} key={photoName}>
                  <img
                    src={`http://localhost:4000/fotos/${photoName}`}
                    alt='Foto Jugador'
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className='sinfoto'>
              <h1> Este juganor no tiene fotos </h1>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};
