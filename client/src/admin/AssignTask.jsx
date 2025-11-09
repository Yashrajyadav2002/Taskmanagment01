import axios from "axios";
import { useState,useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AssignTask = ()=>{
    const [ mydata,setmydata]= useState([]);
    const [show, setShow]= useState(false);
    const [ input,setInput]= useState({});
    const [uid,setUid]= useState("");


    const handleClose = ()=> setShow(false);
    const handleShow= (id)=>{
        setUid(id);
        setShow(true);
    }

    const LoadData = async ()=>{
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/empdisplay`;
            const responce = await axios.get(api);
            console.log(responce.data);
            setmydata(responce.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        LoadData();
    },[])

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(values=>({...values,[name]:value}));
        console.log(input);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/tasksave`;
               const response = await axios.post(api, {id:uid, ...input});
               console.log(response);
        } catch (error) {
            console.log(error);
            
        }
    }

    const ans = mydata.map((key)=>{
        return(
            <>
            <tr>
                <td>{key.name}</td>
                <td>{key.designation}</td>
                <td>{key.email}</td>
                <td>
                    <Button variant="success" onClick={()=>{handleShow(key._id)}}>Assign Task</Button> 
                </td>
            </tr>
            </>
        )
    })

    return(
        <>
        <h1> Assign task</h1>

        
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </Table>



            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Task</Form.Label>
        <Form.Control type="text" name="task" onChange={handleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Duration Days </Form.Label>
        <Form.Control type="text" name="duration" onChange={handleInput}  />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Select Priority </Form.Label>
        <Form.Select aria-label="Default select example" name="priority" onChange={handleInput}>
      <option>select priority</option>
      <option value="High">High Priority</option>
      <option value="Medium">Medium Priority</option>
      <option value="Low">Low Priority</option>
    </Form.Select>
      </Form.Group>
      <Button variant="primary"  onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </Modal.Body>
      </Modal>

        </>

    )
}

export default AssignTask;