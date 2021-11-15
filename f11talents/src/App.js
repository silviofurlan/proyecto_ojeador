import "./App.css";

import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/pages/Home";
import SearchPage from "./components/pages/SearchPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import MyAccount from "./components/pages/MyAccount";
import { useContext } from "react/cjs/react.development";
import { AuthTokenContext } from "./index";
import PlayerProfilePage from "./components/pages/PlayerProfilePage";
import Recover from "./components/pages/Recover";
import Reset from "./components/pages/Reset";
import NewProfile from "./components/pages/NewProfile";

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
                                <Link to='/about'>Nosotros</Link>
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
                                    Estás logueado{" "}
                                    <button onClick={() => logout()}>
                                        Log out
                                    </button>
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
                    <Route path='/profiles/'>
                        <PlayerProfilePage />
                    </Route>
                    <Route path='/newprofile/'>
                        <NewProfile />
                    </Route>

                    <Route path='/register'>
                        <Register />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/recover'>
                        <Recover />
                    </Route>
                    <Route path='/reset'>
                        <Reset />
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

                <div className='divisoriaFooter'></div>

                <div className='pieNota'>
                    <p>
                        Desarrollo: Alumnos Hack a Boss | Copyright &copy; 2021{" "}
                        <span className='logo'>F11-Talents</span> . Todos los
                        derechos reservados.{" "}
                    </p>
                </div>
            </footer>
        </Router>
    );
}

export default App;

// <div id="contenedor-ContactarMapa">

// <div className="contactar">
//    <h1>Contacte con nosotros</h1>

//    <div className="formContactar">
//        {/* <form action="">

//            <label for="nombre">Nombre</label>
//            <input type="text" id="nombre" required title="Debe introucir un nombre"
//                placeholder="Introduzca su nombre">

//            <label for="correo">Correo</label>
//            <input type="text" id="correo">

//            <label for="mensaje">Mensaje</label>
//            <textarea type="text" id="mnsaje"> </textarea>

//            <button>Enviar</button>
//        </form> */}
//    </div>
//    </div> */

// <div className="contenedorMapa">
//    <h1>Ubicación</h1>
//     <div className="iframeMapa"
//        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2955.1069158820724!2d-8.740386399999956!3d42.21215949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2589e40a58627d%3A0x35020a409ee2e444!2sEstadio%20Abanca%20Bala%C3%ADdos!5e0!3m2!1ses!2ses!4v1636304210161!5m2!1ses!2ses"
//        width="450" height="400" style="border:0;" allowfullscreen="" loading="lazy">

// </div>

// </div>

// </div>
