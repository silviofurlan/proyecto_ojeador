import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

export const useUserAccount = (token) => {
  const [userAccount, setUserAccount] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/users/${window.localStorage.getItem(
            'userId'
          )}`,
          token,
        });

        setUserAccount(data.userInfo);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, [token]);
  return [userAccount, errorMessage];
};
