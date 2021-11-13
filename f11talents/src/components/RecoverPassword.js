import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { put } from '../api/api';

export const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    const body = {
      email: email,
    };

    put({
      url: 'http://localhost:4000/users/password/recover',
      body,
      onError: (error) => {
        setError('Error al hacer login. Revisa tus datos');
      },
    });
  };

  return (
    <>
      <section>
        <ul>
          <li>
            <form onSubmit={onSubmit} className='formLogin'>
              <label htmlFor='email'>
                Introduce tu correo electrónico para recuperar tu cuenta.
              </label>
              <input
                type='text'
                name='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type='submit'>Buscar</button>
              {error ? <p>{error}</p> : null}
              <Link to='/login' className='btn-cancel'>
                Cancelar
              </Link>
            </form>
          </li>
        </ul>
      </section>
    </>
  );
};
