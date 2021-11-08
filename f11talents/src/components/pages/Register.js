import { useState } from 'react/cjs/react.development';
import { RegisterForm } from '../RegisterForm';
import FormSuccess from '../FormSuccess';

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <h1>
            {' '}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus, rem.
          </h1>
        </div>
        {!isSubmitted ? (
          <RegisterForm submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Register;
