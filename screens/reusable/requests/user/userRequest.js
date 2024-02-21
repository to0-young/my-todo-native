
const createUserRequest = async (formData) => {
  return fetch('http://192.168.31.101:3000/api/v1/users', { // Home
    //   return fetch('http://192.168.1.101:3000/api/v1/users', { // Work
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
}

const forgetPasswordRequest = async (email) => {
  return fetch('http://192.168.31.101:3000/api/v1/forget_passwords', { // Home
  // return fetch('http://192.168.1.101:3000/api/v1/forget_passwords', { // Work
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    email
    }),
  })
}

const getTasksRequest = async (page, orderAsc, fieldType) => {
    return  await fetch(`http://192.168.31.101:3000/api/v1/tasks?per_page=10&page=${page}&sort_order=${orderAsc}&sort_field=${fieldType}`, // Home
    // return  await fetch(`http://192.168.1.101:3000/api/v1/tasks?per_page=10&page=${page}&sort_order=${orderAsc}&sort_field=${fieldType}`, // Work
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

const updateTaskRequest = async (taskId, completed) => {
    const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, { // Home
    // const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, { // Work
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: completed,
        }),
    });
    return await res.json();
};

const deleteTaskRequest = async (taskId) => {
    const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, { // Home
    // const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, { // Work
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
};

const fetchEditTask = async (taskId) => {
  const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${taskId}`, { // Home
  // const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, { // Work
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

const updateEditTask = async (task) => {
  const res = await fetch(`http://192.168.31.101:3000/api/v1/tasks/${task.id}`, { // Home
  // const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${task.id}`, { // Work
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

const fetchMessagesApi = async () => {
   return  fetch(`http://192.168.31.101:3000/messages`, { // Home
   // return  fetch(`http://192.168.1.101:3000/messages`, { // Work
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    });
}

const sendMessageRequest = async (msg, firstName) => {
  return fetch(`http://192.168.31.101:3000/messages`, { // Home
  // return fetch(`http://192.168.1.101:3000/messages`, { // Work
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      body: msg,
      first_name: firstName,
    }),
  })
}

const deleteMessageRequest = async (messageId) => {
  return fetch(`http://192.168.31.101:3000/messages/${messageId}`, { // Home
  // return fetch(`http://192.168.1.101:3000/messages/${messageId}`, { // Work
    method: 'DELETE',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
  });
};

// Не забудь змінити адреса в "Чаті і в NewTask"

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