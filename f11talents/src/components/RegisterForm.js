import React from 'react';
import validate from './validateFormInfo';
import useRegisterForm from '../hooks/useRegisterForm';

export const RegisterForm = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useRegisterForm(
    submitForm,
    validate
  );

  // if (token) {
  //   return <Redirect to='/profiles' />;
  // }

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h2>Registrate Gratis</h2>
        <div className='form-inputs'>
          <label htmlFor='username' className='form-label'>
            Nombre
          </label>
          <input
            className='form-input'
            type='text'
            name='username'
            id='username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}

          <label htmlFor='role'>Tipo de Cuenta</label>
          <select
            className='form-input'
            name='role'
            id='role'
            value={values.role}
            onChange={handleChange}
          >
            {' '}
            <option value='' disabled>
              Selecciona un tipo de cuenta
            </option>
            <option value='family'>Familia</option>
            <option value='scout'>Ojeador</option>
          </select>
          {errors.role && <p>{errors.role}</p>}

          <label htmlFor='email'>email</label>
          <input
            className='form-input'
            type='text'
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}

          <label htmlFor='password'>password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            id='password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};
