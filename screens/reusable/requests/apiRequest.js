

 const fetchSessionRequest = async () => {
  const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res
};


// //  const fetchSessionRequest = async () => {
// //   const res = await fetch('http://192.168.31.101:3000/api/v1/sessions', {
// //     method: 'GET',
// //     credentials: 'include',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   });
// //
// //   return res.json()
// // };
//
//
//
// const forgetPasswordRequest = async (email) => {
//   const res = await fetch('http://192.168.31.101:3000/api/v1/forget_passwords', {
//     method: 'POST',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({email}),
//   });
//
//   return res.json();
// };
//
// // const forgetPasswordRequest = async (email) => {
// //     const res = await fetch('http://192.168.31.101:3000/api/v1/forget_passwords', {
// //         method: 'POST',
// //         credentials: 'include',
// //         headers: {'Content-Type': 'application/json'},
// //         body: JSON.stringify({email}),
// //     });
// //
// //     return res.json();
// // }
//
//
//
// // const sendLoginRequest = async (email, password) => {
// //   const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
// //     method: 'POST',
// //     credentials: 'include',
// //     headers: {'Content-Type': 'application/json'},
// //     body: JSON.stringify({
// //       email: email,
// //       password: password,
// //     }),
// //   });
// //
// //   const json = await res.json()
// //   return {response: json, ok: res.ok}
// // };
//

export {
    // forgetPasswordRequest,
    fetchSessionRequest,
}
