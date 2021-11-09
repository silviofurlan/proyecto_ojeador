import { Redirect } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../../index';
import { useUserAccount } from '../../hooks/useUserAccount';
import UserProfiles from '../UserProfiles';
import { UserInfo } from '../UserInfo';

export default function MyAccount() {
  const { token } = useContext(AuthTokenContext);
  const [userAccount] = useUserAccount(token);

  if (token) {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='main'>
            <UserInfo resume={userAccount} />
            <UserProfiles />
          </div>
        </header>
      </div>
    );
  }
  return <Redirect to='/login' />;
}
