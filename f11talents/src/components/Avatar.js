const Avatar = (props) => {
  const avatar = props.avatar;

  if (!avatar)
    return (
      <div id='Avatar'>
        <img src={`http://localhost:4000/fotos/placeholder.png`} alt='Avatar' />
      </div>
    );
  return (
    <div id='Avatar'>
      <img src={`http://localhost:4000/fotos/${avatar}`} alt='Avatar' />
    </div>
  );
};
export default Avatar;

