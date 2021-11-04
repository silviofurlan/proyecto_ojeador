import { useState, useEffect } from 'react';
import { fetchData } from '../api/api';

export const useGetProfile = (token, id) => {
  const [profileData, setProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/profiles/${id}`,
          token,
        });

        setProfileData(data.profile);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, [token, id]);
  return [profileData, errorMessage];
};
