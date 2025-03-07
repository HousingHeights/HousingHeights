import React, { useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navData } from "../data/Data";
import "./propertyHeader.css";

const UserProfile = ({ setUserDropdown, userDropdown, closeSidebar }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token
    localStorage.removeItem("user");  // If user data is stored, remove it
    setUserDropdown(false); // Close dropdown
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="user-profile" onClick={() => setUserDropdown(!userDropdown)}>
      <FaUser />
      {userDropdown && (
        <div className="user-dropdown">
           <button onClick={() => { navigate("/profile"); closeSidebar(); }}>Profile</button>
          <button onClick={() => { navigate("/properties-form"); closeSidebar(); }}>Properties Form</button>
          <button onClick={() => { navigate("/setting"); closeSidebar(); }}>Settings</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const PropertyHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [propertyType, setPropertyType] = useState("Buy");

  const location = useLocation(); // Get current page location

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className="header">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Company Logo" className="small-logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <select
            className="dropdown"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <optgroup label="Residential">
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </optgroup>
          </select>

          <input
            type="text"
            className="large-input"
            placeholder="Search by location, price, property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="search-btn">
            <FaSearch className="search-icon" />
          </button>
        </div>

        {/* Right-Side Icons */}
        <div className="right-section">
          {/* Wishlist Link Added Here */}
          <Link to="/wishlist" className="wishlist-link">Wishlist</Link>

          <UserProfile setUserDropdown={setUserDropdown} userDropdown={userDropdown} closeSidebar={closeSidebar} />

          <FaBars className="hamburger" onClick={() => setIsSidebarOpen(true)} />
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar slide-in-right">
          <FaTimes className="close-sidebar" onClick={closeSidebar} />
          <ul>
            {navData.map((item, index) => (
              <li key={index}>
                {location.pathname === item.path ? (
                  // If the user is on "Properties" page, don't navigate
                  <span className="inactive-link">{item.name}</span>
                ) : (
                  <Link to={item.path} onClick={closeSidebar}>{item.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PropertyHeader;
