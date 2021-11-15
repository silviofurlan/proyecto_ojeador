import Intro from '../Intro';
import Register from './Register';
// import SearchCase from '../SearchCase';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
import { Redirect } from 'react-router';
export default function Home() {
  const { token } = useContext(AuthTokenContext);

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
    return <Redirect to='/micuenta' />;
  }
}
