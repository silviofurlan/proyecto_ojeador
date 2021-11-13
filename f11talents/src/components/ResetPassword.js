import React, { useState } from 'react';

import { put } from '../api/api';

export const ResetPassword = () => {
  const [code, setRecoverCode] = useState('');
  const [password, setNewPassword] = useState('');
  const [errors, setErrors] = useState();
  const [ok, setOk] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      recoverCode: code,
      newPassword: password,
    };

    put({
      url: 'http://localhost:4000/users/password/reset',
      body,
      callback: (response) => {
        setOk(response.message);
      },
      onError: (response) => {
        setErrors({ ...errors, serverResponse: response.message });
      },
    });
  };
  if (ok) return <p style={{ color: 'green' }}>{ok}</p>;
  return (
    <>
      <section>
        <ul>
          <li>
            <form onSubmit={onSubmit} className='formLogin'>
              <label htmlFor='code'>
                Introduce el código de recuperación recibido por email.
              </label>
              <input
                type='text'
                name='code'
                id='code'
                required
                value={code}
                onChange={(e) => setRecoverCode(e.target.value)}
              />

              <label htmlFor='NewPassword' className='form-label'>
                Nueva Contraseña
              </label>
              <input
                className='form-input'
                type='password'
                name='password'
                id='password'
                required
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {/* {errors.password && <p>{errors.password}</p>} */}

              <button type='submit'>Enviar</button>
              {/* {errors ? <p>{errors}</p> : null} */}
            </form>
          </li>
        </ul>
      </section>
    </>
  );
};
