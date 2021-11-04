import { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '..';
import { fetchData } from '../api/api';
import { PlayerCard } from './PlayerCard';

export const useGetMyProfiles = (token) => {
  const [myProfiles, setUserAccount] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/users/${window.localStorage.getItem(
            'userId'
          )}/profiles`,
          token,
        });

        setUserAccount(data.userProfiles);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, [token]);
  return [myProfiles, errorMessage];
};

export default function MyProfiles() {
  const { token } = useContext(AuthTokenContext);
  const [myProfiles] = useGetMyProfiles(token);
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='main'>
          {myProfiles.length > 0
            ? myProfiles.map((profile) => (
                <PlayerCard
                  resume={profile}
                  avatar={profile.avatar}
                  key={profile.id}
                />
              ))
            : 'No hay datos'}
        </div>
      </header>
    </div>
  );
}
