import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const MyTask = () => {
  const [mydata, setMydata] = useState([]);
  const [show, setShow] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (tid) => {
    setTaskId(tid);
    setShow(true);
  };

  const loadData = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/employee/showtask/?id=${localStorage.getItem("empid")}`;
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const taskReportSubmit = async (e) => {
    e.preventDefault();
    if (!taskStatus || !taskDuration) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/employee/taskreport`;
      await axios.put(api, { taskstatus: taskStatus, taskduration: taskDuration, taskId });
      alert("Task report submitted successfully!");
      setShow(false);
      setTaskStatus("");
      setTaskDuration("");
      loadData();
    } catch (error) {
      console.log(error);
      alert("Failed to submit task report!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">My Task Details</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Task Detail</th>
            <th>Duration (Days)</th>
            <th>Priority Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mydata.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No tasks assigned yet.
              </td>
            </tr>
          ) : (
            mydata.map((task, index) =>
              !task.submitstatus && (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>{task.duration}</td>
                  <td>{task.preority}</td>
                  <td>
                    <Button variant="success" onClick={() => handleShow(task._id)}>
                      Send Report
                    </Button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Task Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={taskReportSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Task Status</Form.Label>
              <Form.Select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                required
              >
                <option value="">Select task status</option>
                <option value="Fully Completed">Fully Completed</option>
                <option value="Partial Completed">Partial Completed</option>
                <option value="Not Completed">Not Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Completion Days</Form.Label>
              <Form.Control
                type="number"
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
                required
                placeholder="Enter days taken"
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit Report
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyTask;
