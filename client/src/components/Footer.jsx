import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 pb-3 mt-auto"
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #001f3f 100%)",
        boxShadow: "0 -2px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="container text-center text-md-start">
        <div className="row align-items-start">
          {/* Brand Info */}
          <div className="col-md-5 mb-4">
            <h4 className="fw-bold mb-3">TaskManagement</h4>
            <p className="small text-light">
              Streamline your workflow, assign tasks, and track progress —
              empowering productivity through intelligent management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold text-uppercase mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <a
                  href="/"
                  className="text-white text-decoration-none d-block mb-2 footer-link"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white text-decoration-none d-block mb-2 footer-link"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white text-decoration-none d-block mb-2 footer-link"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white text-decoration-none d-block mb-2 footer-link"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h6 className="fw-semibold text-uppercase mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-4">
              <a href="https://facebook.com" className="text-white social-icon">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://twitter.com" className="text-white social-icon">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://instagram.com" className="text-white social-icon">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://linkedin.com" className="text-white social-icon">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-light opacity-50" />

      <div className="text-center small text-light">
        © 2025 <strong>www.taskmanagement.com</strong> — All Rights Reserved.
      </div>

      <style>
        {`
          .footer-link:hover {
            color: #ffc107;
            transform: translateX(5px);
            transition: all 0.3s ease-in-out;
          }
          .social-icon:hover {
            color: #ffc107;
            transform: scale(1.2);
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
