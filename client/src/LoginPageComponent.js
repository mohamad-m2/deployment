import {Form, Button,Alert,Col, Container} from 'react-bootstrap' ;
import backGround from './sfondo.jpg' ;
import { useState } from 'react';
var sectionStyle = {
    backgroundImage: `url(${backGround})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    height: "100vh", 
    width: "100vw"
 }
const Title = (props) =>{
    
    return(
        <>
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#17a2b9" className="bi bi-check2-all" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                <path d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
            </svg>
        ToDo Manager
        </>
    ) ;
}
const LoginForm = (props) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('') ;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };
        
        // SOME VALIDATION, ADD MORE!!!
        let valid = true;
        if(username === '' || password === '' || password.length < 6)
            valid = false;
        
        if(valid)
        {
          props.login(credentials);
        }
        else {
          // show a better error message...
          setErrorMessage('Error(s) in the form, please fix it.')
        }
    };

    return(
        <div style={sectionStyle}>
        
          
            
            
        <div className="d-flex justify-content-center ">
        
        <Form style={{marginTop:"150px", color:"white"}}>
            <Title></Title>
            {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Form.Group controlId="formBasicEmail">
                <Form.Control style={{borderRadius:"10px", blockSize:"50px"}} type="email" value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Enter email" />
                <Form.Text  style={{color:"white"}}>
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control style={{borderRadius:"10px",blockSize:"50px"}}  type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" style={{color:"white"}} />
            </Form.Group>
            <Button className="btn btn-lg btn-block login-button" onClick={handleSubmit} type="submit">
                Login
            </Button>
            
        </Form>
        </div>
   
    </div>
    )
}
function LogoutButton(props) {
    return(
        <Button variant="btn btn-lg logout-button" onClick={props.logout}>Log out</Button>
    )
  }
export {LoginForm, LogoutButton} ;