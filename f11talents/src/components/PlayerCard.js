import React from 'react';
import Avatar from './Avatar';
import '../estiloBusqueda.css';
import { PlayerResume } from './PlayerResume';
import { Link } from 'react-router-dom';

export const PlayerCard = ({ resume }) => {
  const { avatar, id, name, club, position, skills } = resume;
  const now = new Date();
  let age = now.getFullYear() - parseInt(resume.birthDate);

  return (
    <div id='contenedorCartas'>
      <div className='gridContenedor'>
        <Link to={`/profile?id=${id}`}>
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
        </Link>
      </div>
    </div>
  );
};
