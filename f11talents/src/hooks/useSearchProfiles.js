import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

export const useSearchProfiles = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/search`,
        });

        setResults(data.results);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, []);
  return [results, errorMessage];
};
