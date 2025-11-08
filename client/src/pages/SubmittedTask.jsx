import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const SubmitedTask=()=>{
    const [mydata, setMydata] = useState([]);
   

   const laodData=async()=>{       
    try {
   let api=`${import.meta.env.VITE_BACKEND_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
           const response= await axios.get(api);
           console.log(response.data); 
           setMydata(response.data);
    } catch (error) {
         console.log(error)
    }
   }

   useEffect(()=>{
    laodData();
   }, []);

 let sno=0;
   const ans= mydata.map((key)=>{
    sno++;
    if(key.submitstatus){
    return(
        <>
          <tr>
            <td> {sno} </td>
            <td>{key.task}</td>
             <td>{key.duration}</td>
              <td>{key.priority}</td>
          </tr>
        </>
    )
}
   })

    return(
        <>
          <h1> My Task Detail</h1>
          <hr/>

           <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Task Detail</th>
          <th>Duration in Days</th>
          <th>Priority Level</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>
      
        </>
    )
}

export default SubmitedTask;