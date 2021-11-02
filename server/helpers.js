const { format } = require('date-fns');
const { ensureDir, unlink } = require('fs-extra');
const sharp = require('sharp');
const crypto = require('crypto');
const uuid = require('uuid');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const { UPLOADS_DIRECTORY, SENDGRID_API_KEY, SENDGRID_FROM } = process.env;
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

// Asignamos el API Key a Sendgrid.
sgMail.setApiKey(SENDGRID_API_KEY);

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
 * #################
 * ## deletePhoto ##
 * #################
 */
async function deletePhotoFile(photoName) {
  // Creamos la ruta absoluta al archivo.
  const photoPath = path.join(uploadsDir, photoName);

  // Eliminamos la foto del disco.
  await unlink(photoPath);
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
 * ## sendMail ##
 * ##############
 */
async function sendMail({ to, subject, body }) {
  // Preparamos el mensaje.
  const msg = {
    to,
    from: SENDGRID_FROM,
    subject,
    text: body,
    html: `
          <div>
              <h1>${subject}</h1>
              <p>${body}</p>
          </div>
      `,
  };

  // Enviamos el mensaje.
  await sgMail.send(msg);
}

/**
 * #################
 * ## verifyEmail ##
 * #################
 */
async function verifyEmail(email, registrationCode) {
  // Mensaje que enviaremos al usuario.
  const emailBody = `
      Te acabas de registrar en f11talents.
      Pulsa en este link para verificar tu cuenta: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
  `;

  try {
    // Enviamos el mensaje al correo del usuario.
    await sendMail({
      to: email,
      subject: 'Activa tu usuario en f11talents',
      body: emailBody,
    });
  } catch (error) {
    throw new Error('Error enviando el mensaje de verificación');
  }
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

/**
 * #################
 * ## sendContractEmail ##
 * #################
 */
async function sendContractEmail(email, name, aceptationCode) {
  // Mensaje que enviaremos al usuario.
  const emailBody = `
      ${name} acaba de recibir una oferta de contratación en f11talents
      Pulsa en este link aceptarla: ${process.env.PUBLIC_HOST}/users/contracts/${aceptationCode}
  `;

  try {
    // Enviamos el mensaje al correo del usuario.
    await sendMail({
      to: email,
      subject: 'Has recibido una oferta de contratación',
      body: emailBody,
    });
  } catch (error) {
    throw new Error('Error enviando la oferta de contratación');
  }
}

module.exports = {
  formatDate,
  getRandomValue,
  generateRandomString,
  sendMail,
  verifyEmail,
  validate,
  savePhoto,
  deletePhotoFile,
  sendContractEmail,
};
