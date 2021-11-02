function PlayerProfileResume(props) {
  return (
    <div id='PlayerProfileResume'>
      <div>{props.name}</div>
      {/* <div>{props.age}</div> */}
      <div>{props.club}</div>
      <div>{props.position}</div>
      <div>{props.skill}</div>
    </div>
  );
}
export { PlayerProfileResume };
