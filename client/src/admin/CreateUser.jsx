import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserPlus, FaEnvelope, FaUserTie } from "react-icons/fa";

const CreateUser = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.empname || !input.empemail || !input.designation) {
      toast.warning("⚠️ Please fill all required fields!", {
        position: "bottom-center", // 👈 fixed position
        autoClose: 2500,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    try {
      let api = `${import.meta.env.VITE_BACKEND_URL}/admin/usercreate`;
      const response = await axios.post(api, input);

      toast.success("✅ User Created Successfully!", {
        position: "bottom-center",
        autoClose: 2500,
        theme: "colored",
        transition: Slide,
      });

      setInput({});
    } catch (error) {
      toast.error("❌ Failed to Create User", {
        position: "bottom-center",
        autoClose: 2500,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  const handleBtnEnter = (ev) => {
    const el = ev.currentTarget;
    el.style.transform = "scale(1.03)";
    el.style.background = "linear-gradient(90deg, #4400d6 0%, #003bb3 100%)";
  };
  const handleBtnLeave = (ev) => {
    const el = ev.currentTarget;
    el.style.transform = "scale(1)";
    el.style.background = "linear-gradient(90deg, #9a3dab 0%, #772999 100%)";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #ece9ff 0%, #d2cfff 100%)",
        padding: "20px",
      }}
    >
      <ToastContainer />

      <div
        className="card border-0 shadow-lg rounded-5 text-dark"
        style={{
          width: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(14px)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          className="text-center text-white py-4 rounded-top-5"
          style={{
            background:
              "linear-gradient(90deg, #3a0ca3 0%, #7209b7 50%, #4361ee 100%)",
          }}
        >
          <FaUserPlus size={35} className="mb-2" />
          <h3 className="fw-bold mb-0">Create New User</h3>
          <p className="text-light small mb-0">
            Add a new employee to your organization
          </p>
        </div>

        {/* Form */}
        <div className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                <FaUserTie className="me-2 text-primary" />
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                name="empname"
                value={input.empname || ""}
                placeholder="Enter employee full name"
                className="py-2 shadow-sm border-0 rounded-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 0.25rem rgba(13,110,253,.25)")
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                onChange={handleInput}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                <FaEnvelope className="me-2 text-primary" />
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="empemail"
                value={input.empemail || ""}
                placeholder="Enter company email"
                className="py-2 shadow-sm border-0 rounded-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 0.25rem rgba(13,110,253,.25)")
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                onChange={handleInput}
              />
            </Form.Group>

            {/* Designation */}
            <Form.Group className="mb-5">
              <Form.Label className="fw-semibold text-secondary">
                <FaUserTie className="me-2 text-primary" />
                Designation
              </Form.Label>
              <Form.Select
                name="designation"
                value={input.designation || ""}
                className="py-2 shadow-sm border-0 rounded-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 0 0.25rem rgba(13,110,253,.25)")
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                onChange={handleInput}
              >
                <option value="">Select designation</option>
                <option value="Programmer">Programmer</option>
                <option value="Tester">Tester</option>
                <option value="Designer">Designer</option>
                <option value="DB Designer">Database Designer</option>
                <option value="Analyst">Analyst</option>
              </Form.Select>
            </Form.Group>

            {/* Submit Button */}
            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                className="fw-semibold rounded-4 border-0"
                style={{
                  background:
                    "linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)",
                  boxShadow: "0px 4px 14px rgba(67, 97, 238, 0.4)",
                  transition: "transform 0.2s ease, background 0.3s ease",
                }}
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
              >
                + Add User
              </Button>
            </div>
          </Form>
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <small className="text-muted">
            Need help?{" "}
            <a
              href="#"
              className="text-decoration-none text-primary fw-semibold"
            >
              Contact IT Support
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
