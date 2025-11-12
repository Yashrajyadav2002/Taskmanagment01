import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignTask = () => {
  const [mydata, setmydata] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({});
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isReassign, setIsReassign] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInput({});
    setIsReassign(false);
  };

  const LoadData = async () => {
    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/empdisplay`;
      const response = await axios.get(api);
      setmydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleShowAssign = (emp) => {
    setSelectedEmp(emp);
    setInput({});
    setIsReassign(false);
    setShow(true);
  };

  const handleShowReassign = (emp) => {
    setSelectedEmp(emp);
    setInput({
      task: emp.task || "",
      duration: emp.duration || "",
      priority: emp.priority || "",
    });
    setIsReassign(true);
    setShow(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let api = "";
    let msg = "";

    if (isReassign) {
      api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskupdate/${selectedEmp._id}`;
      await axios.put(api, input);
      msg = "✅ Task Reassigned Successfully!";
    } else {
      api = `${import.meta.env.VITE_BACKEND_URL}/admin/tasksave`;
      await axios.post(api, { id: selectedEmp._id, ...input });
      msg = "✅ Task Assigned Successfully!";
    }

    // 🔹 Show popup message
    toast.success(msg, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    handleClose();
    //LoadData();
  } catch (error) {
    console.log(error);
    toast.error("❌ Operation Failed!", {
      position: "top-right",
      autoClose: 2500,
    });
  }
};


  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center p-4"
      style={{
        background: "linear-gradient(135deg, #edf2ff 0%, #dee2ff 100%)",
      }}
    >
      <ToastContainer />
      <div className="text-center mb-4 mt-3">
        <h2 className="fw-bold text-dark">👩‍💼 Manage Employee Tasks</h2>
        <p className="text-secondary">
          Assign or Reassign tasks to your employees with one click
        </p>
      </div>

      <div
        className="shadow-lg rounded-5 bg-white p-4 w-100"
        style={{
          maxWidth: "1000px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Table responsive bordered hover className="text-center align-middle">
          <thead
            style={{
              background: "linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)",
              color: "white",
            }}
          >
            <tr>
              <th>Employee</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Current Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.email}</td>
                <td>{emp.task ? emp.task : "— No Task —"}</td>
                <td>
                  {emp.task ? (
                    <Button
                      variant="warning"
                      className="rounded-5 fw-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                      }}
                      onClick={() => handleShowReassign(emp)}
                    >
                      Re-Assign
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="rounded-5 fw-semibold"
                      style={{
                        background:
                          "linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)",
                      }}
                      onClick={() => handleShowAssign(emp)}
                    >
                      Assign
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Assign / Reassign Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            background:
              isReassign
                ? "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
                : "linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)",
            color: "white",
          }}
        >
          <Modal.Title>
            {isReassign ? "🔁 Re-Assign Task" : "📝 Assign New Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="task"
                value={input.task || ""}
                onChange={handleInput}
                placeholder="Enter task details"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (Days)</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={input.duration || ""}
                onChange={handleInput}
                placeholder="e.g. 3"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={input.priority || ""}
                onChange={handleInput}
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                className="rounded-4 border-0 fw-semibold"
                style={{
                  background: isReassign
                    ? "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
                    : "linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)",
                }}
              >
                {isReassign ? "Update Task" : "Assign Task"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignTask;
