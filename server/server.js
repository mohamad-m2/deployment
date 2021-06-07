const express = require('express') ;
const morgan = require('morgan') ;
const tasksDao = require('./tasks-dao.js') ;
const { body, validationResult } = require('express-validator') ;
const session = require('express-session') ; 
const bcrypt=require('bcrypt')
const passport = require('passport') ;
const passportLocal = require('passport-local') ;
const userDao = require('./user-dao.js') ;

// Passport initialization
// (local strategy uses 'username' by default)
passport.use(new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication
    userDao.getUser(username, password).then(user => {
      if (user)
        done(null, user);
      else
        done(null, false, { message: 'Wrong E-mail or Password!' });
    }).catch(err => {
      // db error
      done(err);
    });
  }));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
      .then(user => {
        done(null, user); // this will be available in req.user
      }).catch(err => {
        done(err, null);
      });
  });

//TODO: 0/1 anzichè true/false

const PORT = 3001;

app = new express(); //TODO: why not const app = express() ?

app.use(morgan('dev')) ;
app.use(express.json()) ;

// Middleware to check if the session is authenticated or not
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
  
    return res.status(401).json({ error: 'Not authenticated' });
  } ;

// Session initialization
app.use(session({
    secret: 'this and that and other', //TODO: change this secret?
    resave: false,
    saveUninitialized: false
}));

// Making passport use session cookies
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send('Server currently active.')
}) ;

/*** Tasks APIs ***/

//function to retrieve all tasks
app.get('/api/tasks', isLoggedIn, async (req,res) => {
    try {
        let tasks = await tasksDao.getTasks("All", req.user.id) ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve all tasks with a filter
app.get('/api/tasks/filters/:filter', isLoggedIn, async (req,res) => {
    const filter = req.params.filter ;
    try {
        console.log(req.user.id) ;
        let tasks = await tasksDao.getTasks(filter, req.user.id) ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve a task by id(TODO: needed?)
app.get('/api/tasks/:id', isLoggedIn, async (req,res) => {
    const id = req.params.id ;
    try {
        let task = await tasksDao.getTask(id) ;
        res.json(task) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to create a new task
//OLD
/*
app.post('/api/tasks', async (req, res) => {
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let lastID = await tasksDao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
}) ;
*/
    
//function to create a new task(with validation)
app.post('/api/tasks',[
    body('description', "Description required!").notEmpty(),
    body('important', "Important should be a Boolean!").isBoolean(),
    body('privacy', "Private should be a Boolean!").isBoolean(),
    body('deadline', "Deadline must be a valid date('YYYY-MM-DD HH:mm' or empty!").matches(/^\d\d\d\d\-([0]\d|[0-1][0-2])\-([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3]):[0-5]\d|^$/) 
    ],
    isLoggedIn,
    async (req, res) => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }) ;
    }
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let lastID = await tasksDao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}, req.user.id) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

//function to update an existing task
app.put('/api/tasks/:id',[
    body('description', "Description required!").notEmpty(),
    body('important', "Important should be a Boolean!").isBoolean(),
    body('privacy', "Private should be a Boolean!").isBoolean(),
    body('deadline', "Deadline must be a valid date!(YYYY-MM-DD HH:mm)").matches(/^\d\d\d\d\-([0]\d|[0-1][0-2])\-([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3]):[0-5]\d|^$/) 
    ], isLoggedIn, async (req, res) => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }) ;
    }
    let id = req.params.id ;
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let ID = await tasksDao.updateTask({id: id, description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

//function to set an existing task as completed/uncompleted
app.put('/api/tasks/toggleCompleted/:id', isLoggedIn, async (req, res) => {
    let id = req.params.id ;

    try{
    let ID = await tasksDao.toggleCompleted(id) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

 //function to delete a task
app.delete('/api/tasks/:id', isLoggedIn, async (req, res) => {
    let id = req.params.id ;

    try{
    let ID = await tasksDao.deleteTask(id) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

 //function to retrieve max task id
app.get('/api/maxtaskid', isLoggedIn, async (req,res) => {
    try {
        let result = await tasksDao.getMaxId() ;
        res.json(result) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

/*** Users APIs ***/

// Function for Login
app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          // this is coming from userDao.getUser()
          return res.json(req.user);
        });
    })(req, res, next);
  });
   
  // Function for Logout
  app.delete('/api/sessions/current', (req, res) => {
    req.logout();
    res.end();
  });
  
  // Function to check whether the user is logged in or not
  app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.status(200).json(req.user);}
    else
      res.status(401).json({error: 'Unauthenticated user!'});;
  });

/*** Server Activation ***/

app.post('/api/createUser',
    async (req, res) => {
    
    let name = req.body.name ;
    let email = req.body.email ;
    let password = req.body.password ;
      console.log(password)
    const passwordHash = bcrypt.hashSync(password, 10);
    try{
      console.log(passwordHash)
    let lastID = await userDao.createUser(email, name, passwordHash) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

app.listen(PORT, ()=>console.log(`ToDo Manager Server running on http://localhost:${PORT}/`));