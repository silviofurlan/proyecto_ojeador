const Joi = require('joi');

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un email');

      return new Error('El email no es válido.');
    }),

  role: Joi.string()
    .required()
    .valid('scout', 'family')
    .error((errors) => {
      if (errors[0].code === 'any.required')
        return new Error('Elige un tipo de cuenta');

      return new Error('Tipo de cuenta debe ser Ojeador o Familia');
    }),

  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña');

        case 'string.empty':
          return new Error('Se requiere una contraseña');

        default:
          return new Error('La contraseña debe tener entre 8 y 100 caracteres');
      }
    }),
  name: Joi.string()
    .required()
    .min(3)
    .max(50)
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un Nombre');

      return new Error(
        'El Nombre debe tener entre 3 y 50 caracteres. Solo puede contener letras.'
      );
    }),
});

module.exports = newUserSchema;
