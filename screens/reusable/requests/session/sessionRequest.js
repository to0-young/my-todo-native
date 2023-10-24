const fetchSessionRequest = () => {
  return fetch('http://192.168.1.101:3000/api/v1/sessions', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}



// const fetchSessionRequest = () => {
//   return fetch('http://192.168.31.101:3000/api/v1/sessions', {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }



const loginRequest = async (email, password) => {
  return  fetch('http://192.168.1.101:3000/api/v1/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
}



// const loginRequest = async (email, password) => {
//   return  fetch('http://192.168.31.101:3000/api/v1/sessions', {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });
// };


const logoutRequest = async () => {
  return fetch('http://192.168.1.101:3000/api/v1/sessions', {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};

// const logoutRequest = async () => {
//   return fetch('http://192.168.31.101:3000/api/v1/sessions', {
//     method: 'DELETE',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//   });
// };


export  {
  fetchSessionRequest,
  loginRequest,
  logoutRequest
}