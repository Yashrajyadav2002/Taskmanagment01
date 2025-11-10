import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminname");
    localStorage.removeItem("adminemail");
    alert("You have logged out successfully!");
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid min-vh-100 bg-light p-0">
        {/* Header */}
        <div
          className="text-center py-4 text-white shadow-sm"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 40%, rgba(0,212,255,1) 100%)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h1 className="fw-bold display-6 mb-0">Admin Dashboard</h1>
        </div>

        {/* Admin Info Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center bg-white border-bottom px-4 py-3 shadow-sm">
          <div>
            <span className="fw-semibold text-dark fs-6">
              👋 Welcome,&nbsp;
              <span className="text-primary">
                {localStorage.getItem("adminname") || "Admin"}
              </span>
            </span>
          </div>
          <div className="d-flex align-items-center mt-2 mt-md-0">
            <span className="fw-semibold text-dark fs-6">
              📧 {localStorage.getItem("adminemail")}
            </span>
            <button
              className="btn btn-danger btn-sm ms-3 px-3"
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="row g-0">
          {/* Sidebar */}
          <div
            className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column align-items-start shadow-lg"
            style={{
              minHeight: "85vh",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <h5 className="fw-bold text-uppercase mb-4 text-center w-100 border-bottom pb-2">
              Menu
            </h5>

            <Link
              to="create-user"
              className="btn btn-outline-light w-100 mb-3 fw-semibold text-start px-3 py-2"
              style={{
                borderRadius: "10px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              👤 Create User
            </Link>

            <Link
              to="assign-task"
              className="btn btn-outline-light w-100 mb-3 fw-semibold text-start px-3 py-2"
              style={{
                borderRadius: "10px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              🗂️ Assign Task
            </Link>

            <Link
              to="view-report"
              className="btn btn-outline-light w-100 fw-semibold text-start px-3 py-2"
              style={{
                borderRadius: "10px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              📊 View Report
            </Link>

            <div className="mt-auto w-100 border-top pt-3 text-center small text-secondary">
              <p className="mb-0">© 2025 Task Management</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9 col-lg-10 p-4 bg-white">
            <div
              className="rounded-4 shadow-sm p-4 bg-body"
              style={{
                minHeight: "80vh",
                border: "1px solid #dee2e6",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLogoutModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <p className="mb-0 fs-5">
                  Are you sure you want to logout from your admin account?
                </p>
              </div>
              <div className="modal-footer justify-content-center pb-4">
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger px-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashBoard;
