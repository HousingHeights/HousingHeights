import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role before signing up!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
      
      // Extract role from backend response
      const registeredRole = response.data.role || formData.role; // Ensure we have a role
      
      // Set success message
      setSuccessMessage(`User registered as ${registeredRole}`);

      // Navigate to login after delay (optional)
      setTimeout(() => navigate("/login"), 3000);
      
    } catch (error) {
      alert("Registration Failed: " + (error.response?.data?.message || error.message));
    }
  };

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/google", {
        googleId: decoded.sub,
        email: decoded.email,
        username: decoded.name,
        picture: decoded.picture,
      });

      alert(response.data.message || "Google Sign In Successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Google Sign In Failed: " + (error.response?.data?.message || error.message));
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
        <h2>Sign Up</h2>

        {/* Display success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="username" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <select name="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="AGENT">Agent</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        {/* Google OAuth Integration */}
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Google Sign In Failed")} />
        </GoogleOAuthProvider>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
