import { RegisterForm } from '../RegisterForm';

export default function Register() {
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left-Home'>
          <h1>La mejor plataforma de búsqueda de talentos en el fútbol.</h1>
          <iframe
            src='https://www.youtube.com/embed/h_kX-39qqMA'
            frameBorder='0'
            width='100%'
            height='250'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          />
        </div>
        <RegisterForm />
      </div>
    </>
  );
}
