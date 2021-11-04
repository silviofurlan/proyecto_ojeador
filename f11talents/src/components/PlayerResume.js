function PlayerResume(props) {
  return (
    <div id='PlayerResume'>
      <h1>Nombre: {props.name}</h1>
      <h2>Edad: {props.age}</h2>
      <h2>Equipo Actual: {props.club}</h2>
      <h2>Puesto: {props.position}</h2>
      <h2>Habilidad destacada: {props.skill}</h2>
    </div>
  );
}
export { PlayerResume };
