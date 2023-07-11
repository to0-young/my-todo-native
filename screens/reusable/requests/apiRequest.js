import React from 'react';


// const fetchSessionRequest = async () => {
//   const getSessions = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
//     method: 'GET',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//   })
//
//   return getSessions.json()
// }

const fetchSessionRequest = async () => {
    const getSessions = await fetch('http://192.168.31.101:3000/api/v1/sessions', {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
    });

    return getSessions.json();
};


// const forgetPasswordRequest = async (email) => {
//   const res = await fetch('http://192.168.1.101:3000/api/v1/forget_passwords', {
//     method: 'POST',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({email}),
//   });
//
//   return res.json();
// };



const forgetPasswordRequest = async (email) => {
    const res = await fetch('http://192.168.31.101:3000/api/v1/forget_passwords', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });

    return res.json();
};



// const sendLoginRequest = async (email, password) => {
//   const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
//     method: 'POST',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });
//
//   const json = await res.json()
//   return {response: json, ok: res.ok}
// };


const sendLoginRequest = async (email, password) => {
    const res = await fetch('http://192.168.31.101:3000/api/v1/sessions', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const json = await res.json();
    return {response: json, ok: res.ok};
};



// const createUserRequest = async (user) => {
//   const formData = new FormData();
//   formData.append('first_name', user.firstName);
//   formData.append('last_name', user.lastName);
//   formData.append('password', user.password);
//   formData.append('email', user.email);
//
//   const res = await fetch('http://192.168.1.101:3000/api/v1/users', {
//     method: 'POST',
//     credentials: 'include',
//     body: formData,
//   });
//
//   return res.json();
// };


const createUserRequest = async (user) => {
    const formData = new FormData();
    formData.append('first_name', user.firstName);
    formData.append('last_name', user.lastName);
    formData.append('password', user.password);
    formData.append('email', user.email);

    const res = await fetch('http://192.168.31.101:3000/api/v1/users', {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    return res.json()
};


// const logoutRequest = async () => {
//     await fetch('http://192.168.1.101:3000/api/v1/sessions', {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//     });
// };

// const logoutRequest = async () => {
//     await fetch('http://192.168.31.101:3000/api/v1/sessions', {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//     });
// };


export {
    forgetPasswordRequest,
    sendLoginRequest,
    createUserRequest,
    fetchSessionRequest,
    // logoutRequest
}
