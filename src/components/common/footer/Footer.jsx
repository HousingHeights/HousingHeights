import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer text-white">
      <div className="container p-4">
        {/* Footer Logo & Description */}
        <div className="text-center mb-4 footerTitle">
          <h5 className="footer-title">Housing Heights</h5>
          <p>Find your dream home with us.</p>
        </div>

        {/* Social Media Section */}
        <section className="mb-4 d-flex justify-content-center">
          {[
            { href: "#!", icon: "fa-facebook-f" },
            { href: "#!", icon: "fa-twitter" },
            { href: "#!", icon: "fa-google" },
            { href: "#!", icon: "fa-instagram" },
            { href: "#!", icon: "fa-linkedin-in" },
            { href: "https://github.com/HousingHeights/HousingHeights", icon: "fa-github" },
          ].map((item, index) => (
            <a
              key={index}
              className="btn social-icon mx-2"
              href={item.href}
              role="button"
            >
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </section>

        {/* Navigation Links */}
        <div className="footer-links d-flex justify-content-center gap-3">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3 copyright">
        © {new Date().getFullYear()} Housing Heights | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
