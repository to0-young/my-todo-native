const fetchSessionRequest = () => {
  return fetch('http://192.168.31.101:3000/api/v1/sessions', { // Home
  // return fetch('http://192.168.1.101:3000/api/v1/sessions', { // Work
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const loginRequest = async (email, password) => {
  return  fetch('http://192.168.31.101:3000/api/v1/sessions', { // Home
  // return  fetch('http://192.168.1.101:3000/api/v1/sessions', { // Work
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

const logoutRequest = async () => {
  return fetch('http://192.168.31.101:3000/api/v1/sessions', { // Home
  // return fetch('http://192.168.1.101:3000/api/v1/sessions', { // Work
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};

// Не забудь змінити адреса в "Чаті і в NewTask"

export  {
  fetchSessionRequest,
  loginRequest,
  logoutRequest
}