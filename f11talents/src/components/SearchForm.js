import React, { useState } from 'react';
import { fetchData } from '../api/api';
import { useSearchProfiles } from '../hooks/useSearchProfiles';

export const SearchForm = () => {
  const [position, setPosition] = useState('');
  const [club, setClub] = useState('');
  const [skill, setSkill] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  // const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });
  const [ok, setOk] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor='age' className='form-label'></label>
        <label htmlFor='position'>Puesto</label>
        <select
          type='text'
          name='position'
          id='position'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          {' '}
          <option value='' disabled>
            Elije un Puesto
          </option>
          <option value='Portero'>Portero</option>
          <option value='Defensa'>Defensa</option>
          <option value='Mediocentro'>Mediocentro</option>
          <option value='Delantero'>Delantero</option>
        </select>

        {/* ##################################*/}

        <label htmlFor='category'>Categoria</label>
        <select
          type='text'
          name='player_category'
          id='category'
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {' '}
          <option value='' disabled>
            Elije una categoria
          </option>
          <option value='Femenino'>Femenino</option>
          <option value='Masculino'>Masculino</option>
        </select>

        {/* ##################################*/}
        <label htmlFor='category'>Edad</label>
        <input type='text' id='age' />

        <label htmlFor='player_skill'>Skill</label>
        <select
          type='text'
          name='player_skill'
          id='player_skill'
          required
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          {' '}
          <option value='' disabled>
            Elije una Skill
          </option>
          <option value='Capacidad de anticipación'>
            Capacidad de anticipación
          </option>
          <option value='Reflejos'>Reflejos</option>
          <option value='Defensa en zona'>Defensa en zona</option>
          <option value='Marcaje "hombre a hombre"'>
            Marcaje "hombre a hombre"
          </option>
          <option value='Capacidad física'>Capacidad física</option>
          <option value='Recuperación del balón'>Recuperación del balón</option>
          <option value='Condución del balón'>Condución del balón</option>
          <option value='Disparo a distancia'>Disparo a distancia</option>
          <option value='Regate'>Regate</option>
        </select>

        {/* ##################################*/}

        <label htmlFor='player_club'>Equipo Actual</label>
        <select
          type='text'
          name='player_club'
          id='player_club'
          required
          value={club}
          onChange={(e) => setClub(e.target.value)}
        >
          {' '}
          <option value='' disabled>
            Elije un equipo
          </option>
          <option value='Sin Equipo'>Sin equipo</option>
          <option value='Equipo 1 FC'>Equipo 1 FC</option>
          <option value='Equipo 2 FC'>Equipo 2 FC</option>
          <option value='Equipo 3 FC'>Equipo 3 FC</option>
          <option value='Equipo 4 FC'>Equipo 4 FC</option>
          <option value='Equipo 5 FC'>Equipo 5 FC</option>
          <option value='Equipo 6 FC'>Equipo 6 FC</option>
        </select>

        <button type='submit'>Buscar </button>
      </form>
    </div>
  );
};
