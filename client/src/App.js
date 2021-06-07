
import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import dayjs from 'dayjs' ;
import ToDoNavbar from './NavbarComponents.js' ;
import { ToDoSidebar, ToDoMain } from './MainComponents.js' ;
import { Container, Row } from 'react-bootstrap' ;
import { useState, useEffect } from 'react' ;
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom' ;
import confused from './confused.gif' ;
import API from './API.js' ;
import { LoginPage } from './LoginComponents' ;
import { CreateUserForm, ShowUserProfile } from './UserPageComponents' ;

//TODO: fare query con user

//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined, completed = false){
  if (!id) throw new Error('ID is required!') ;
  else if (!description) throw new Error('Description is required!') ;
  this.id = id ; 
  this.description = description ;
  this.urgent = urgent ;
  this.privacy = privacy ;
  this.deadline = deadline? dayjs(deadline) : "" ; 
  this.completed = completed ;
  //TODO: add user
} ;

const filters = ['All', 'Important', 'Today', 'Next 7 Days', 'Private'] ;

function App() {

  //state to manage tasks addition
  const [tasks, setTasks] = useState([]) ;
  //state representing max task id
  const [maxId, setMaxId] = useState('') ; //TODO: needed?
  //state for task loading at mount time
  const [loading, setLoading] = useState(true) ;
  //state for task updating
  const [updating, setUpdating] = useState(true) ;
  
  //function needed in ToDoMain -> ToDoTaskList -> TaskRow -> TaskInfo
  const updatingPage = () => {
    setUpdating(true) ;
  } ;

  //state to manage tasks filter
  const [filter, setFilter] = useState('') ;
  
  const changeFilter = (newFilter) => {
    console.log("DEBUG:FILTER CHANGE: "+newFilter) ;
    setFilter( newFilter ) ;
    setUpdating(true) ;
  } ;

  // State to manage login
  const [loggedIn, setLoggedIn] = useState(false) ;
  // States to manage the user infos
  const [userId, setUserId] = useState('') ;
  const [userName, setUserName] = useState('') ;
  const [userEmail, setUserEmail] = useState('') ;
  
  //Check if the user is already logged in
  useEffect(()=> {
    const checkAuth = async() => {
      try {
        
        const userInfo = await API.getUserInfo()
        .then( ( userInfo ) => {
        setUserId(userInfo.id) ;
        setUserName(userInfo.name) ;
        setUserEmail(userInfo.username) ;
        }) ;
        console.log("USER INFO: ")
        console.log(userInfo) ;
        setLoggedIn(true);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  //Rehydrate with all tasks at mount time, when a filter is selected and when a task is added/deleted/updated
  useEffect(() => {
    if(updating && filter){
      API.loadTasks(filter).then((retrievedTasks)=> {
        console.log("DEBUG: task reloaded") ;
        setTasks(retrievedTasks.length?retrievedTasks.map( t => new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed)):retrievedTasks) ;
        setLoading(false) ;
        setUpdating(false) ;
      }) ;
      API.retrieveMaxId().then((retrievedId)=> setMaxId(retrievedId.maxid) ) ;
    } ;
  }, [updating, filter, loggedIn]) ;

  // Function to do the login
  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUserName(user);
    } catch(err) {
      return err ;
      //setMessage({msg: err, type: 'danger'}); TODO: come gestire??
    }
  }

  // Function to do the logout
  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setTasks([]) ;
    setMaxId('') ;
    setFilter('') ;
    setUserName('') ;
  }
  


//function to add a task
const addTask = (newTask) => {
  const t = new Task(maxId+1, newTask.description, newTask.urgent, newTask.privacy, newTask.deadline) ;
  API.addTask(t).then(setUpdating(true)) ;
} ;

//function to edit a task
const editTask = (taskId, newDescription, newUrgent , newPrivacy, newDeadline) => {
  API.editTask(taskId, newDescription, newUrgent , newPrivacy, newDeadline).then(setUpdating(true)) ;
} ;


//function to remove a task
const removeTask = (taskId) => {
  API.deleteTask(taskId).then(setUpdating(true)) ;
} ;
  

//state to manage toggle sidebar
const [collapsed, setCollapsed] = useState(true) ;

const toggleSidebar = () => {
  setCollapsed( oldCollapsed => !oldCollapsed ) ;
} ;

//callback to reset sidebar (passing from mobile to desktop version)
useEffect(() => 
{window.addEventListener('resize', ()=>{if (window.innerWidth > 575) setCollapsed(true)})}
) ;

return (
    <Router>
      <div className="App">
        {loggedIn?<ToDoNavbar toggleSidebar={toggleSidebar} logout={doLogOut}></ToDoNavbar>:''}
        <Switch>
          <Route exact path='/'
            render={() =>
              <>{loggedIn ?
                <Redirect to='/All' /> :
                <Redirect to='/login'/>
                }
              </> 
            }
          />
          <Route path='/login'
            render={() => 
                <>{loggedIn ? 
                  <Redirect to="/All" /> : 
                  <LoginPage login={doLogIn}/>
                  }
                </>
            }
          />
          <Route path='/user'
            render={() => 
                <>{loggedIn ? 
                  <ShowUserProfile userId={userId} userName={userName} userEmail={userEmail}/> :
                  <CreateUserForm/> 
                  }
                </>
            }
          />
          <Route path='/:filter'
              children={({match}) => filters.includes(match.params.filter.split(/(?=[A-Z|0-9])/).join(" ")) ? 
                                      ( 
                                        loggedIn?
                                        <Container fluid>
                                              <>{filter!==match.params.filter?changeFilter(match.params.filter):""}</>
                                              <Row className="vheight-100">
                                                <ToDoSidebar elements={filters} collapsed={collapsed} toggleSidebar={toggleSidebar} title={match.params.filter} changeFilter={changeFilter}></ToDoSidebar>
                                                <ToDoMain title={match.params.filter} tasks={tasks} addTask={addTask} removeTask={removeTask} editTask={editTask} loading={loading} updating={updating} updatingPage={updatingPage} changeFilter={changeFilter} userName={userName}></ToDoMain>
                                              </Row>
                                        </Container>
                                        :
                                        <Redirect to='/login'></Redirect>
                                      ) :
                                      (
                                        <>
                                          <img src={confused} alt="confused" className="d-block mx-auto img-fluid w-50"/>
                                          <h1 className='validity-error text-center'>Error!</h1>
                                          <h3 className='text-center'>The page you requested doesn't exist. You will be redirected to the home page in few seconds...</h3>
                                          <p hidden='true'>{setTimeout(() => window.location.replace('/login'), 5000)}</p>
                                        </>
                                      )
                                    }
          /> 
        </Switch>
      </div>
    </Router>
  );
} ;

export default App;
