const Joi = require('joi');

const newProfileSchema = Joi.object().keys({
  description: Joi.string()
    .max(500)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una descripción');

        case 'string.empty':
          return new Error('Se requiere una descripción');

        default:
          return new Error('La descripción debe ser inferior a 500 caracteres');
      }
    }),
  name: Joi.string()
    .required()
    .min(3)
    .max(50)
    .alphanum() //BUSCAR OPCION SOLO LETRAS
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
  position: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una Posición');
    }),
  birthDate: Joi.date()
    .required()
    .iso()
    .error((errors) => {
      if (errors[0].code === 'any.required')
        return new Error(
          'Se requiere una Fecha de nacimiento. Solo puede registrar jugadores nascidos entre X e Y'
        );
    }),
  category: Joi.string()
    .required()
    .error((errors) => {
      if (errors[0].code === 'any.required')
        return new Error('Se requiere una categoria');
    }),
  club: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un Club');
    }),
  skill: Joi.string()
    .required()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere una Skill');
    }),
});

module.exports = newProfileSchema;
