import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  // State for autocomplete, dropdown, and price range
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("INR"); // Default currency

  // Handle input changes
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handlePropertyTypeChange = (e) => setPropertyType(e.target.value);
  const handleMinPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Prevent negative values
    setMinPrice(value);
  };
  const handleMaxPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Prevent negative values
    setMaxPrice(value);
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    return price
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(price)
      : "";
  };

  return (
    <section className="hero">
      {/* Background Video */}
      <video autoPlay loop muted className="hero-video">
        <source src="/videos/bannerVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for text visibility */}
      <div className="overlay"></div>

      <div className="container">
        {/* Title and Subtitle */}
        <div className="text-container">
          <Heading
            title="Search Your Next Dream Property"
            subtitle="Find new & featured property located in your local city or any city."
          />
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="cta-button">Rent</button>
          <button className="cta-button">Buy</button>
          <button className="cta-button">Sell</button>
        </div>

        {/* Search Form */}
        <form className="search-form">
          {/* Location Input */}
          <div className="box" id="loc">
            <span>City/Street</span>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Location"
            />
          </div>

          {/* Property Type Dropdown */}
          <div className="box" id="prop">
            <span>Property Type</span>
            <select
              value={propertyType}
              onChange={handlePropertyTypeChange}
              className="dropdown"
            >
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="pg/hostel">Pg/Hostel</option>
            </select>
          </div>

          {/* Price Range (Min & Max Inputs) */}
          <div className="box" id="price">
            <span>Price Range</span>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="price-field"
              />
              <span> - </span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="price-field"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="btn1">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
