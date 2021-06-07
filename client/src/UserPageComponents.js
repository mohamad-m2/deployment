import { Alert,Row, Button, Form, InputGroup, Card } from 'react-bootstrap' ;
import { useState, useEffect } from 'react' ;
import backGround from './background.jpg' ;
import API from './API.js'
import { Redirect } from 'react-router';

var sectionStyle = {
    backgroundImage: `url(${backGround})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    height: "100vh", 
    width: "100vw"
 }

//TODO: user creation
const CreateUserForm = (props) => {
    
    // states for input fields
    const [username, setUsername] = useState('') ;
    const [name, setName] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [confirmPassword, setConfirmPassword] = useState('') ;
    const [acceptTerms, setAcceptTerms] = useState(false) ;
   
    // states for validation(and error messages)
    const [usernameValidity, setUsernameValidity] = useState(true) ;
    const [nameValidity, setNameValidity] = useState(true) ;
    const [passwordValidity, setPasswordValidity] = useState(true) ;
    const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(true) ;
    const [acceptTermsValidity, setAcceptTermsValidity] = useState(true) ;

    // states for password show/unshow
    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;

    // state to manage the creation error message
    const [correctCreation, setCorrectCreation] = useState(false) ;

    
    // function to check if the email is in a valid form
    const validateMail = (email) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ;
    } ;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Register | ToDo Manager`;
      });
    
    // function to handle account creation (with validation)
    const handleCreate = () => {
        let username_validity = true ;
        let name_validity = true ;
        let password_validity = true ;
        let confirmPassword_validity = true ;
        let acceptTerms_validity = true ;
        
        if(username === '' || !validateMail(username)) {
            username_validity = false ;
            setUsernameValidity(false) ;
        } ;

        if(name === '') {
            name_validity = false ;
            setNameValidity(false) ;
        } ;

        if(password === '' || password.length < 8) {
            password_validity = false ;
            setPasswordValidity(false) ;
        } ;

        if(password !== confirmPassword) {
            confirmPassword_validity = false ;
            setConfirmPasswordValidity(false) ;
        } ;

        if(!acceptTerms) {
            acceptTerms_validity = false ;
            setAcceptTermsValidity(false) ;
        } ;

        if (username_validity && name_validity && password_validity && confirmPassword_validity && acceptTerms_validity) {
        console.log("create_account") ;
  
        API.createUser(name,username,password).then((createResult)=>{
            if(createResult===null)
                setCorrectCreation(true)
                setTimeout(() => window.location.replace('/login'), 2000)
        });
        /*.then(()=> {
            setUserCreated(true) ;
        }) ;*/
        /*const credentials = { username, password } ;
        const loginResult = props.login(credentials)
        .then(
        (loginResult) => {
        if (loginResult) 
            setWrongLogin(true) ;
        } ) ;
        } ;*/
    } ;
} ;
   

    return (
     
        <div style={sectionStyle}>
            <Row className="justify-content-md-center" >
            <Card className="text-center align-self-center" style={{top:"25px",borderRadius:"25px"}}>
                <Card.Header>
                    <h1 className="login-modal-text w-100 login-title" id="contained-modal-title-vcenter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="current-color" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <br/>
                        <div className="font-weight-bold" style={{color:"black"}}>
                            Sign Up
                        </div>
                    </h1>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Fill the forms below to create your account.</Card.Title>
                    <Card.Text as="div">
                        <Form>
                            <Form.Group>
                            <InputGroup  className="input-group-md">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                placeholder="Name"
                                aria-label="Name"
                                aria-describedby="basic-addon1"
                                className={`form-control-md ${nameValidity?"":"error-border"}`} 
                                value = {name}
                                onChange = {event => {
                                                        setName(event.target.value) ;
                                                        setNameValidity(true) ;
                                                        setCorrectCreation(false) ;
                                                        /*setWrongLogin(false) ;*/
                                                        }}
                            />
                            </InputGroup>
                            <span className="validity-error" hidden={nameValidity}>{nameValidity?"":"Name field can't be empty!"}</span> 
                            </Form.Group>
                            <Form.Group>
                            <InputGroup  className="input-group-md">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                placeholder="E-mail"
                                aria-label="E-mail"
                                aria-describedby="basic-addon1"
                                className={`form-control-md ${usernameValidity?"":"error-border"}`} 
                                value = {username}
                                onChange = {event => {
                                                        setUsername(event.target.value) ;
                                                        setUsernameValidity(true) ;
                                                        setCorrectCreation(false) ;
                                                        /*setWrongLogin(false) ;*/
                                                        }}
                            />
                            </InputGroup>
                            <span className="validity-error" hidden={usernameValidity}>{usernameValidity?"":"E-mail format not correct!"}</span>        </Form.Group>
                            <Form.Group>
                            <InputGroup  className="input-group-md">
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
                            className={`form-control ${passwordValidity?"":"error-border"}`} 
                            value = {password}
                            onChange = {event => {
                                                    setPassword(event.target.value) ;
                                                    setPasswordValidity(true) ;
                                                    setCorrectCreation(false) ;
                                                    /*setWrongLogin(false) ;*/
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
                            <span className="validity-error" hidden={passwordValidity}>{passwordValidity?"":"Password is too short (< 8 characters)!"}</span>   
                            </Form.Group>
                            <Form.Group>
                            <InputGroup className="input-group-md">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                                </svg>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                                <Form.Control
                                type={showConfirmPassword?"text":"password"}
                                placeholder="Confirm Password"
                                aria-label="Confirm Password"
                                aria-describedby="basic-addon1"
                                className={`form-control-md ${confirmPasswordValidity?"":"error-border"}`} 
                                value = {confirmPassword}
                                onChange = {event => {
                                                        setConfirmPassword(event.target.value) ;
                                                        setConfirmPasswordValidity(true) ;
                                                        setCorrectCreation(false) ;
                                                        /*setWrongLogin(false) ;*/
                                                        }}
                                /> 
                                <InputGroup.Append>
                                <InputGroup.Text>
                                {
                                showConfirmPassword?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" onClick={()=> setShowConfirmPassword(false)}>
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                                 :
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16" onClick={()=> setShowConfirmPassword(true)}>
                                 <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                 <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                }
                                </InputGroup.Text>
                            </InputGroup.Append>
                                </InputGroup> 
                                <span className="validity-error" hidden={confirmPasswordValidity}>{confirmPasswordValidity?"":"Passwords don't match!"}</span>   
                            </Form.Group>
                            <Form.Check>
                                    <Form.Check.Input checked={acceptTerms} onChange={event => setAcceptTerms(event.target.checked)} id="acceptTerms" type="checkbox"/>
                                    <Form.Check.Label htmlFor="acceptTerms">I accept the Terms of Use and Privacy Policy.</Form.Check.Label>
                            </Form.Check>
                            <span className="validity-error" hidden={acceptTermsValidity}>{acceptTermsValidity?"":"You must accept our Terms!"}</span>   
                        </Form> 
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted" style={{padding:"0.5rem 1.5rem"}}>
                    <Alert variant="success" hidden={!correctCreation}>{!correctCreation ?"":"User created!"}</Alert>
                    <Button variant="success" style={{borderRadius:"25px"}} block onClick={handleCreate}>{<h5>Create Account</h5>}{/*TODO: migliora*/}</Button>    
                    <div className="h3 alert-danger login-modal-text" hidden={true/*!wrongLogin*/}>{/*!wrongLogin?"":"Invalid E-mail and/or Password!"*/}</div>   
                </Card.Footer>
            </Card>
            </Row>
        </div>

     
        );
} ;

const ShowUserProfile = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `User Profile | ToDo Manager`;
      });
    return (
            <>
            <h1>{props.userId}</h1>
            <h1>{props.userName}</h1>
            <h1>{props.userEmail}</h1>
            </>
    )
} ;

export {CreateUserForm, ShowUserProfile} ;