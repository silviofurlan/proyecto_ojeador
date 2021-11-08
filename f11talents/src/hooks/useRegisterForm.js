import { useState, useEffect } from 'react';
import { post } from '../api/api';

const useRegisterForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    role: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmiting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));

    const body = {
      email: values.email,
      password: values.password,
      name: values.username,
      role: values.role,
    };
    const handleServerResponse = (body) => {};
    post({
      url: 'http://localhost:4000/register',
      body,
      callback: handleServerResponse,
    });
    setIsSubmiting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useRegisterForm;
