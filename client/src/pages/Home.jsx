import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [usertype, setUserType] = useState("");
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // ✅ VANTA HALO Background Setup
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0x6610f2,
          backgroundColor: 0x0a0014,
          amplitudeFactor: 1.2,
          size: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // ✅ Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usertype === "admin") {
      try {
        let api = `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
        const response = await axios.post(api, { email, password });

        localStorage.setItem("adminemail", response.data.Admin.email);
        toast.success("✅ Admin Login Successful!");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Invalid admin credentials");
      }
    } else {
      try {
        let api = `${import.meta.env.VITE_BACKEND_URL}/employee/login`;
        const response = await axios.post(api, { email, password });

        localStorage.setItem("empname", response.data.employee.name);
        localStorage.setItem("empemail", response.data.employee.email);
        localStorage.setItem("empdesignation", response.data.employee.designation);
        localStorage.setItem("empid", response.data.employee._id);

        toast.success("✅ Employee Login Successful!");
        setTimeout(() => navigate("/emp-dashboard"), 1500);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Invalid employee credentials");
      }
    }
  };

  return (
    <>
      {/* ✅ VANTA HALO Background */}
      <div
        ref={vantaRef}
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ✅ Glassmorphism Login Card */}
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{
            width: "420px",
            backdropFilter: "blur(15px)",
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            color: "white",
            zIndex: 1,
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold text-light">Welcome Back 👋</h2>
            <p className="text-light-50 mb-0" style={{ fontSize: "0.9rem" }}>
              Sign in to your dashboard
            </p>
            <hr className="mt-3 border-light" />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold text-light">
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
              <Form.Label className="fw-semibold text-light">
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
              <Form.Label className="fw-semibold text-light">
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
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
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
        </div>

        {/* ✅ Toast Notifications - fixed below navbar */}
<ToastContainer
  position="top-center"
  style={{ marginTop: "80px" }} // 👈 pushes it below the navbar
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>

      </div>
    </>
  );
};

export default Home;
