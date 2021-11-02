import './App.css';
import React from 'react';
import { LoginForm } from './components/LoginForm';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { get } from './api/api';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import MyAccount from './components/pages/MyAccount';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from '.';

// function App() {
// useEffect(() => {
//   get('http://localhost:4000/profiles', (body) => setProfilesList(body));
// }, []);
// <Router>
//   {/* <Navbar />*/}
//   <Switch>
//     {/* <Route path='/' exact component={Home} /> */}
//     <Route path='/busqueda' component={Search} />
//     {/* <Route path='/nosotros' component={AboutUs} />
//   <Route path='/contactos' component={ContactUs} />
//   <Route path='/miCuenta' component={MyAccount} /> */}
//     {/* <Route path='/registar' component={FormularioRegistro} /> */}
//   </Switch>
//   {/*<Footer /> */}
// </Router>;
// }

function App() {
  const { token, user, logout } = useContext(AuthTokenContext);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Início</Link>
            </li>
            <li>
              <Link to='/buscar'>Búsqueda</Link>
            </li>
            <li>
              <Link to='/micuenta'>Mi Cuenta</Link>
            </li>
            <li>
              <Link to='/about'>Sobre esta página</Link>
            </li>
            <li>
              <Link to='/contact'>Contacto</Link>
            </li>
          </ul>

          <div>
            {token ? (
              <p>
                Estás logueado <button onClick={() => logout()}>Log out</button>
              </p>
            ) : (
              <ul>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Registro</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <Switch>
          <Route path='/buscar'>
            <Search />
          </Route>
          <Route path='/micuenta'>
            <MyAccount />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/about'>
            <AboutUs />
          </Route>
          <Route path='/contact'>
            <ContactUs />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
