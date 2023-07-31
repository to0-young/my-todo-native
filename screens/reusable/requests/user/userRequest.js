
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



const getTasksRequest = async (page, orderAsc, fieldType) => {
 return  await fetch(
    `http://192.168.1.101:3000/api/v1/tasks?per_page=10&page=${page}&sort_order=${orderAsc}&sort_field=${fieldType}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}


//
// const getTasksRequest = async (page, orderAsc, fieldType) => {
//     return  await fetch(
//         `http://192.168.31.101:3000/api/v1/tasks?per_page=10&page=${page}&sort_order=${orderAsc}&sort_field=${fieldType}`,
//         {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }
//     );
// }




const updateCompletedTaskRequest = async (taskId) => {
   return await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: true,
        }),
    });

};

// const updateCompletedTaskRequest = async (taskId) => {
//     return await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, {
//         method: 'PATCH',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             completed: true,
//         }),
//     });
// };





const donCompletedTaskRequest = async (taskId) => {
    return await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: false,
        }),
    });
};



// const donCompletedTaskRequest = async (taskId) => {
//     return await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, {
//         method: 'PATCH',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             completed: false,
//         }),
//     });
// };



export {
  createUserRequest,
  forgetPasswordRequest,
  getTasksRequest,
    updateCompletedTaskRequest,
    donCompletedTaskRequest
}