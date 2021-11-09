import React from 'react';
import { UserAccountData } from './UserAccountData';

export const UserInfo = ({ resume }) => {
  const { name, email } = resume;

  return (
    <div id='UserInfo'>
      <UserAccountData name={name} email={email} />
    </div>
  );
};
