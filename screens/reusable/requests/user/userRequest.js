
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



const updateTaskRequest = async (taskId, completed) => {
    const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: completed,
        }),
    });
    return await res.json();
};


// const updateTaskRequest = async (taskId, completed) => {
//     const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, {
//         method: 'PATCH',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             completed: completed,
//         }),
//     });
//     return await res.json();
// };



const deleteTaskRequest = async (taskId) => {
    const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
};


// const deleteTaskRequest = async (taskId) => {
//     const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//     });
//     return await res.json();
// };



const fetchEditTask = async (taskId) => {
  const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};


// const fetchEditTask = async (taskId) => {
//   const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, {
//     method: "GET",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//   });
//   return await res.json();
// };




const updateEditTask = async (task) => {
  const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${task.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: task.dueDate,
    }),
  });
  return await res.json();
}


// const updateEditTask = async (task) => {
//   const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${task.id}`, {
//     method: "PATCH",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       due_date: task.dueDate,
//     }),
//   });
//   return await res.json();
// }


const fetchMessagesApi = async () => {
  return fetch(`http://192.168.1.101:3000/messages`, {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
  });
}


// const fetchMessagesApi = async () => {
//    return  fetch(`http://192.168.31.101:3000/messages`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: {'Content-Type': 'application/json'},
//     });
// }



const sendMessageRequest = async (msg, firstName) => {
  return fetch(`http://192.168.1.101:3000/messages`, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      body: msg,
      first_name: firstName,
    }),
  });
};


// const sendMessageRequest = async (msg, firstName) => {
//   return fetch(`http://192.168.31.101:3000/messages`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       body: msg,
//       first_name: firstName,
//     }),
//   })
// }


const deleteMessageRequest = async (messageId) => {
  return fetch(`http://192.168.1.101:3000/messages/${messageId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
  });
};


// const deleteMessageRequest = async (messageId) => {
//   return fetch(`http://192.168.31.101:3000/messages/${messageId}`, {
//     method: 'DELETE',
//     credentials: 'include',
//     headers: {'Content-Type': 'application/json'},
//   });
// };


export {
  createUserRequest,
  forgetPasswordRequest,
  getTasksRequest,
    updateTaskRequest,
    deleteTaskRequest,
  fetchEditTask,
  updateEditTask,
    fetchMessagesApi,
  sendMessageRequest,
  deleteMessageRequest,
}