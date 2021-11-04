import { Redirect } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../../index';
import { useUserAccount } from '../../hooks/useUserAccount';

import { UserProfile } from '../UserInfo';

export default function MyAccount() {
  const { token } = useContext(AuthTokenContext);
  const [userAccount] = useUserAccount(token);

  if (token) {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='main'>
            <UserProfile resume={userAccount} />
          </div>
        </header>
      </div>
    );
  }
  return <Redirect to='/login' />;
}
