import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./verifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setOtp(value);
  };
  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email"); // Retrieve stored email
  
    if (!email) {
      setErrorMessage("Session expired. Please log in again.");
      return;
    }
  
    try {
      console.log("🔄 Verifying OTP for:", email);
  
      const response = await axios.post("http://localhost:8080/api/v1/user/verify-otp", { email, otp });
  
      console.log("✅ OTP Verification Response:", response.data);
  
      const { token, role = "User", name = "Guest" } = response.data;
  
      if (!token) {
        throw new Error("❌ Token missing in response");
      }
  
      // Store user details
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      
      console.log(`🎉 OTP Verified! ${name} logged in as ${role}`);
  
      setSuccessMessage("OTP Verified! Redirecting...");
  
      // Redirect and refresh UI
      navigate("/home");
      window.location.reload();
  
    } catch (error) {
      console.error("❌ OTP Verification Error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Invalid OTP! Please try again.");
      
      // Clear OTP input for better UX
      setOtp("");
    }
  };
  
  return (
    <div className="otp-container">
      <h2>Verify Your OTP</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleVerifyOtp} className="otp-form">
        <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
        <button type="submit" className="btn" disabled={!otp}>Verify OTP</button>

      </form>
    </div>
  );
};

export default VerifyOtp;