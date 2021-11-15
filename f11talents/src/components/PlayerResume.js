function PlayerResume(props) {
    return (
        <div className='contenedorWrapperPerfilJugador'>
            <ul className='datosCartas'>
                <li className='datosPerfil'>
                    <p className=''>Nombre: {props.name}</p>
                </li>
                <li className='datosPerfil'>
                    <p>{props.age} años</p>
                </li>
                <li className='datosPerfil'>
                    <p>{props.position}</p>
                </li>
                <li className='datosPerfil'>
                    <p>Equipo: {props.club}</p>
                </li>
                <li className='datosPerfil'>
                    <p>Habilidades: {props.skills}</p>
                </li>
            </ul>
        </div>
    );
}
export { PlayerResume };
