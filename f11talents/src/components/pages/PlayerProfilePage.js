// import { Redirect } from 'react-router';
// import { useContext } from 'react/cjs/react.development';
// import { AuthTokenContext } from '../..';
// import { useGetProfile } from '../../hooks/useGetProfile';
// import { PlayerCard } from '../PlayerCard';

// export default function PlayerProfilePage(props) {
//   const { token } = useContext(AuthTokenContext);
//   const [profileData] = useGetProfile(token, props.id);

//   console.log('profile', profileData);
//   if (token) {
//     return (
//       <div className='App'>
//         <header className='App-header'>
//           <div className='main'>
//             {profileData.map((profile) (
//             <PlayerCard resume={profileData}
//             avatar={profileData.avatar} />

//           </div>
//         </header>
//       </div>
//     );
//   }
//   return <Redirect to='/login' />;
// }
