
const Avatar = (props) => {
  const avatar = props.avatar;

  if (!avatar)
    return (
      <div className='avatarPerfil'>
        <img
          src={`http://localhost:4000/fotos/placeholder.png`}
          alt='Avatar'
          className='avatar'
        />
      </div>
    );
  return (
    <div className='avatarPerfil'>
      <img
        src={`http://localhost:4000/fotos/${avatar}`}
        alt='Avatar'
        className='avatar'
      />
    </div>
  );
};
export default Avatar;
