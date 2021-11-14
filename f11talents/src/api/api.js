// export async function getData(
//   url,
//   onSuccess,
//   token = '',
//   onError = (response) => {
//     console.error(
//       'Error de petición!!!!',
//       response.status,
//       response.statusText
//     );
//   },
//   onConnectionError = (msg) => {
//     console.error('Errorísimo!!!!', msg);
//   }
// ) {
//   try {
//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.ok) {
//       const body = await response.json();
//       onSuccess(body);
//     } else {
//       onError(response);
//     }
//   } catch (msg) {
//     onConnectionError(msg);
//   }
// }
export const post = async ({
  url,
  body,
  callback,
  token = '',
  onError = (e) => {
    console.error(e);
  },
  onCommunicationError = (e) => {
    console.error(e);
  },
}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    if (response.ok) {
      callback(json);
      // respuesta correcta, hacer algo con body
    } else {
      onError(json);
      console.log(
        'Codigo de estado no esperado',
        response.status,
        response.statusText
      );
      // respuesta erronea, informar al usuario?
    }
  } catch (msg) {
    onCommunicationError(msg);
    // fallo de comunicación, informar al usuario?
    console.error('Fallo de comunicación', msg);
  }
};

export async function fetchData({ url, token }) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const put = async ({
  url,
  body,
  callback,
  token = '',
  onError = (e) => {
    console.error(e);
  },
  onCommunicationError = (e) => {
    console.error(e);
  },
}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    if (response.ok) {
      callback(json);
      // respuesta correcta, hacer algo con body
    } else {
      onError(json);
      console.log(
        'Codigo de estado no esperado',
        response.status,
        response.statusText
      );
      // respuesta erronea, informar al usuario?
    }
  } catch (msg) {
    onCommunicationError(msg);
    // fallo de comunicación, informar al usuario?
    console.error('Fallo de comunicación', msg);
  }
};

export const toDelete = async ({
  url,
  body,
  callback,
  token = '',
  onError = (e) => {
    console.error(e);
  },
  onCommunicationError = (e) => {
    console.error(e);
  },
}) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    if (response.ok) {
      callback(json);
      // respuesta correcta, hacer algo con body
    } else {
      onError(json);
      console.log(
        'Codigo de estado no esperado',
        response.status,
        response.statusText
      );
      // respuesta erronea, informar al usuario?
    }
  } catch (msg) {
    onCommunicationError(msg);
    // fallo de comunicación, informar al usuario?
    console.error('Fallo de comunicación', msg);
  }
};
