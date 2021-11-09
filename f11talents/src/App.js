import './App.css';
import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/pages/Home';
import SearchPage from './components/pages/SearchPage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import MyAccount from './components/pages/MyAccount';
import { useContext } from 'react/cjs/react.development';
import { AuthTokenContext } from './index';
import MyProfiles from './components/UserProfiles';
import PlayerProfilePage from './components/pages/PlayerProfilePage';

function App() {
  const { token, logout } = useContext(AuthTokenContext);
  return (
    <Router>
      <header className='principal'>
        <div className='wrapper'>
          <ul className='social'>
            <li>
              <a href='/'>
                <span className='icon icon-instagram'></span>
              </a>
            </li>
            <li>
              <a href='/'>
                <span className='icon icon-facebook'></span>
              </a>
            </li>
            <li>
              <a href='/'>
                <span className='icon icon-twitter'></span>
              </a>
            </li>
            <li>
              <a href='/'>
                <span className='icon icon-youtube'></span>
              </a>
            </li>
          </ul>

          <div className='divLogo'>
            <h1>
              <a className='logo' href='/'>
                f11-Talents
              </a>
            </h1>
          </div>

          <nav>
            <ul className='navigation-list'>
              <li>
                <Link to='/'>Inicio</Link>
              </li>
              <li>
                <Link to='/buscar'>Búsqueda</Link>
              </li>
              <li>
                <Link to='/about'>Sobre esta página</Link>
              </li>
              <li>
                <Link to='/contact'>Contacto</Link>
              </li>
              <li>
                <Link to='/micuenta'>Mi Cuenta</Link>
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
        </div>
      </header>

      <div className='Switch'>
        <Switch>
          <Route path='/buscar'>
            <SearchPage />
          </Route>
          <Route path='/micuenta'>
            <MyAccount />
          </Route>
          <Route path='/profile'>
            <PlayerProfilePage />
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

      <footer className='contenedor-Footer'>
        <section className='wrapper'>
          <article className='navFooter'>
            <h2>f11-Talents</h2>
            <ul>
              <li>
                <a href='/'>Registrar</a>
              </li>
              <li>
                <a href='/'>Buscar</a>
              </li>
              <li>
                <a href='/'>Nosotros</a>
              </li>
              <li>
                <a href='/'>Contactar</a>
              </li>
              <li>
                <a href='/'>Mi Cuenta</a>
              </li>
            </ul>
          </article>

          <article className='contactos'>
            <h2>Contacto</h2>
            <ul>
              <p>+ 34&nbsp; 618 95 47 47</p>
              <p>info@f11-talents.es</p>
            </ul>
          </article>

          <article className='navLegal'>
            <h2>Legal</h2>
            <ul>
              <li>
                <a href='/'>Aviso Legal</a>
              </li>
              <li>
                <a href='/'>Política de cookies</a>
              </li>
              <li>
                <a href='/'>Política de Privacidad</a>
              </li>
            </ul>
          </article>

          <article className='siguenos'>
            <h2>¡Síguenos!</h2>
            <section className='iconosSiguenos'>
              <a href='/'>
                <span className='icon icon-instagram'></span>
              </a>
              <a href='/'>
                <span className='icon icon-facebook'></span>
              </a>
              <a href='/'>
                <span className='icon icon-twitter'></span>
              </a>
              <a href='/'>
                <span className='icon icon-youtube'></span>
              </a>
            </section>
          </article>
        </section>

        <div className='divisoria'></div>

        <div className='pieNota'>
          <p>
            Desarrollo: Alumnos Hack a Boss | Copyright &copy; 2021{' '}
            <span className='logo'>F11-Talents</span> . Todos los derechos
            reservados.{' '}
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
