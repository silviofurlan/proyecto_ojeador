import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

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
