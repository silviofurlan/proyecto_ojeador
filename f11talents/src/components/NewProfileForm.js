import React, { useState } from "react";
// import { Redirect } from 'react-router';
import { useContext } from "react/cjs/react.development";
import { AuthTokenContext } from "..";

export const post = async ({
    url,
    body,
    callback,
    token = "",
    onError = () => {},
    onCommunicationError = () => {},
}) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const body = await response.json();

            console.log(body);
            // respuesta correcta, hacer algo con body
        } else {
            onError(response);
            console.log(
                "Codigo de estado no esperado",
                response.status,
                response.statusText
            );
            // respuesta erronea, informar al usuario?
        }
    } catch (msg) {
        onCommunicationError(msg);
        // fallo de comunicación, informar al usuario?
        console.error("Errorísimo!!!!", msg);
    }
};

const NewProfileForm = (props) => {
    const [player_name, setPlayerName] = useState("");
    const [player_position, setPlayerPosition] = useState("");
    const [player_birthDate, setPlayerBirthDate] = useState("");
    const [player_club, setPlayerClub] = useState("");
    const [player_category, setPlayerCategory] = useState("");
    const [player_skill, setPlayerSkill] = useState("");
    const [player_description, setPlayerDescription] = useState("");

    const { token } = useContext(AuthTokenContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            name: player_name,
            position: player_position,
            birthDate: player_birthDate,
            club: player_club,
            category: player_category,
            skill: player_skill,
            description: player_description,
        };

        console.log("File");
        const handleServerResponse = (body) => {
            console.log(body);
        };
        post({
            url: "http://localhost:4000/new-profile",
            body,
            token,
            callback: handleServerResponse,
        });
    };

    return (
        <>
            <div>
                <div className='wrapperformPerfil'>
                    <form onSubmit={onSubmit} className='formPerfil'>
                        <h1>Nuevo Perfil</h1>
                        {/* ##################################*/}
                        <label htmlFor='name' className='form-label'>
                            Nombre
                        </label>
                        <input
                            className='form-input'
                            type='text'
                            name='nombre'
                            id='nombre'
                            required
                            value={player_name}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        {/* ##################################*/}

                        <label htmlFor='birthDate' className='form-label'>
                            Fecha de Nacimiento
                        </label>
                        <input
                            className='form-input'
                            type='date'
                            name='fecha_nacimiento'
                            id='fecha_nacimiento'
                            required
                            value={player_birthDate}
                            onChange={(e) => setPlayerBirthDate(e.target.value)}
                        />
                        {/* ##################################*/}

                        <label htmlFor='player_position' className='form-label'>
                            Puesto
                        </label>
                        <select
                            className='form-input'
                            type='text'
                            name='player_position'
                            id='player_position'
                            required
                            value={player_position}
                            onChange={(e) => setPlayerPosition(e.target.value)}
                        >
                            {" "}
                            <option value='' disabled>
                                Selecciona el Puesto
                            </option>
                            <option value='Portero'>Portero</option>
                            <option value='Defensa'>Defensa</option>
                            <option value='Mediocentro'>Mediocentro</option>
                            <option value='Delantero'>Delantero</option>
                        </select>

                        {/* ##################################*/}

                        <label htmlFor='category' className='form-label'>
                            Categoria
                        </label>
                        <select
                            className='form-input'
                            type='text'
                            name='player_category'
                            id='category'
                            required
                            value={player_category}
                            onChange={(e) => setPlayerCategory(e.target.value)}
                        >
                            {" "}
                            <option value='' disabled>
                                Selecciona una categoria
                            </option>
                            <option value='Femenino'>Femenino</option>
                            <option value='Masculino'>Masculino</option>
                        </select>

                        {/* ##################################*/}

                        <label htmlFor='player_skill' className='form-label'>
                            Skill
                        </label>
                        <select
                            className='form-input'
                            type='text'
                            name='player_skill'
                            id='player_skill'
                            required
                            value={player_skill}
                            onChange={(e) => setPlayerSkill(e.target.value)}
                        >
                            {" "}
                            <option value='' disabled>
                                Añade su principal Skill
                            </option>
                            <option value='Capacidad de anticipación'>
                                Capacidad de anticipación
                            </option>
                            <option value='Reflejos'>Reflejos</option>
                            <option value='Defensa en zona'>
                                Defensa en zona
                            </option>
                            <option value='Parapenaltis'>Parapenaltis</option>
                            <option value='Marcaje'>Marcaje</option>
                            <option value='Capacidad física'>
                                Capacidad física
                            </option>
                            <option value='Recuperación del balón'>
                                Recuperación del balón
                            </option>
                            <option value='Condución del balón'>
                                Condución del balón
                            </option>
                            <option value='Disparo a distancia'>
                                Disparo a distancia
                            </option>
                            <option value='Regate'>Regate</option>
                        </select>

                        {/* ##################################*/}

                        <label htmlFor='player_club' className='form-label'>
                            Equipo Actual
                        </label>
                        <select
                            className='form-input'
                            type='text'
                            name='player_club'
                            id='player_club'
                            required
                            value={player_club}
                            onChange={(e) => setPlayerClub(e.target.value)}
                        >
                            {" "}
                            <option value='' disabled>
                                Añade su equipo actual
                            </option>
                            <option value='Sin Equipo'>Sin equipo</option>
                            <option value='Equipo 1 FC'>Equipo 1 FC</option>
                            <option value='Equipo 2 FC'>Equipo 2 FC</option>
                            <option value='Equipo 3 FC'>Equipo 3 FC</option>
                            <option value='Equipo 4 FC'>Equipo 4 FC</option>
                            <option value='Equipo 5 FC'>Equipo 5 FC</option>
                            <option value='Equipo 6 FC'>Equipo 6 FC</option>
                        </select>

                        <label htmlFor='description' className='form-label'>
                            Descripción
                        </label>
                        <textarea
                            className='form-textArea'
                            type='text'
                            name='description'
                            id='description'
                            minLength='5'
                            maxLength='500'
                            size='40'
                            value={player_description}
                            onChange={(e) =>
                                setPlayerDescription(e.target.value)
                            }
                        />

                        <div className='botonCrear'>
                            <button type='submit' className='form-input-boton'>
                                <div> Crear</div>
                            </button>
                        </div>
                        <br></br>
                    </form>
                </div>
            </div>
        </>
    );
};
export default NewProfileForm;
