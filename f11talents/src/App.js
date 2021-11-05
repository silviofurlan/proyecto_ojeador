import './App.css';
import React from 'react';

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
import MyProfiles from './components/UserProfiles';
import PlayerProfilePage from './components/pages/PlayerProfilePage';

function App() {
  const { token, user, logout } = useContext(AuthTokenContext);
  return (
    <Router>
      <header className='principal'>
        <div className='wrapper'>

        <div className="divLogo">
                <h1><a class="logo" href="/">f11-Talents</a>
                </h1>
            </div>
          <nav>
            <ul className='social'>
              <li>
                <Link to='/'>Inicio</Link>
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
                  Estás logueado{' '}
                  <button onClick={() => logout()}>Log out</button>
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
              <MyProfiles />
            </Route>
            <Route path='/profile'>
              <PlayerProfilePage id={30} />
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
      </header>
    </Router>
  );
}

export default App;
