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
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email"); // Retrieve stored email

    if (!email) {
      setErrorMessage("Session expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/verify-otp", { email, otp });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save JWT token
        setSuccessMessage("OTP Verified! Redirecting...");

        setTimeout(() => navigate("/home"), 2000); // Redirect after success message
      } else {
        throw new Error("Token missing in response");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid OTP! Please try again.");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify Your OTP</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleVerifyOtp} className="otp-form">
        <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
        <button type="submit" className="btn">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;