import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <h5 className="fw-bold">TaskManagement</h5>
            <p className="small">
              Simplify your daily workflow, track progress, and manage your tasks efficiently — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-lg-2 mb-3">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
              <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-3 col-lg-3 mb-3 text-center text-md-start">
            <h6 className="fw-semibold">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
              <a href="https://facebook.com" className="text-white">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://twitter.com" className="text-white">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://linkedin.com" className="text-white">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-secondary" />

      <div className="text-center pb-2 small">
        © 2025 <strong>www.taskmanagement.com</strong> — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
