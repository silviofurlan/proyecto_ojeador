import React from 'react';
import Avatar from './Avatar';
import '../estiloBusqueda.css';
import { PlayerResume } from './PlayerResume';

export const PlayerCard = ({ resume }) => {
  const { avatar, name, club, position, skills } = resume;
  const now = new Date();
  let age = now.getFullYear() - parseInt(resume.birthDate);

  return (
    <div id='contenedorCartas'>
      <div className='gridContenedor'>
        <div className='grid-itens'>
          <Avatar avatar={avatar} />
          <PlayerResume
            name={name}
            club={club}
            position={position}
            skill={skills}
            age={age}
          />
        </div>
      </div>
    </div>
  );
};
