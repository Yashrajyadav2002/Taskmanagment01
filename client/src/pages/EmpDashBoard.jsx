import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTasks,
  FaClipboardList,
  FaUserTie,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";

const EmpDashBoard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const empName = localStorage.getItem("empname") || "Employee";
  const empDesignation = localStorage.getItem("empdesignation") || "Staff";

  const handleLogout = () => {
    localStorage.removeItem("empname");
    localStorage.removeItem("empemail");
    localStorage.removeItem("empdesignation");
    localStorage.removeItem("empid");
    navigate("/");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-white text-dark"}>
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
        style={{
          background: darkMode
            ? "linear-gradient(90deg, #212529, #343a40)"
            : "linear-gradient(90deg, #6f42c1, #6610f2)",
          color: "white",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            className="btn btn-light d-lg-none"
            style={{
              border: "none",
              background: "transparent",
              color: "white",
              fontSize: "1.5rem",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h2 className="fw-bold m-0 d-flex align-items-center">
            <FaUserTie className="me-2" /> Employee Dashboard
          </h2>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="text-end">
            <h6 className="m-0 fw-semibold">{empName}</h6>
            <small className="opacity-75">{empDesignation}</small>
          </div>

          {/* Dark Mode Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            {darkMode ? (
              <FaSun className="text-warning" />
            ) : (
              <FaMoon className="text-dark" />
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-light text-danger fw-semibold d-flex align-items-center gap-2"
            style={{
              borderRadius: "20px",
              background: "white",
              border: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="d-flex" style={{ minHeight: "90vh" }}>
        {/* Sidebar */}
        <div
          className={`p-4 shadow-sm ${
            darkMode ? "bg-secondary" : "bg-light"
          } border-end ${menuOpen ? "d-block" : "d-none d-lg-block"}`}
          style={{
            width: "250px",
            position: menuOpen ? "absolute" : "relative",
            zIndex: "10",
            height: "100%",
          }}
        >
          <h5
            className={`fw-semibold mb-4 ${
              darkMode ? "text-light" : "text-secondary"
            }`}
          >
            Menu
          </h5>
          <nav className="nav flex-column">
            <Link
              to="mytask"
              onClick={() => setMenuOpen(false)}
              className={`nav-link mb-2 d-flex align-items-center fw-medium ${
                darkMode ? "text-light" : "text-dark"
              }`}
              style={{
                borderRadius: "8px",
                transition: "background 0.3s",
              }}
            >
              <FaTasks className="me-2 text-primary" /> My Tasks
            </Link>

            <Link
              to="submitedtask"
              onClick={() => setMenuOpen(false)}
              className={`nav-link mb-2 d-flex align-items-center fw-medium ${
                darkMode ? "text-light" : "text-dark"
              }`}
              style={{
                borderRadius: "8px",
                transition: "background 0.3s",
              }}
            >
              <FaClipboardList className="me-2 text-success" /> Submitted Tasks
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: darkMode ? "#212529" : "#f5f6fa",
            color: darkMode ? "#f8f9fa" : "#212529",
          }}
        >
          <div
            className="card shadow-sm border-0 rounded-3"
            style={{
              minHeight: "80vh",
              background: darkMode ? "#2b3035" : "#fff",
              color: darkMode ? "#f8f9fa" : "#212529",
            }}
          >
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashBoard;
