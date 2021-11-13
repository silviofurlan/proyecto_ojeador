import Intro from '../Intro';

import Register from './Register';
// import SearchCase from '../SearchCase';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
export default function Home() {
  const { token, user } = useContext(AuthTokenContext);
  console.log('USER', user);
  if (!token) {
    return (
      <>
        <Intro />
        <div className='wrapper'>
          <Register />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Intro />
        <div className='wrapper'>
          <div className='trescolumnas'>
            <div>LO QUE PONGAS AQUI SOLO APARECE CUANDO ESTÁS LOGUEADA</div>
            <div>
              <img
                src='https://source.unsplash.com/400x400?soccer'
                alt='foto'
              />
            </div>
            <div>Olá {user.name}</div>
          </div>
        </div>
      </>
    );
  }
}
