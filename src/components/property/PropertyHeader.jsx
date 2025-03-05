import React, { useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { navData } from "../data/Data";
import "./propertyHeader.css";

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
          <div className="user-profile" onClick={() => setUserDropdown(!userDropdown)}>
            <FaUser />
            {userDropdown && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={closeSidebar}>Profile</Link>
                <Link to="/properties-form" onClick={closeSidebar}>Properties Form</Link>
                <Link to="/settings" onClick={closeSidebar}>Settings</Link>
                <Link to="/logout" onClick={closeSidebar}>Logout</Link>
              </div>
            )}
          </div>

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
