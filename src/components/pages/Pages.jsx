import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Property from "../property/Property";
import AboutUs from "../AboutUs/AboutUs";

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default Pages;
