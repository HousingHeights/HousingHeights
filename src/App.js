import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate, BrowserRouter as Router } from "react-router-dom";
import { WishlistProvider } from "./components/property/WishlistContext"; 
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
import WishlistPage from "./components/property/WishlistPage";
import Payment from "./components/payment/Payment";
import Footer from "./components/common/footer/Footer";
import ProfileCard from "./components/profile/ProfileCard";
import Setting from "./components/setting/Setting";
import PrivateRoute from "./components/PrivateRoute";
import PropertiesForm from "./components/property/PropertiesForm"; // ✅ Import PropertiesForm

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/property_indian_listings.json")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error loading property data:", error));
  }, []);

  // Hide header and footer on login, signup, and forgot-password pages
  const hideHeaderFooter = [
    "/login",
    "/signup",
    "/forgot-password",
    "/properties-form",
    "/wishlist",
    "/payment",
    "/property/:id",
    "/payment",
    "/profile",
    "/setting",
    "/property/:id/details", // ✅ Added route for property details
    
    
  ].includes(location.pathname) || location.pathname.startsWith("/property/");
  

  const hideHeader = ["/Property", "/AboutUs"].includes(location.pathname);
  const showFooter = ["/Property", "/AboutUs", "/"].includes(location.pathname);

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
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/setting" element={<Setting />} />

        {/* Protect routes with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/properties-form" element={<PropertiesForm />} /> {/* ✅ Added Form Route */}
        </Route>
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/property" element={<Property />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/payment" element={<Payment />} />

        {/* Property listing and details */}
        <Route
          path="/properties"
          element={
            <div>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          }
        />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}
function App() {
  return (
    <WishlistProvider>
      
        <AppContent />
     
    </WishlistProvider>
  );
}
export default App;
