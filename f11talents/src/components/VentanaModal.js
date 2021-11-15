import { Redirect } from "react-router";

import Divisoria from "./Divisoria";
import styled from "styled-components";

export default function VentanaModal({ children, estado, cambiarEstado }) {
    return (
        <>
            <div>
                <div>
                    <Divisoria />
                </div>

                {estado && (
                    <Overlay>
                        <ContenedorModal1>
                            <BotonCerrar></BotonCerrar>
                            <h1>Hola Lu</h1>
                            <Boton>Aceptar</Boton>
                            {(children, estado, cambiarEstado)}
                        </ContenedorModal1>
                    </Overlay>
                )}
            </div>
        </>
    );
}

const Overlay = styled.div`
    margin: auto;
    width: 100vw;
    heigth: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);

    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContenedorModal1 = styled.div`
    width: 800px;
    min-height: 500px;
    background: #fff;
    position: reative;
    border-radius: 10px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 0;
    right: 20px;
    top: 20px;
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

const ContenedorModal = styled.div`
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
