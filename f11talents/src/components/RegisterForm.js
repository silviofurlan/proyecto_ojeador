import React, { useState } from 'react';

import { post } from '../api/api';
const DEFAULT_ERRORS = {
  nombre: '',
  tipoCuenta: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });
  const [ok, setOk] = useState('');

  const validateForm = () => {
    let isValid = true;
    setErrors({ ...DEFAULT_ERRORS });

    let validationResult = {};

    if (name.length < 3 && name.length > 20) {
      validationResult = {
        ...validationResult,
        nombre: 'El nombre debe tener entre 3 y 20 caracteres',
      };
      isValid = false;
    }

    if (!['family', 'scout'].includes(role)) {
      validationResult = {
        ...validationResult,
        tipoCuenta: 'El tipo de cuenta no es correcto',
      };
      isValid = false;
    }

    if (password.length < 10) {
      validationResult = {
        ...validationResult,
        password: 'La contraseña es muy corta',
      };
      isValid = false;
    }

    setErrors(validationResult);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const body = {
      email,
      password,
      name,
      role,
    };

    post({
      url: 'http://localhost:4000/register',
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
 
        <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Regístrate Gratis</h1>
        <div className='form-inputs'>
          <label htmlFor='username' className='form-label'>
            Nombre
          </label>
          <input
            className='form-input'
            type='text'
            name='username'
            id='username'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.nombre && <p>{errors.nombre}</p>}

          <label htmlFor='role' className='form-label'>
            Tipo de Cuenta
          </label>
          <select
            className='form-input'
            name='role'
            required
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='' disabled>
              Selecciona un tipo de cuenta
            </option>
            <option value='family'>Familia</option>
            <option value='scout'>Ojeador</option>
          </select>
          {errors.tipoCuenta && <p>{errors.tipoCuenta}</p>}

          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            className='form-input'
            type='email'
            required
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}

          <label htmlFor='password' className='form-label'>
            Contraseña
          </label>
          <input
            className='form-input'
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type='submit' className='form-input-btn'>
          Registrar
        </button>
        {errors.serverResponse && <p>{errors.serverResponse}</p>}
      </form>
    </div>
 
  );
};
