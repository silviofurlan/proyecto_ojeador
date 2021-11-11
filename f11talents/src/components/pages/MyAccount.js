import { Redirect } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../../index';
import { useUserAccount } from '../../hooks/useUserAccount';
import UserProfiles from '../UserProfiles';
import { UserInfo } from '../UserInfo';

export default function MyAccount() {
  const { token, user } = useContext(AuthTokenContext);
  const [userAccount] = useUserAccount(token);

  if (token) {
    console.log('Role', user.role);
    if (!user.role === 'family') {
      return (
        <div className='App'>
          <header className='App-header'>
            <div className='main'>
              <UserInfo resume={userAccount} />
            </div>
          </header>
        </div>
      );
    }
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
