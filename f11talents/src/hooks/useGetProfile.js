import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

export const useGetProfile = (id, token) => {
  const [profileData, setProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/profiles/${id}`,
          token,
        });
        setProfileData(data.profileInfo);
        console.log('ProfileInfo', data.profileInfo);
        // setErrorMessage();
      } catch (error) {
        // setErrorMessage(error.message);
      }
    };
    getData();
  }, [id, token]);
  return [profileData, errorMessage];
};
