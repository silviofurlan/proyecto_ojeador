import { Redirect } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../../index';
import { useUserAccount } from '../../hooks/useUserAccount';
import UserProfiles from '../UserProfiles';
import { UserInfo } from '../UserInfo';
import Banner from '../Banner';

export default function MyAccount() {
  const { token, user } = useContext(AuthTokenContext);
  const [userAccount] = useUserAccount(token);

  if (token) {
    console.log('Role', user.role);
    if (user.role === 'scout') {
      return (
        <>
          <Banner />
          <div className='contenedorBanner'>
            <div className='datosBanner'>
              <UserInfo resume={userAccount} />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <Banner />
        <div className='contenedorBanner'>
          <div className='datosBanner'>
            <UserInfo resume={userAccount} />
            <UserProfiles />
          </div>
        </div>
      </>
    );
  }
  return <Redirect to='/login' />;
}
