import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { useUserAccount } from '../../hooks/useUserAccount';
import { UserProfile } from '../UserProfile';

export default function MyAccount() {
  const { token } = useContext(AuthTokenContext);
  const [userAccount] = useUserAccount(token);

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          {userAccount.length > 0
            ? userAccount.map((userInfo) => (
                <UserProfile resume={userInfo} key={userInfo.id} />
              ))
            : 'No hay datos'}
        </div>
      </header>
    </div>
  );
}
