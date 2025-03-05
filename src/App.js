import React from "react";
import { Route, Routes, useLocation, Navigate, BrowserRouter as Router } from "react-router-dom";
import Pages from "./components/pages/Pages";
import Home from "./components/home/Home";
import Header from "./components/common/header/Header";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/login/Login";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import VerifyOtp from "./components/login/VerifyOtp";
import AboutUs from "./components/AboutUs/AboutUs";
import Property from "./components/property/Property";
import PropertyCard from "./components/property/PropertyCard";
import PropertyDetails from "./components/property/PropertyDetails";
import Footer from "./components/common/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    fetch("/property_indian_listings.json")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error loading property data:", error));
  }, []);

// Hide header and footer on login, signup, and forgot-password pages
const hideHeaderFooter = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

// Hide header on Property and AboutUs pages
const hideHeader = ["/Property", "/AboutUs"].includes(location.pathname);

// Show footer only on AboutUs and Property pages
const showFooter = ["/Property", "/AboutUs","/"].includes(location.pathname);

  return (
    <>
        {!hideHeaderFooter && !hideHeader && <Header />}  
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
        <Route path="/property" element={<Property />} />
          <Route path="/AboutUs" element={<AboutUs />} />

          {/* Property listing and details */}
          <Route path="/properties" element={
            <div>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          } />
          <Route path="/property/:id" element={<PropertyDetails />} />
   
      </Routes>
     
     {showFooter && <Footer />}
    </>
  );
}

export default App;
