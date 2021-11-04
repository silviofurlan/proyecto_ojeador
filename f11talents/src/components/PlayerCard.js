import React from 'react';
import Avatar from './Avatar';

import { PlayerResume } from './PlayerResume';
import { Link } from 'react-router-dom';

export const PlayerCard = ({ resume }) => {
  const { avatar, id, name, club, position, skills } = resume;
  const now = new Date();
  let age = now.getFullYear() - parseInt(resume.birthDate);

  return (
    <div id='PlayerCard'>
      <Link to={`/profiles/${id}`}>
        <Avatar avatar={avatar} />
        <PlayerResume
          name={name}
          club={club}
          position={position}
          skill={skills}
          age={age}
        />
      </Link>
    </div>
  );
};
