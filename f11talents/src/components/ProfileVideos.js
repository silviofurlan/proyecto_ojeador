import React from 'react';

export const ProfileVideos = ({ profileData }) => {
  const { videosUrl } = profileData;
  console.log('video', videosUrl);
  return (
    <div className='contenedorWrapperPerfilJugador'>
      <section className='videos'>
        <section className='grid-item'>
          <div>
            {videosUrl.length > 0 ? (
              videosUrl.map((video) => (
                <iframe
                  className='iframeVideo'
                  width='260'
                  height='215'
                  src={video}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ))
            ) : (
              <div className='sinvideo'>
                <h1> Este juganor no tiene vídeos </h1>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};
