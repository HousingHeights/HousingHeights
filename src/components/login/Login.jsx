import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    try {
      console.log("🔄 Attempting to log in with:", { email, password });
  
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
  
      console.log("✅ Response received:", response.data);
  
      // Check if OTP verification is required
      if (response.data?.message === "OTP sent to your email!") {
        console.log("📩 OTP Required - Redirecting to OTP Verification...");
        
        // Store email in localStorage for OTP verification
        localStorage.setItem("email", email);
        navigate("/verify-otp");
        return;
      }
  
      // Extract token, role, and name after OTP verification
      const { token, role = "User", name = "Guest" } = response.data;
      if (!token) {
        throw new Error("❌ Token is missing from backend response");
      }
  
      // Store login details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
  
      console.log(`🎉 ${name} logged in as ${role}`);
      setSuccessMessage(`${name} logged in successfully! Redirecting...`);
  
      // Redirect and refresh UI immediately
      navigate("/home");
      window.location.reload();
  
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={"/images/logo.png"} alt="Website Logo" className="SignUplogo" onClick={() => navigate("/")} />
        <h3>Why Join Us?</h3>
        <ul className="benefits-list">
          <li>✔️ Access exclusive deals & offers</li>
          <li>✔️ Personalized recommendations</li>
          <li>✔️ Quick & easy sign-in experience</li>
          <li>✔️ Secure & seamless transactions</li>
        </ul>
      </div>

      <div className="signup-right">
        <h2>Login to Your Account</h2>

        {/* Display success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="signup-form">
          <input type="email" name="email" placeholder="Email Address" value={email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
          <button type="submit" className="btn">Login</button>
        </form>

        <div className="social-login">
          <Link to="/forgot-password" className="forgot-password-btn">Forgot Password?</Link>
        </div>

        <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
