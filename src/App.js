import React from "react";
import { Route, Routes, useLocation, Navigate, BrowserRouter as Router } from "react-router-dom";
import Pages from "./components/pages/Pages";
import Header from "./components/common/header/Header";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/login/Login";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import VerifyOtp from "./components/login/VerifyOtp";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute";

import 'font-awesome/css/font-awesome.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const location = useLocation();

  // Hide Header/Footer on login, signup, forgot-password, reset-password, and OTP pages
  const hideHeaderFooter = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-otp"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/*" element={<Pages />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} /> 

        {/* Protect routes with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
