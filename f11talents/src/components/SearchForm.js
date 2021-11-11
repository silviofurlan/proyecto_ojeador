import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/api';
import { PlayerCard } from './PlayerCard';
export const Profiles = () => {
  const [errorMessage, setErrorMessage] = useState();
  // const [results, setResults] = useState('');
  // const [errors, setErrors] = useState({ ...DEFAULT_ERRORS })
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData({
          url: `http://localhost:4000/search`,
        });

        setProfiles(data.results);
        setErrorMessage();
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, []);

  return [profiles, errorMessage];
};

// const [search_position, setPosition] = useState('');
// const [search_club, setClub] = useState('');
// const [search_skill, setSkill] = useState('');
// const [search_age, setAge] = useState('');
// const [search_category, setCategory] = useState('');

// const handleSubmit = async (e) => {
//   e.preventDefault();

//     const search = {
//       position: search_position,
//       club: search_club,
//       skill: search_skill,
//       age: search_age,
//       category: search_category,
//     };

//     const query = new URLSearchParams();

//     for (const [key, value] of Object.entries(search)) {
//       query.append(key, value);
//     }

//     const getData = async () => {
//       try {
//         const data = await fetchData({
//           url: `http://localhost:4000/search?${query.toString()}`,
//         });

//         setResults(data.results);
//         setErrorMessage();
//       } catch (error) {
//         setErrorMessage(error.message);
//       }
//     };
//     getData();
//   };

//   return (
//     <div className='gridContenedor'>
//       <div className='grid-tens'>
//         <div className='grid-item'>
//           <form onSubmit={handleSubmit} className='formSearch'>
//             <label htmlFor='position' className='form-label'>
//               Puesto
//             </label>
//             <select
//               className='form-input'
//               type='text'
//               name='position'
//               id='position'
//               value={search_position}
//               onChange={(e) => setPosition(e.target.value)}
//             >
//               {' '}
//               <option value='' />
//               <option value='Portero'>Portero</option>
//               <option value='Defensa'>Defensa</option>
//               <option value='Mediocentro'>Mediocentro</option>
//               <option value='Delantero'>Delantero</option>
//             </select>

//             {/* ##################################*/}

//             <label htmlFor='category' className='form-label'>
//               Categoria
//             </label>
//             <select
//               className='form-input'
//               type='text'
//               name='category'
//               id='category'
//               value={search_category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               {' '}
//               <option value='' />
//               <option value='Femenino'>Femenino</option>
//               <option value='Masculino'>Masculino</option>
//             </select>

//             {/* ##################################*/}
//             <label htmlFor='age' className='form-label'>
//               Edad
//             </label>
//             <input
//               name='age'
//               type='text'
//               id='age'
//               value={search_age}
//               onChange={(e) => setAge(e.target.value)}
//             />

//             <label htmlFor='player_skill' className='form-label'>
//               Skill
//             </label>
//             <select
//               className='form-input'
//               type='text'
//               name='player_skill'
//               id='player_skill'
//               value={search_skill}
//               onChange={(e) => setSkill(e.target.value)}
//             >
//               {' '}
//               <option value='' />
//               <option value='Capacidad de anticipación'>
//                 Capacidad de anticipación
//               </option>
//               <option value='Reflejos'>Reflejos</option>
//               <option value='Defensa en zona'>Defensa en zona</option>
//               <option value='Marcaje "hombre a hombre"'>
//                 Marcaje "hombre a hombre"
//               </option>
//               <option value='Capacidad física'>Capacidad física</option>
//               <option value='Recuperación del balón'>
//                 Recuperación del balón
//               </option>
//               <option value='Condución del balón'>Condución del balón</option>
//               <option value='Disparo a distancia'>Disparo a distancia</option>
//               <option value='Regate'>Regate</option>
//             </select>

//             {/* ##################################*/}

//             <label htmlFor='player_club' className='form-label'>
//               Equipo Actual
//             </label>
//             <select
//               className='form-input'
//               type='text'
//               name='player_club'
//               id='player_club'
//               value={search_club}
//               onChange={(e) => setClub(e.target.value)}
//             >
//               {' '}
//               <option value='' />
//               <option value='Sin Equipo'>Sin equipo</option>
//               <option value='Equipo 1 FC'>Equipo 1 FC</option>
//               <option value='Equipo 2 FC'>Equipo 2 FC</option>
//               <option value='Equipo 3 FC'>Equipo 3 FC</option>
//               <option value='Equipo 4 FC'>Equipo 4 FC</option>
//               <option value='Equipo 5 FC'>Equipo 5 FC</option>
//               <option value='Equipo 6 FC'>Equipo 6 FC</option>
//               <option value='Equipo 6 FC'>Otro</option>
//             </select>

//             <button type='submit'>Buscar </button>
//           </form>
//         </div>
//       </div>
//       <div className='grid-item'>
//         {results.length > 0
//           ? results.map((profile) => (
//               <PlayerCard
//                 resume={profile}
//                 avatar={profile.avatar}
//                 key={profile.id}
//               />
//             ))
//           : 'No hay datos'}
//       </div>
//     </div>
//   );
// };
