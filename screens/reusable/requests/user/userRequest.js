
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


export {
  createUserRequest,
  forgetPasswordRequest
}