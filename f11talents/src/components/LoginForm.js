import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { AuthTokenContext } from '..';
import { post } from '../api/api';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

export const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token, setToken, setUserId, setUserRole } =
    useContext(AuthTokenContext);

  if (token) {
    return <Redirect to='/' />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    const body = {
      email: email,
      password: password,
    };

    const handleServerResponse = (body) => {
      const userInfo = jwt_decode(body.token);
      setUserId(userInfo.id);
      setUserRole(userInfo.role);
      setToken(body.token);
    };

    post({
      url: 'http://localhost:4000/users',
      body,
      callback: handleServerResponse,
      onError: (error) => {
        setError('Error al hacer login. Revisa tus datos');
      },
    });
  };

  return (
    <>
      <section id='datosLogin'>
        <ul>
          <li>
            <form onSubmit={onSubmit} className='formLogin'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='password'>Contraseña</label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='submit'>Acceder</button>
              {error ? <p>{error}</p> : null}

              <Link to={`/recover`}>¿Has olvidado la contraseña?</Link>
            </form>
          </li>
        </ul>
      </section>
    </>
  );
};
