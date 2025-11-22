import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FaUserPlus, FaTasks, FaChartBar, FaSignOutAlt, FaUserCircle } from "react-icons/fa";


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
      <div
        className="container-fluid min-vh-100 p-0 d-flex flex-column"
        style={{
          background: "linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ✅ Header */}
        <header
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
          style={{
            background: "linear-gradient(90deg, #3a0ca3 0%, #7209b7 50%, #4361ee 100%)",
            color: "white",
          }}
        >
          <h3 className="fw-bold m-0">Admin Dashboard</h3>

          <div className="d-flex align-items-center gap-3">
            <FaUserCircle size={28} />
            <div>
              <div className="fw-semibold">
                {localStorage.getItem("adminname") || "Admin"}
              </div>
              <small className="text-light">
                {localStorage.getItem("adminemail")}
              </small>
            </div>
            <button
              className="btn btn-outline-light btn-sm ms-2"
              style={{ borderRadius: "20px" }}
              onClick={() => setShowLogoutModal(true)}
            >
              <FaSignOutAlt className="me-1" />
              Logout
            </button>
          </div>
        </header>

         
        {/* ✅ Dashboard Layout */}
        <div className="row flex-grow-1 g-0">
          {/* Sidebar */}
          <aside
            className="col-md-3 col-lg-2 p-4 d-flex flex-column align-items-start text-white shadow-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(58,12,163,1) 0%, rgba(72,12,168,1) 50%, rgba(131,56,236,1) 100%)",
              borderTopRightRadius: "18px",
              borderBottomRightRadius: "18px",
              minHeight: "calc(100vh - 80px)",
              position: "sticky",
              top: 0,
            }}
          >
            <h5 className="fw-bold text-uppercase mb-4 w-100 border-bottom pb-2 text-center">
              Menu
            </h5>

            <Link
              to="create-user"
              className="btn text-white w-100 mb-3 fw-semibold text-start px-3 py-2 d-flex align-items-center"
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
            >
              <FaUserPlus className="me-2" /> Create User
            </Link>

            <Link
              to="assign-task"
              className="btn text-white w-100 mb-3 fw-semibold text-start px-3 py-2 d-flex align-items-center"
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
            >
              <FaTasks className="me-2" /> Assign Task
            </Link>

            <Link
              to="see-reports"
              className="btn text-white w-100 fw-semibold text-start px-3 py-2 d-flex align-items-center"
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
            >
              <FaChartBar className="me-2" /> View Reports
            </Link>

          
            <div className="mt-auto w-100 border-top pt-3 text-center small text-light-50">
              <p className="mb-0 opacity-75">© 2025 Task Management</p>
            </div>
          </aside>

          {/* ✅ Main Content */}
          <main
            className="col-md-9 col-lg-10 p-4"
            style={{
              background: "#f8f9fa",
              minHeight: "calc(100vh - 80px)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div
              className="bg-white rounded-4 shadow-sm p-4 animate__animated animate__fadeIn"
              style={{
                minHeight: "78vh",
                border: "1px solid #e0e0e0",
              }}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* ✅ Logout Modal */}
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div
                className="modal-header text-white rounded-top-4"
                style={{
                  background:
                    "linear-gradient(90deg, #3a0ca3 0%, #7209b7 50%, #4361ee 100%)",
                }}
              >
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLogoutModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <p className="mb-0 fs-5 text-secondary">
                  Are you sure you want to log out?
                </p>
              </div>
              <div className="modal-footer justify-content-center pb-4">
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger px-4" onClick={handleLogout}>
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
