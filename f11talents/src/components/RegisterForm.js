import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { post } from '../api/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_role, setUserRole] = useState('');
  const [token, setToken] = useLocalStorage('', 'accessToken');

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
      name: user_name,
      role: user_role,
    };
    const handleServerResponse = (body) => {
      console.log(body);
      setToken(body.token);
    };
    post({
      url: 'http://localhost:4000/register',
      body,
      callback: handleServerResponse,
    });
  };

  if (token) {
    return <Redirect to='/profiles' />;
  }

  return (
    <>
      <h2>Registro</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          name='nombre'
          id='nombre'
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor='name'>Tipo de Cuenta</label>
        <select
          id='role'
          value={user_role}
          onChange={(e) => setUserRole(e.target.value)}
        >
          {' '}
          <option value='' disabled>
            Selecciona un usuario
          </option>
          <option value='family'>Familia</option>
          <option value='scout'>Ojeador</option>
        </select>
        <label htmlFor='email'>email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Enviar</button>
        <br />
        <br />
      </form>
    </>
  );
};
