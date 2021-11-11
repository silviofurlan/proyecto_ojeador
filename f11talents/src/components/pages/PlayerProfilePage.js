import { Redirect } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { useGetProfile } from '../../hooks/useGetProfile';
import { PlayerCard } from '../PlayerCard';

export default function PlayerProfilePage(props) {
  const { token, user } = useContext(AuthTokenContext);
  const [profileData] = useGetProfile(token, props.id);
  // const profileId = Locale;
  console.log('profile', profileData);
  if (!token) {
    return <Redirect to='/login' />;
  }
  if (user.role === 'scout')
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='main'>
            <PlayerCard />
            {/* <ContactFamily/> */}
          </div>
        </header>
      </div>
    );
}
