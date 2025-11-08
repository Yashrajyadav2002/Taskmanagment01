import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [usertype, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usertype === "admin") {
      try {
        let api = `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
        const response = await axios.post(api, { email, password });
        console.log(response);

        localStorage.setItem("adminemail", response.data.Admin.email);
        alert(response.data.msg);
        navigate("/admin-dashboard");
      } catch (error) {
        console.log(error);
        // ✅ Fix: Corrected "responce" → "response"
        alert(error.response?.data?.msg || "Invalid credentials or server error");
      }
    } else {
      try {
        let api = `${import.meta.env.VITE_BACKEND_URL}/employee/login`;
        const response = await axios.post(api, { email, password });

        console.log(response.data.employee.name);

        localStorage.setItem("empname", response.data.employee.name);
        localStorage.setItem("empemail", response.data.employee.email);
        localStorage.setItem("empdesignation", response.data.employee.designation);
        localStorage.setItem("empid", response.data.employee._id);

        navigate("/emp-dashboard");
      } catch (error) {
        console.log(error);
        // ✅ Fix: Added error alert for employee login too
        alert(error.response?.data?.msg || "Invalid credentials or server error");
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(186, 32, 210, 1) 0%, rgba(102,16,242,1) 100%)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{
            width: "420px",
            backgroundColor: "#ffffff",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <div className="text-center mb-4">
            <h2
              className="fw-bold"
              style={{
                background: "linear-gradient(90deg, #007bff, #6610f2)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Welcome Back 👋
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Sign in to your admin dashboard
            </p>
            <hr className="mt-3" />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold text-secondary">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="py-2 shadow-sm"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-semibold text-secondary">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter password"
                className="py-2 shadow-sm"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formUserType">
              <Form.Label className="fw-semibold text-secondary">
                Select User Type
              </Form.Label>
              <Form.Select
                name="usertype"
                className="py-2 shadow-sm"
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select user type</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                className="fw-semibold border-0"
                style={{
                  background: "linear-gradient(90deg, #d900ff, #6610f2)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Login
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              Forgot your password?{" "}
              <a href="#" className="text-decoration-none text-primary">
                Reset here
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default Home;
