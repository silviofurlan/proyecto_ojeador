const Avatar = (props) => {
  if (!props.avatar)
    return (
      <div id='Avatar'>
        <img src={`http://localhost:4000/fotos/${avatar}`} alt='Avatar' />
        Sin avatar
      </div>
    );
  const { avatar } = props.avatar;
  return (
    <div id='Avatar'>
      <img src={``} alt='Avatar' />
    </div>
  );
};
export default Avatar;
