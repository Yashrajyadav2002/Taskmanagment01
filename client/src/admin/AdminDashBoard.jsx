import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashBoard = () => {
  return (
    <>
      <div className="container-fluid min-vh-100 bg-light">
        {/* Header */}
        <div className="text-center py-4 bg-primary text-white shadow-sm">
          <h1 className="fw-bold">Admin Dashboard</h1>
        </div>

        {/* Admin Info Bar */}
        <div className="d-flex justify-content-between align-items-center bg-white border-bottom px-4 py-3 shadow-sm">
          <div>
            <span className="fw-semibold text-dark">
              Welcome: {localStorage.getItem("adminname")}
            </span>
          </div>
          <div>
            <span className="fw-semibold text-dark">
              Email: {localStorage.getItem("adminemail")}
            </span>
            <button className="btn btn-outline-danger btn-sm ms-3">Logout</button>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="row m-0 p-4">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 bg-dark text-white rounded-3 p-4 shadow-sm">
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="create-user"
                  className="btn btn-outline-light w-100 fw-semibold"
                >
                  Create User
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="assign-task"
                  className="btn btn-outline-light w-100 fw-semibold"
                >
                  Assign Task
                </Link>
              </li>
              <li>
                <Link
                  to="view-report"
                  className="btn btn-outline-light w-100 fw-semibold"
                >
                  View Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9 col-lg-10 bg-white rounded-3 shadow-sm p-4 mt-3 mt-md-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
