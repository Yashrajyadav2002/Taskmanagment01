import { useState } from "react";
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/form';
import axios from "axios";
import {useNavigate} from "react-router-dom";
 const Home = ()=>{
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [usertype,setUserType]= useState("");
    const navigate = useNavigate();


    const handleSubmit=async(e)=>{
        e.preventdefault();
        if(usertype=="admin")
        {
            try {

                let api = `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
                const responce = await axios.post(api,{
                    email:email,password:password
                });
                console.log(responce);
                localStorage.setItem("adminemail",
                responce.data.Admin.email);
                alert(responce.data.msg);
                navigate("/admin-dashboard");
                
            } catch (error) {
                console.log(error);
                alert(error.responce.data.msg);
                
            }
        }
        else{
            alert("dsddqw")
        }
    }
    return(

        <>
        <h1 align="center"> User Login </h1>
      <Form style={{ margin: "auto", width: "400px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select User</Form.Label>
          <Form.Select aria-label="Default select example" name="usertype" onChange={(e)=>{setUserType(e.target.value)}}>
            <option>select user type</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={handleSubmit}>
          Login
        </Button>
      </Form>
        
        </>
    )
 }

 export default Home;