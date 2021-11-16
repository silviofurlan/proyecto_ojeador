import React, { useState } from "react";
import { post } from "../api/api";
const DEFAULT_ERRORS = {
    nombre: "",
};

export const FormContact = () => {
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });
    const [ok, setOk] = useState("");

    const validateForm = () => {
        let isValid = true;
        setErrors({ ...DEFAULT_ERRORS });

        let validationResult = {};

        if (name.length < 3 && name.length > 20) {
            validationResult = {
                ...validationResult,
                nombre: "El nombre debe tener entre 3 y 20 caracteres",
            };
            isValid = false;
        }

        setErrors(validationResult);

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        const body = {
            email,
            mensaje,
        };

        post({
            url: "http://localhost:4000/register",
            body,
            callback: (response) => {
                setOk(response.message);
            },
            onError: (response) => {
                setErrors({ ...errors, serverResponse: response.message });
            },
        });
    };

    if (ok) return <p style={{ color: "green" }}>{ok}</p>;

    return (
        <form onSubmit={handleSubmit} className='formContactar'>
            <div className='form-inputs'>
                <label htmlFor='username' className='form-label'>
                    Nombre
                </label>
                <input
                    className='form-input'
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.nombre && <p>{errors.nombre}</p>}

                <label htmlFor='email' className='form-label'>
                    Email
                </label>
                <input
                    className='form-input'
                    type='email'
                    required
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p>{errors.email}</p>}

                <label htmlFor='mensaje' className='form-label'>
                    Mensaje
                </label>
                <textarea
                    className='form-input'
                    type='mensaje'
                    name='mensaje'
                    id='mensaje'
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />
                {errors.mensaje && <p>{errors.mensaje}</p>}
            </div>
            <button type='submit' className='form-input-btn'>
                Enviar
            </button>
            {errors.serverResponse && <p>{errors.serverResponse}</p>}
        </form>
    );
};
