import React from 'react';
import { UserAccountData } from './UserAccountData';

export const UserProfile = ({ resume }) => {
  const { name, email } = resume;

  return (
    <div id='UserProfile'>
      <UserAccountData name={name} email={email} />
    </div>
  );
};
