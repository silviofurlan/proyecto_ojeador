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
  onError = () => {},
  onCommunicationError = () => {},
}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const body = await response.json();

      callback(body);
      // respuesta correcta, hacer algo con body
    } else {
      onError(response);
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
    console.error('Errorísimo!!!!', msg);
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
