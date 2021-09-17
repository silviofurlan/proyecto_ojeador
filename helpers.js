const { format } = require('date-fns');
const { ensureDir } = require('fs-extra');
const sharp = require('sharp');
const crypto = require('crypto');
const uuid = require('uuid');
const path = require('path');

const { UPLOADS_DIRECTORY, SENDGRID_API_KEY, SENDGRID_FROM } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);
/**
 * ####################
 * ## getRandomValue ##
 * ####################
 */
function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
/**
 * ##########################
 * ## generateRandomString ##
 * ##########################
 */
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * ###############
 * ## savePhoto ##
 * ###############
 */

async function savePhoto(image) {
  // Comprobamos que el directorio de subida de imágenes existe.
  await ensureDir(uploadsDir);

  // Convertimos la imagen a un objeto sharp.
  const sharpImage = sharp(image.data);

  // Accedemos a los metadatos de la imagen para comprobar su anchura.
  const imageInfo = await sharpImage.metadata();

  // Definimos el ancho máximo.
  const IMAGE_MAX_WIDTH = 1000;

  // Si el ancho de la imagen supera el ancho máximo establecido
  // redimensinamos la imagen.
  if (imageInfo.width > IMAGE_MAX_WIDTH) sharpImage.resize(IMAGE_MAX_WIDTH);

  // Generamos un nombre único para la imagen.
  const imageName = `${uuid.v4()}.jpg`;

  // Creamos la ruta absoluta a la nueva ubicación de la imagen.
  const imagePath = path.join(uploadsDir, imageName);

  // Guardamos la imagen en el directorio de uploads.
  await sharpImage.toFile(imagePath);

  // Retornamos el nombre del fichero.
  return imageName;
}

/**
 * ################
 * ## formatDate ##
 * ################
 */
function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * ##############
 * ## validate ##
 * ##############
 */
async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

module.exports = {
  formatDate,
  getRandomValue,
  generateRandomString,
  validate,
  savePhoto,
};
