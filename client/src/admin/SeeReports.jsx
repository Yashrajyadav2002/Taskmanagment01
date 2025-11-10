import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const SeeReports = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreportdisplay`;
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const taskReassign=async(tid)=>{
    try {
         let api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreassign?tid=${tid}`;
         const response = await axios.get(api);
         console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    alert(tid);
  }

  let sno=0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td> {sno} </td>
          <td> {key.task} </td>
          <td> {key.duration} </td>
          <td> {key.priority} </td>
          <td> {key.empid.name} </td>
          <td> {key.empid.email} </td>
          <td> {key.empid.designation} </td>
          <td> {key.completionday} </td>
          <td> {key.taskstatus} </td>
          <td> {key.submitstatus} </td>
          <td> 
             <Button variant="danger" onClick={()=>{taskReassign(key._id)}}>Re-Assign Task</Button>
          </td>
        </tr>
      </>
    )
  })

  return (
    <>
      <h1> See Employee Reports</h1>
      <hr />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Duration in Days</th>
            <th>Task Priority</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Completion Days</th>
            <th>Task Status</th>
          </tr>
        </thead>
        <tbody>
          {ans}
        </tbody>
      </Table>
    </>
  )
}

export default SeeReports;