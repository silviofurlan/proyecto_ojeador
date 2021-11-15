import React from "react";

import Divisoria from "./Divisoria";
import VentanaModal from "./VentanaModal";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Modal = () => {
    return (
        <div>
            <Divisoria />
            <div id='contenedorBanner'>
                <div className='datosBanner'>
                    <h1>Compelta el formulário para crear el nuevo perfil</h1>
                </div>

                <div>
                    <div className='botonCrearJugador'>
                        <Link to='/VentanaModal'>
                            <button>Crear</button>
                        </Link>
                    </div>

                    <ContenedorBotones>
                        <Boton>Modal 1</Boton>
                    </ContenedorBotones>
                </div>
            </div>
        </div>
    );
};

export default Modal;

const Overlay = styled.div`
    margin: auto;
    width: 960px;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContenedorBotones = styled.div`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const Boton = styled.button`
    display: block;
    padding: 10px 30px;
    border-radius: 100px;
    color: #fff;
    border: none;
    background: #1766dc;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    transition: 0.3s ease all;
    &:hover {
        background: #0066ff;
    }
`;

const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 42px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    p {
        font-size: 18px;
        margin-bottom: 20px;
    }
    img {
        width: 100%;
        vertical-align: top;
        border-radius: 3px;
    }
`;
