import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Properties from "../properties/Properties";

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </>
  );
};

export default Pages;
