import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { useLocalStorage } from './hooks/useLocalStorage';

export const AuthTokenContext = React.createContext('');

const AuthTokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('', 'accessToken');
  const [userId, setUserId] = useLocalStorage('', 'userId');
  const [userRole, setUserRole] = useLocalStorage('', 'userRole');
  const [userName, setUserName] = useLocalStorage('', 'userName');
  const logout = () => {
    setToken('');
    setUserId('');
    setUserRole('');
    setUserName('');
  };

  return (
    <AuthTokenContext.Provider
      value={{
        token,
        setToken,
        user: { id: userId, role: userRole, name: userName },
        setUserId,
        setUserRole,
        setUserName,
        logout,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthTokenProvider>
      <App />
    </AuthTokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
