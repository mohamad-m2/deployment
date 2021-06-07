import { Row, Button, Nav, Form, InputGroup, Card, Alert} from 'react-bootstrap' ;
import { useState, useEffect } from 'react' ;
import backGround from './background.jpg' ;

var sectionStyle = {
    backgroundImage: `url(${backGround})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    height: "100vh", 
    width: "100vw"
 } ;

const LoginForm = (props) =>{

    // states for input fields
    const [username, setUsername] = useState('') ;
    const [password, setPassword] = useState('') ;

    // states for validation(and error messages)
    const [usernameValidity, setUsernameValidity] = useState(true) ;
    const [passwordValidity, setPasswordValidity] = useState(true) ;

    // state to manage the login error message
    const [wrongLogin, setWrongLogin] = useState(false) ;

    // state for password show/unshow
    const [showPassword, setShowPassword] = useState(false) ;

    // function to check if the email is in a valid form
    const validateMail = (email) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ;
    } ;
    
    // function to handle login (with validation)
    const handleLogin = () => {
        let username_validity = true ;
        let password_validity = true ;
        
        if(username === '' || !validateMail(username)) {
            username_validity = false ;
            setUsernameValidity(false) ;
        } ;

        if(password === '' || password.length < 8) {
            password_validity = false ;
            setPasswordValidity(false) ;
        } ;

        if (username_validity && password_validity) {
        const credentials = { username, password } ;
        props.login(credentials)
        .then(
        (loginResult) => {
        if (loginResult) 
            setWrongLogin(true) ;
        } ) ;
        } ;
    } ;
    
    return(
          
          
            
        <div style={sectionStyle}>
        <Row className="d-flex justify-content-center">
        <Card className="text-center align-self-center" style={{top:"15px",borderRadius:"25px"}}>
                <Card.Header>
                    <h1 className="login-modal-text w-100 login-title" id="contained-modal-title-vcenter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="current-color" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <br/>
                        <div className="font-weight-bold" style={{color:"black"}}>
                            Sign In
                        </div>
                    </h1>
                </Card.Header>
        <Card.Body style={{padding:"0.75rem"}}>
        <Card.Text as="div">
        <Form style={{ color:"white"}}>
        <Form.Group>
        <div className="h3 login-modal-text w-100 login-title" id="contained-modal-title-vcenter">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#17a2b9" className="bi bi-check2-all" viewBox="0 0 16 16">
            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
            <path d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
        </svg>
       <br/>
       <div>
            ToDo Manager
        </div>
        </div>
        </Form.Group>
        
        
        <Form.Group >
        <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
            placeholder="E-mail"
            aria-label="E-mail"
            aria-describedby="basic-addon1"
            className={`form-control-md ${usernameValidity?"":"error-border-login"}`} 
            value = {username}
            onChange = {event => {
                                    setUsername(event.target.value) ;
                                    setUsernameValidity(true) ;
                                    setWrongLogin(false) ;
                                    }}
        />
        </InputGroup>
        <span className="validity-error-login " hidden={usernameValidity}>{usernameValidity?"":"E-mail format not correct!"}</span>        </Form.Group>
        <Form.Group>
        <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
            </svg>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
        type={showPassword?"text":"password"}
        placeholder="Password"
        aria-label="Password"
        aria-describedby="basic-addon1"
        className={`form-control-md ${passwordValidity?"":"error-border-login"}`} 
        value = {password}
        onChange = {event => {
                                setPassword(event.target.value) ;
                                setPasswordValidity(true) ;
                                setWrongLogin(false) ;
                                }}
        />
        <InputGroup.Append>
            <InputGroup.Text>
            {
            showPassword?
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" onClick={()=> setShowPassword(false)}>
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16" onClick={()=> setShowPassword(true)}>
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
            }
            </InputGroup.Text>
        </InputGroup.Append> 
        </InputGroup> 
        <span className="validity-error-login" hidden={passwordValidity}>{passwordValidity?"":"Password is too short (< 8 characters)!"}</span>   
        </Form.Group>
        
      
            
        </Form>
        </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted" style={{padding:"0.5rem 1.5rem"}}>
        <Form.Group>
        <Alert variant="danger" hidden={!wrongLogin}>{!wrongLogin?"":"Invalid E-mail and/or Password!"}</Alert>
        <Button variant="success" style={{borderRadius:"25px"}} block onClick={handleLogin}>{<h5>Login</h5>}</Button>   
        <Nav.Link className="h6 login-modal-text w-100 forgot">Forgot Password?</Nav.Link>
        </Form.Group> 
        <Form.Group>
            <div className="h5 login-modal-text w-100">
                Don't have an account? <Nav.Link href="/user" className="h4">Sign Up</Nav.Link>
            </div>
        </Form.Group>
            </Card.Footer>
            
            </Card>
            
        </Row>
    </div>
   
    
    )
}

const LoginPage = (props) => {
    // state to manage modal opening
    //const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Login | ToDo Manager`;
      });


    return (
            
            
            <LoginForm login={props.login}/>
            
            
            
        
    )
} ;

export {LoginPage} ;