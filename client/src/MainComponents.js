import { useState, useEffect } from 'react';
import { ListGroup, Col, Form, Modal, Button } from 'react-bootstrap' ;
import { Link } from 'react-router-dom';
import API from './API' ;
import charging from './charging.gif' ;

const ToDoSidebar = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => 
        <Link to={`/${element.replaceAll(" ", "")}`} style={{ textDecoration: 'none' }} key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} >
            <ListGroup.Item action className={`sidebar-left-elem ${props.title.split(/(?=[A-Z|0-9])/).join(" ") === element? "sidebar-left-elem-active": ""}`}  
            id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} 
            onClick={()=>{props.toggleSidebar() ; props.changeFilter(element.replaceAll(" ", ""));}}>
                {element}
            </ListGroup.Item>
        </Link>) ;

    return ( 
            <Col sm={4} as="aside" style={{textAlign:"left" , backgroundColor:"ghostwhite"}}
            className={`collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left ${props.collapsed?"":"show"}`} 
            id="CollapsableSidebar">
                {listItems}        
            </Col> 
            ) ;  
} ;


const FilterTitle = (props) => <h1 className="tasks-title">{props.title.split(/(?=[A-Z|0-9])/).join(" ")}
                                {props.updating||props.loading? <img src={charging} alt="charging" className="charging-gif"/> : <></>}
                                </h1> ;

const TaskRow = (props) => {
    return (<ListGroup.Item className="tasklist-elem todo-main" key={props.task.id}>
                <div className="d-flex w-100 justify-content-between pt-1">
                    <TaskInfo className="d-flex w-75" {...props}/>
                    <div className="d-flex w-25 justify-content-end">
                        <TaskControls id={props.task.id} removeTask={props.removeTask} openModal={props.openModal} 
                        handleToEdit={props.handleToEdit} editTask={props.editTask}/>
                    </div>
                </div>
            </ListGroup.Item>) ;
} ;

const TaskInfo = (props) => {
    const [checked, setChecked] = useState(props.task.completed) ;
    
    return (
            <>
            <Form.Check className='d-flex w-50 justify-content-start'>
                <Form.Check.Input className="me-1" checked={checked} onChange={ (event) => {setChecked(event.target.checked) ; API.toggleCompleted(props.task.id) ; props.updatingPage() ;} }/>
                    <Form.Label className={
                    /*if task is important make it red otherwise don't*/
                    props.task.urgent?"important-task ":""}>
                        <strong>{props.task.description}</strong>
                    </Form.Label>
                </Form.Check>
          
            <div className='d-flex w-50'>
            
                <div className='d-flex w-25'>
                    { /*if task is private print the icon otherwise don't*/
                    /* TODO: changed (in the db 0/1, not true/false)*/
                    props.task.privacy===1 && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                    fill="currentColor" className=" bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>)
                    }
                </div>
                <div className="d-flex w-75 ">
                    {/*if deadline is defined print it otherwise don't*/
                    props.task.deadline && <p className="deadline">{props.task.deadline.format("dddd D MMMM YYYY [at] HH:mm")}</p>} 
                </div>
            </div>
            </>
            ) ;
} ;

const TaskControls = (props) => {
    return (
            <p>
                <svg onClick={()=>{
                                    props.handleToEdit(props.id) ;
                                    props.openModal() ;
                                }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill text-warning update-button" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                <svg onClick={()=>props.removeTask(props.id)}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger delete-button" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </p>
            ) ;
} ;

const ToDoTaskList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="tasklist">
                { props.elements.map( (e) => <TaskRow task={e} key={e.id} removeTask={props.removeTask} openModal={props.openModal} handleToEdit={props.handleToEdit} editTask={props.editTask} updatingPage={props.updatingPage}/>)}
            </ListGroup>
            ) ;
} ;

const AddButton = (props) => {
    return (
            <a className="add-button" onClick={()=>{ props.openModal();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            ) ;
} ; 

const AddModal = (props) => {
    //states for input fields
    const [description, setDescription] = useState('') ;
    const [deadlineInput, setDeadlineInput] = useState(false) ;
    const [deadlineDate, setDeadlineDate] = useState('') ;
    const [deadlineTime, setDeadlineTime] = useState('') ;
    const [privacy, setPrivacy] = useState(true) ;
    const [urgent, setUrgent] = useState(false) ;
    

    //states for validation(and error messages)
    const [descriptionValidity, setDescriptionValidity] = useState(true) ;
    const [deadlineDateValidity, setDeadlineDateValidity] = useState(true) ;
    const [deadlineTimeValidity, setDeadlineTimeValidity] = useState(true) ;

    //function to manage the Add/Edit button click inside the modal
    const handleAdd = () => {
        
        let description_validity = true ;
        let deadlineDate_validity = true ;
        let deadlineTime_validity = true ;

        if(description === '') {
            description_validity = false ;
            setDescriptionValidity(false) ;
        } ;

        if (deadlineInput) {
            if(deadlineDate === ''){ 
                deadlineDate_validity = false ;
                setDeadlineDateValidity(false) ;
            } ;
            if(deadlineTime === ''){
                deadlineTime_validity = false ;
                setDeadlineTimeValidity(false) ;
            } ;
        } ;

        if (description_validity && deadlineDate_validity && deadlineTime_validity) {
            props.taskToEdit?
            props.editTask(props.taskToEdit, description, urgent, privacy, deadlineInput && `${deadlineDate} ${deadlineTime}`) :
            props.addTask({description: description, deadline: deadlineInput && `${deadlineDate} ${deadlineTime}`, privacy:privacy, urgent: urgent}) ;

            props.closeModal() ;
            props.handleToEdit(false) ;
            resetForms() ;
        } ;
        
    } ;


    //function to reset (or to fill) the input fields
    //
    //'taskToEdit' = false -> the modal will add a new task
    //'taskToEdit' = number -> the modal will edit the task with id = number
    const resetForms = () => {
        if (props.taskToEdit){
            const task = props.tasks.filter( task => task.id === props.taskToEdit)[0] ;
            setDescription(task.description) ;
            if(task.deadline)
                {
                    setDeadlineInput(true) ;
                    setDeadlineDate(task.deadline.format("YYYY-MM-DD")) ;
                    setDeadlineTime(task.deadline.format("HH:mm")) ;
                } 
            else 
                {
                    setDeadlineInput(false) ;
                    setDeadlineDate('') ;
                    setDeadlineTime('') ;
                }
            setPrivacy(task.privacy) ;
            setUrgent(task.urgent) ;
        }
        else{
            setDescription('') ;
            setDeadlineDate('') ;
            setDeadlineTime('') ;
            setPrivacy(true) ;
            setUrgent(false) ;
            setDeadlineInput(false) ;

            setDescriptionValidity(true) ;
            setDeadlineDateValidity(true) ;
            setDeadlineTimeValidity(true) ;
        } ;
    } ;

    return (
            <Modal show={props.showModal} 
            onHide={() => { props.closeModal(); props.handleToEdit(false); resetForms(); }} 
            onShow={() => resetForms()}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => { props.closeModal(); props.handleToEdit(false); resetForms(); }}>
                    <Modal.Title>
                        {props.taskToEdit?"Edit Task":"Create a new Task"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addTaskForm.Description">
                            <Form.Label>Task description</Form.Label>
                            <span className="validity-error" hidden={descriptionValidity}>{descriptionValidity?"":" Description is required!"}</span>
                            <Form.Control value={description} className={descriptionValidity?"":"error-border"} onChange={event => {
                                                                                                                                    setDescription(event.target.value);
                                                                                                                                    setDescriptionValidity(true);
                                                                                                                                    }} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Check>
                                <Form.Check.Input checked={deadlineInput} onChange={event => setDeadlineInput(event.target.checked)} id="deadline" type="checkbox" />
                                <Form.Check.Label htmlFor="deadline">Deadline</Form.Check.Label>
                        </Form.Check>
                        <Form.Row>
                            <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineDate">
                                <Form.Control disabled={!deadlineInput} className={deadlineDateValidity?"":"error-border"} value={deadlineDate} onChange={event => {
                                                                                                                                                                    setDeadlineDate(event.target.value);
                                                                                                                                                                    setDeadlineDateValidity(true);
                                                                                                                                                                    }} type="date" />
                                <span className="validity-error" hidden={deadlineDateValidity}>{deadlineDateValidity?"":"Missing Date!"}</span>                        
                            </Form.Group>
                            <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineTime">
                                <Form.Control disabled={!deadlineInput} className={deadlineTimeValidity?"":"error-border"} value={deadlineTime} onChange={event =>  {
                                                                                                                                                                    setDeadlineTime(event.target.value);
                                                                                                                                                                    setDeadlineTimeValidity(true);
                                                                                                                                                                    }} type="time" />
                                <span className="validity-error" hidden={deadlineTimeValidity}>{deadlineTimeValidity?"":"Missing Time!"}</span>                        
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={6}>
                                <Form.Check>
                                    <Form.Check.Input checked={privacy} onChange={event => setPrivacy(event.target.checked)} id="private" type="checkbox" />
                                    <Form.Check.Label htmlFor="private">Private</Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                            <Form.Group as={Col} sm={6}>
                                <Form.Check>
                                    <Form.Check.Input checked={urgent} onChange={event => setUrgent(event.target.checked)} id="important" type="checkbox" />
                                    <Form.Check.Label htmlFor="important">Important</Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.closeModal(); props.handleToEdit(false); resetForms();  }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        {props.taskToEdit?"Edit":"Create"}
                    </Button>
                </Modal.Footer>
        </Modal>
            ) ;
} ; 

const ToDoMain = (props) => {
    //state to manage the modal(open/closed)
    const [showModal, setShowModal] = useState(false) ;

    //function to open the modal
    const openModal = () => setShowModal(() => true) ;

    //function to close the modal
    const closeModal = () => setShowModal(() => false) ;

    //state to manage the task(id) to edit 
    //Possible values: 
    //         false -> we are creating a new task
    //          int  -> we are editing the task with id = int
    const [taskToEdit, setTaskToEdit] = useState(false) ;

    //function to set the task(id) to edit
    const handleToEdit = (id) => setTaskToEdit(() => id) ;

    // state to close the welcome message
    const [closeMessage, setCloseMessage] = useState(false) ;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${props.title} | ToDo Manager`;
      });

    return (
            <Col as='main' xs={12} sm={8}>
                <div id="tasklist-container">
                    <>{/*props.changeFilter(props.title)*/}</>
                    <button type="button" className="close align-items-end" hidden={closeMessage} onClick={()=>setCloseMessage(true)}><span>×</span></button>
                    <div className="h3 alert-success login-modal-text" hidden={closeMessage}>{ `Welcome to your ToDo Manager, ${props.userName}!` }
                    </div>   
                    <FilterTitle title={props.title} loading={props.loading} updating={props.updating}></FilterTitle>
                    <ToDoTaskList elements={props.tasks} removeTask={props.removeTask} openModal={openModal} handleToEdit={handleToEdit} updatingPage={props.updatingPage}></ToDoTaskList>  
                    <AddButton showModal={showModal} openModal={openModal} ></AddButton>
                    <AddModal showModal={showModal} closeModal={closeModal} handleToEdit={handleToEdit} addTask={props.addTask} editTask={props.editTask} tasks={props.tasks} taskToEdit={taskToEdit}></AddModal>
                </div>
            </Col>
            ) ;
} ;

export { ToDoSidebar, ToDoMain } ;
