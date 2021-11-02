import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

export const useListProfiles = () => {
  const [profilesList, setProfilesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({ url: 'http://localhost:4000/profiles' });

        setProfilesList(data.results);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, []);
  return [profilesList, errorMessage];
};
