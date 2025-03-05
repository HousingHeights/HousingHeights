import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Testimonials from "./testimonials/Testimonials";
import "./AboutUs.css"; 

const Header = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Clicking logo navigates to Home */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/images/logo.png" alt="Housing Heights Logo" />
      </div>
      <FaBars className="hamburger" onClick={() => setIsSidebarOpen(true)} />
    </header>
  );
};

const Sidebar = ({ isSidebarOpen, closeSidebar, navData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return isSidebarOpen ? (
    <div className="sidebar slide-in-right">
      <FaTimes className="close-sidebar" onClick={closeSidebar} />
      <ul>
        {navData.map((item, index) => (
          <li key={index}>
            {item.path ? (
              <Link to={item.path} onClick={closeSidebar}>{item.name}</Link>
            ) : (
              <span className="inactive-link">{item.name}</span> // Non-clickable About Us
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const AboutUs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    closeSidebar();
    navigate("/#contact"); // Navigates to homepage and scrolls to the Contact section
  };

  const navData = [
    { name: "Home", path: "/" },
    { name: "About", path: "" }, // No path for About Us (non-clickable)
    { name: "Properties", path: "/Property" },
    { name: "Contact", path: "/#contact", onClick: handleContactClick },
  ];

  return (
    <div className="AboutUs">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} navData={navData} />
      
      <section className="about">
        <div className="content">
          <h2>Who We Are</h2>
          <p>
            We specialize in <strong>Leasing, Renting, Buying, and Selling</strong> residential and 
            commercial properties with a focus on excellence. Our team of experienced professionals 
            ensures a hassle-free experience, offering unparalleled service tailored to your needs.
          </p>
          <p>
            At <strong>Housing Heights</strong>, we believe in building lasting relationships by 
            delivering <strong>exceptional results</strong>. Whether you’re searching for a new home, an 
            investment opportunity, or expert property management, we’ve got you covered.
          </p>
        </div>
        <div className="image">
          <img className="picture" src="/images/house.jpg" alt="Luxury Property" />
        </div>
      </section>
      
      <Testimonials/>

      <section className="info">
        <div className="box">
          <h3>Local Expertise, Global Reach</h3>
          <p>We bring deep market knowledge with a worldwide perspective.</p>
        </div>
        <div className="box">
          <h3>Your Success, Our Commitment</h3>
          <p>We guide you through every step of your real estate journey.</p>
        </div>
        <div className="box">
          <h3>Our Mission</h3>
          <p>To redefine real estate with trust, integrity, and excellence.</p>
        </div>
        <div className="box">
          <h3>Our Vision</h3>
          <p>To be the most trusted and innovative real estate partner.</p>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What services do you provide?</h3>
          <p>We offer property leasing, sales, management, and investment advisory services.</p>
        </div>
        <div className="faq-item">
          <h3>How can I list my property with you?</h3>
          <p>Simply reach out to our team, and we’ll guide you through the process.</p>
        </div>
        <div className="faq-item">
          <h3>How do I check property availability?</h3>
          <p>Our website updates listings in real time. You can browse properties or contact us.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
