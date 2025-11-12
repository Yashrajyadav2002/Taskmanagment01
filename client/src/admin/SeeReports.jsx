import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

const SeeReports = () => {
  const [mydata, setMydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [taskStatusFilter, setTaskStatusFilter] = useState("");
  const [submitStatusFilter, setSubmitStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreportdisplay`;
      const response = await axios.get(api);
      setMydata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let temp = mydata;

    if (taskStatusFilter)
      temp = temp.filter(
        (item) =>
          item.taskstatus?.toLowerCase() === taskStatusFilter.toLowerCase()
      );

    if (submitStatusFilter)
      temp = temp.filter(
        (item) =>
          item.submitstatus?.toLowerCase() === submitStatusFilter.toLowerCase()
      );

    if (searchQuery.trim() !== "") {
      temp = temp.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.task?.toLowerCase().includes(query) ||
          item.empid?.name?.toLowerCase().includes(query) ||
          item.empid?.designation?.toLowerCase().includes(query)
        );
      });
    }

    setFilteredData(temp);
  }, [taskStatusFilter, submitStatusFilter, searchQuery, mydata]);

  const resetFilter = () => {
    setTaskStatusFilter("");
    setSubmitStatusFilter("");
    setSearchQuery("");
    setFilteredData(mydata);
  };

  const taskReassign = async (tid) => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreassign?tid=${tid}`;
      const response = await axios.get(api);
      alert("Task reassigned successfully!");
      loadData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Error reassigning task!");
    }
  };

  const getTaskStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <Badge bg="success">Completed</Badge>;
      case "in progress":
        return <Badge bg="warning" text="dark">In Progress</Badge>;
      case "pending":
        return <Badge bg="secondary">Pending</Badge>;
      default:
        return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  const getSubmitStatusBadge = (status) => {
    switch (status?.toLowerCase) {
      case "submitted":
        return <Badge bg="info">Submitted</Badge>;
      case "not submitted":
        return <Badge bg="danger">Not Submitted</Badge>;
      default:
        return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  let sno = 0;

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 50%, #f1f8e9 100%)",
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold text-primary mb-4">
          Employee Task Reports
        </h2>

        {/* 🔹 Filter & Search Section */}
        <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
          <InputGroup style={{ width: "250px" }}>
            <Form.Control
              type="text"
              placeholder="🔍 Search by name, task, or designation"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Form.Select
            style={{ width: "200px" }}
            value={taskStatusFilter}
            onChange={(e) => setTaskStatusFilter(e.target.value)}
          >
            <option value="">Filter by Task Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </Form.Select>

          <Form.Select
            style={{ width: "200px" }}
            value={submitStatusFilter}
            onChange={(e) => setSubmitStatusFilter(e.target.value)}
          >
            <option value="">Filter by Submit Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Not Submitted">Not Submitted</option>
          </Form.Select>

          <Button variant="outline-primary" onClick={resetFilter}>
            Reset Filter
          </Button>
        </div>

        {/* 🔹 Table Container with Glass Effect */}
        <div
          className="p-3 rounded-4 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <Table striped bordered hover responsive className="align-middle">
            <thead className="table-primary text-center">
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Duration (Days)</th>
                <th>Priority</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Completion Days</th>
                <th>Task Status</th>
                <th>Submit Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredData.map((key) => {
                sno++;
                return (
                  <tr key={key._id} className="table-row-hover">
                    <td>{sno}</td>
                    <td>{key.task}</td>
                    <td>{key.duration}</td>
                    <td>{key.priority}</td>
                    <td>{key.empid.name}</td>
                    <td>{key.empid.email}</td>
                    <td>{key.empid.designation}</td>
                    <td>{key.completionday}</td>
                    <td>{getTaskStatusBadge(key.taskstatus)}</td>
                    <td>{getSubmitStatusBadge(key.submitstatus)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => taskReassign(key._id)}
                        className="shadow-sm"
                      >
                        🔁 Re-Assign
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {filteredData.length === 0 && (
            <p className="text-center text-muted mt-3">
              No reports found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeReports;
