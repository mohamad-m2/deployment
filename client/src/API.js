import dayjs from 'dayjs' ;

//API to load all the tasks from the db
async function loadTasks(filter){
    const response = await fetch('/api/tasks/filters/'+filter) ;
    const fetchedTasks = await response.json() ;
    return fetchedTasks.map( t => ({id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed}) ) ;
  } ;

//API to add a task to the db 
async function addTask(task) { 
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "description": task.description, 
        "important": task.urgent, 
        "privacy": task.privacy, 
        "deadline": task.deadline? dayjs(task.deadline).format("YYYY-MM-DD HH:mm") : ''
      } )
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'POST error' };
    }
} ;

//API to delete a task from the db 
async function deleteTask(id) {
    const response = await fetch('/api/tasks/' + id, 
    {
        method: 'DELETE',
    });
    if (response.ok) {
        return id;
    } else return { 'err': 'DELETE error' };
} ;

//API to edit a task 
async function editTask(id, description, urgent , privacy, deadline) {
    const response = await fetch('/api/tasks/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "description": description, 
        "important": urgent, 
        "privacy": privacy, 
        "deadline": deadline? dayjs(deadline).format("YYYY-MM-DD HH:mm") : ''
      } )
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'PUT error' };
    }
} ;

//API to retrieve max Task id
async function retrieveMaxId(){
    const response = await fetch('/api/maxtaskid') ;
    const fetchedId = await response.json() ;
    return fetchedId ;
  } ;

//API to set an existing task as completed/uncompleted
async function toggleCompleted(id) {
    const response = await fetch('/api/tasks/toggleCompleted/' + id, {
        method: 'PUT',
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'PUT error' };
    }
} ;

//API to do the login
async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user.name;
    }
    else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  } ;

//API to do the logout
async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
  } ;

//API to get user info
async function getUserInfo() {
    const response = await fetch('api/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }
  async function createUser(name,email,password){

    const response = await fetch('/api/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
      "name":name , 
      "email":email, 
      "password":password, 
    } )
  });
  if (response.ok) {
    return null;
  } else {
    return { 'err': 'POST error' };
  }

}

const API = { loadTasks, addTask, deleteTask, retrieveMaxId, editTask, toggleCompleted, logIn, logOut, getUserInfo,createUser } ;
export default API ;