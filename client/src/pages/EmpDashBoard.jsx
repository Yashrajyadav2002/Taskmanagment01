import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
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
    <div
      className={`${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      } transition-all`}
      style={{
        minHeight: "100vh",
        transition: "all 0.4s ease-in-out",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
        style={{
          background: darkMode
            ? "linear-gradient(90deg, #1f1f1f, #343a40)"
            : "linear-gradient(90deg, #6f42c1, #5a1fcf)",
          color: "white",
          transition: "background 0.4s ease-in-out",
        }}
      >
        <div className="d-flex align-items-center gap-3">
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
            <h6 className="m-0 fw-semibold text-capitalize">{empName}</h6>
            <small className="opacity-75">{empDesignation}</small>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "40px",
              height: "40px",
              transition: "all 0.3s",
            }}
          >
            {darkMode ? (
              <FaSun className="text-warning" />
            ) : (
              <FaMoon className="text-dark" />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn btn-sm fw-semibold d-flex align-items-center gap-2"
            style={{
              borderRadius: "20px",
              background: "white",
              border: "none",
              color: "#dc3545",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
            transition: "all 0.3s ease-in-out",
          }}
        >
          <h5
            className={`fw-semibold mb-4 ${
              darkMode ? "text-light" : "text-secondary"
            }`}
          >
            Navigation
          </h5>

          <nav className="nav flex-column">
            <Link
              to="mytask"
              onClick={() => setMenuOpen(false)}
              className={`nav-link mb-2 d-flex align-items-center fw-medium ${
                location.pathname.includes("mytask") ? "active-link" : ""
              } ${darkMode ? "text-light" : "text-dark"}`}
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                transition: "all 0.3s ease",
              }}
            >
              <FaTasks className="me-2 text-primary" /> My Tasks
            </Link>

            <Link
              to="submitedtask"
              onClick={() => setMenuOpen(false)}
              className={`nav-link mb-2 d-flex align-items-center fw-medium ${
                location.pathname.includes("submitedtask") ? "active-link" : ""
              } ${darkMode ? "text-light" : "text-dark"}`}
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                transition: "all 0.3s ease",
              }}
            >
              <FaClipboardList className="me-2 text-success" /> Submitted Tasks
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: darkMode ? "#181a1b" : "#f5f6fa",
            color: darkMode ? "#f8f9fa" : "#212529",
            transition: "all 0.4s ease-in-out",
          }}
        >
          <div
            className="card shadow border-0 rounded-4"
            style={{
              minHeight: "80vh",
              background: darkMode
                ? "rgba(33,37,41,0.85)"
                : "rgba(255,255,255,0.95)",
              color: darkMode ? "#f8f9fa" : "#212529",
              backdropFilter: "blur(10px)",
              transition: "all 0.4s ease-in-out",
            }}
          >
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Active link effect */}
      <style>
        {`
          .active-link {
            background: linear-gradient(90deg, #6f42c1, #5a1fcf);
            color: white !important;
            box-shadow: 0 3px 8px rgba(0,0,0,0.2);
          }
          .nav-link:hover {
            background: rgba(111,66,193,0.1);
            transform: translateX(4px);
          }
        `}
      </style>
    </div>
  );
};

export default EmpDashBoard;
