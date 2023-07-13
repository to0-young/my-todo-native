

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



 const forgetPasswordRequest = async (email) => {
   return fetch('http://192.168.1.101:3000/api/v1/forget_passwords', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email
    }),
  })
}


// const forgetPasswordRequest = async (email) => {
//   return fetch('http://192.168.31.101:3000/api/v1/forget_passwords', {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//     email
//     }),
//   })
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


const createUserRequest = async (formData) => {
  return fetch('http://192.168.1.101:3000/api/v1/users', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
}


// const createUserRequest = async (formData) => {
//   return fetch('http://192.168.31.101:3000/api/v1/users', {
//     method: 'POST',
//     credentials: 'include',
//     body: formData,
//   })
// }


export {
  fetchSessionRequest,
  forgetPasswordRequest,
  loginRequest,
  createUserRequest
}
