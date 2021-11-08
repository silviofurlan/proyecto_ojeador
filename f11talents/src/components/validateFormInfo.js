export default function validateFormInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = ' El nombre es obligatorio';
  }

  if (!values.role) {
    errors.role = 'Tienes que elegir un tipo de cuenta';
  }
  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email inválido';
  }

  if (!values.password) {
    errors.password = 'Falta la contraseña';
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  return errors;
}
