import React from 'react';
import Avatar from './Avatar';
import { PlayerProfileResume } from './PlayerProfileResume';

export const PlayerProfileCard = ({ resume }) => {
  const { avatar, name, club, position, skills } = resume;
  console.log('RESUME', resume);
  return (
    <div id='PlayerProfileCard'>
      <Avatar avatar={avatar} />
      <PlayerProfileResume
        name={name}
        club={club}
        position={position}
        skill={skills}
      />
    </div>
  );
};
