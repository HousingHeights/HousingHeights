import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaSearch, FaHeart } from "react-icons/fa";

import "./header.css"; 

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [liked, setLiked] = useState(false);
  const [navList, setNavList] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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

  const nav = [
    { path: "/", text: "Home" },
    { path: "/Property", text: "Properties" },
    { path: "AboutUs", text: "AboutUs" },
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
            <span className="navbar-toggler-icon" style={{ borderColor: "#A9A9A9" }}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll">
              {nav.map((list, index) => (
                <li className="nav-item" key={index}>
                {list.path.startsWith("#") ? (
                  <a className="nav-link" href={list.path}>
                    {list.text}
                  </a>
                ) : (
                  <Link className="nav-link" to={list.path}>
                    {list.text}
                  </Link>
                )}
              </li>
              ))}
            </ul>

            <div className="d-flex gap-3 flex-column flex-lg-row align-items-start align-items-lg-center">
              <div className="position-relative">
                <i className="fa fa-search search-icon" onClick={() => setShowSearch(!showSearch)}></i>
                {showSearch && (
                  <div className="position-absolute search-bar">
                    <input type="text" className="form-control" placeholder="Search..." onClick={() => setSearchTerm(false)} />
                    <i className="fa fa-times close-search" onClick={() => setShowSearch(false)}></i>
                  </div>
                )}
              </div>

              <i className={`fa ${liked ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart"}`} onClick={() => setLiked(!liked)}></i>

              <div className="d-flex gap-2 flex-column flex-lg-row align-items-start align-items-lg-center">
                <button className="btn btn-warning signinbtn py-1 px-3 btn-sm w-auto " onClick={() => navigate("/signup")}>
                  SignUp
                </button>
                <button className="btn btn-warning loginbtn py-1 px-3 btn-sm w-auto" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
