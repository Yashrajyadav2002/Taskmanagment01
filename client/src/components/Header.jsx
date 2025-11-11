import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminemail");
    const adminName = localStorage.getItem("adminname");
    const empName = localStorage.getItem("empname");

    if (adminEmail && adminName) {
      setUser({ type: "Admin", name: adminName });
    } else if (empName) {
      setUser({ type: "Employee", name: empName });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,9,121,0.9), rgba(0,212,255,0.9))",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <div className="container">
          {/* Brand */}
          <a
            className="navbar-brand fw-bold fs-4 text-white"
            href="/"
            style={{ letterSpacing: "1px" }}
          >
            <span className="text-white">Task</span>
            <span style={{ color: "#00eaff" }}>Management</span>
          </a>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {["Home", "Tasks", "Team", "Contact"].map((item) => (
                <li className="nav-item mx-2" key={item}>
                  <a
                    className="nav-link text-white fw-semibold position-relative"
                    href={`/${item.toLowerCase()}`}
                    style={{
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#00eaff")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                  >
                    {item}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        backgroundColor: "#00eaff",
                        transition: "width 0.3s",
                      }}
                      className="hover-line"
                    ></span>
                  </a>
                </li>
              ))}

              {/* User info */}
              {user ? (
                <>
                  <li className="nav-item ms-3 text-white fw-semibold d-none d-md-block">
                    Hi, {user.type}{" "}
                    <span style={{ color: "#00eaff" }}>{user.name}</span>
                  </li>
                  <li className="nav-item ms-3">
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm text-white fw-semibold px-3 py-2"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(0,234,255,0.3)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.1)")
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item ms-3">
                  <a
                    href="/"
                    className="btn btn-light btn-sm fw-semibold shadow-sm px-3 py-2"
                    style={{
                      background: "#00eaff",
                      color: "#001f3f",
                      borderRadius: "25px",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#00b8d4")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#00eaff")
                    }
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
