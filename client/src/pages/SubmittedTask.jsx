import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const SubmitedTask = () => {
  const [mydata, setMydata] = useState([]);

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

  // Priority Badge
  const getPriorityBadge = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return <Badge bg="danger">High</Badge>;
      case "medium":
        return <Badge bg="warning" text="dark">Medium</Badge>;
      case "low":
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  // Task Status Badge
  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "fully completed":
        return <Badge bg="success">Fully Completed</Badge>;
      case "partial completed":
        return <Badge bg="warning" text="dark">Partial Completed</Badge>;
      case "not completed":
        return <Badge bg="danger">Not Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  let sno = 0;
  const ans = mydata.map((task) => {
    if (task.submitstatus) {
      sno++;
      return (
        <tr key={task._id} className="align-middle">
          <td>{sno}</td>
          <td>{task.task}</td>
          <td>{task.duration}</td>
          <td>{getPriorityBadge(task.preority || task.priority)}</td>
          <td>{getStatusBadge(task.taskstatus)}</td>
        </tr>
      );
    }
    return null;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4 text-center">My Submitted Tasks</h2>

      <div className="card shadow-lg border-0 rounded-4 p-3">
        <Table
          striped
          hover
          responsive
          className="mb-0 align-middle text-center"
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Task Detail</th>
              <th>Duration (Days)</th>
              <th>Priority Level</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {ans.length > 0 ? (
              ans
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No submitted tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SubmitedTask;
