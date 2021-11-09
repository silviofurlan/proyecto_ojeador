import Intro from '../Intro';
import Register from './Register';
import SearchCase from '../SearchCase';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '../..';
export default function Home() {
  const { token } = useContext(AuthTokenContext);
  if (!token) {
    return (
      <div>
        <Intro />
        <Register />
        <SearchCase />
      </div>
    );
  } else {
    return (
      <div>
        <Intro />
        <SearchCase />
      </div>
    );
  }
}
