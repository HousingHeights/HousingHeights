import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";

import "./header.css"; 

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [liked, setLiked] = useState(false);
  const [navList, setNavList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name") || "Guest"; // Default name
    const role = localStorage.getItem("role") || "User"; // Default role

    if (token) {
      setUser({ name, role });
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };    

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  const nav = [
    { path: "/", text: "Home" },
    { path: "/Property", text: "Properties" },
    { path: "/AboutUs", text: "About Us" },
    { path: "#contact", text: "Contact" }, 
  ];

  return (
    <header>
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "scrolled" : ""}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="./images/logo.png" alt="Housing Heights" className="logo-img" onClick={() => navigate("/")}/>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ borderColor: "white" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav mx-auto">
              {nav.map((list, index) => (
                <li className="nav-item" key={index}>
                  {list.path.startsWith("#") ? (
                    <a className="nav-link" href={list.path}>{list.text}</a>
                  ) : (
                    <Link className="nav-link" to={list.path}>{list.text}</Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Section (Search, Heart, User Profile) */}
            <div className="d-flex gap-3 align-items-center">
              <FaSearch className="search-icon" />
              <Link to="/wishlist" className="wishlist-link"><i id="heart-icon"className={`fa ${liked ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart"}`} onClick={() => setLiked(!liked)}></i></Link>

              {/* Show Profile Dropdown if logged in, otherwise show Login/Signup */}
              {user ? (
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <FaUserCircle className="user-icon" /> {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li><span className="dropdown-item">Role: {user.role}</span></li>
                    <li><span className="dropdown-item">Email: {localStorage.getItem("email") || "Not Provided"}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-warning hsigninbtn" onClick={() => navigate("/signup")}>Sign Up</button>
                  <button className="btn btn-warning hloginbtn" onClick={() => navigate("/login")}>Login</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
