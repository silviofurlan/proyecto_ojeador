function PlayerResume(props) {
  return (

    <div className="griContenedor">
    <div className="grid-itens">
    <div className='grid-item'>
      <ul>
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
          <p>Habilidad: {props.skill}</p>
        </li>
      </ul>
    </div>
    </div>
    </div>
  );
}
export { PlayerResume };
