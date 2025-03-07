import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/Property", {
      state: { location, propertyType, minPrice, maxPrice }, // Send search filters
    });
  };

  return (
    <section className="hero">
      <video autoPlay loop muted className="hero-video">
        <source src="/videos/bannerVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <div className="container">
        <div className="text-container">
          <Heading
            title="Search Your Next Dream Property"
            subtitle="Find new & featured property located in your local city or any city."
          />
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="box">
            <span>City/Street</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>

          <div className="box">
            <span>Property Type</span>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="pg/hostel">PG/Hostel</option>
            </select>
          </div>

          <div className="box">
            <span>Price Range</span>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span> - </span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn1">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
