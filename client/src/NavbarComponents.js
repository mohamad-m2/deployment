import {Navbar, Form, Nav, FormControl,Button} from 'react-bootstrap' ;
import { Link } from 'react-router-dom' ;
import { useState } from 'react' ;
const Logo = (props) => {
    return (
            <Link to='/All' style={{ textDecoration: 'none' }}>
            <Navbar.Brand className="text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                <path d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
            </svg>
            ToDo Manager
            </Navbar.Brand>
            </Link>
            ) ;
} ;

const SearchForm = (props) => {
    return (
            <Form inline className="d-none d-sm-block mx-auto">
                <FormControl style={{'borderRadius': '20px'}} className="mr-sm-2" type="search" placeholder="Search a task here..." aria-label="Search"/> 
                <Button type="submit" style={{'borderRadius': '20px', backgroundColor:'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg></Button>
            </Form >
           ) ;
} ;

const UserIcon = (props) => {
    const [showUserMenu, setShowUserMenu] = useState(false) ;
    return (
            <div id="navbarDropdown" onClick={()=>setShowUserMenu(oldState => !oldState)}>
            <Nav className="ml-sm-auto">
                <svg className="text-light bi bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </Nav>
            <div className={`dropdown-menu ${showUserMenu?"show":""} dropdown-menu-right`} aria-labelledby="navbarDropdown">
            <Link to="/user" style={{ textDecoration: 'none' }}><div className="dropdown-item">User Profile</div></Link>
            <Link to="/login" style={{ textDecoration: 'none' }}><div className="dropdown-item validity-error" onClick={props.logout}>Logout</div></Link>
            </div>
            </div>
           ) ;
} ;

const ToDoNavbar = (props) => {
    return (
            <Navbar className="color-nav" variant="dark" expand="sm" sticky="top">
                <Navbar.Toggle  toggleSidebar={props.toggleSidebar} onClick={()=>props.toggleSidebar()}/>
                <Logo></Logo>    
                <SearchForm></SearchForm>
                <UserIcon logout={props.logout}></UserIcon>
            </Navbar>  
            ) ;
} ;

export default ToDoNavbar ;
