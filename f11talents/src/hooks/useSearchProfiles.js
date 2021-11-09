import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

export const useSearchProfiles = (searchParams) => {
  const [searchResults, setProfilesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/search?${searchParams}`,
        });

        setProfilesList(data.results);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, []);
  return [searchResults, errorMessage];
};
