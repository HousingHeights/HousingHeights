import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ContactPopup from "./ContactPopup";
import "./propertyCard.css";

const PropertyCard = ({ property }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const API_KEY = "Hqt8At0Wx5LlhLLPy7l6hmPxw0WHdqFUJBDr4NLMhLdb6fH7v8ZOHPpH";

  const getSearchQuery = (propertyType) => {
    const queryMap = {
      "Villa": "luxury house exterior",
      "Flat": "modern apartment building exterior",
      "Independent House": "residential house exterior",
      "Apartment": "apartment complex exterior",
      "Office": "office building skyscraper",
      "Farmhouse": "rural farmhouse exterior",
      "PG": "student hostel exterior",
      "Hostel": "large hostel building exterior",
    };
    return queryMap[propertyType] || "real estate property exterior";
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const searchQuery = getSearchQuery(property.propertyType);
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`,
          { headers: { Authorization: API_KEY } }
        );
        const data = await response.json();
        if (data.photos.length > 0) {
          setImageUrl(data.photos[Math.floor(Math.random() * data.photos.length)].src.medium);
        } else {
          setImageUrl("https://via.placeholder.com/400x250?text=No+Image");
        }
      } catch (error) {
        setImageUrl("https://via.placeholder.com/400x250?text=Error+Loading");
      }
    };
    fetchImages();
  }, [property.propertyType]);

  return (
    <div className="property-card">
      {/* Clickable area wrapped in Link for navigation */}
      <Link to={`/property/${property.id}`} className="property-link">
        <div className="property-image-container">
          <img src={imageUrl} alt={property.title} className="property-image" />
        </div>
        <div className="property-details">
          <h2>{property.title}</h2>
          <p>{property.propertyType} | {property.listingType}</p>
          <p>Location: {property.location.city}, {property.location.state}</p>
          <p className="property-price">Price: ₹{property.price.toLocaleString("en-IN")}</p>
          <p>{property.description}</p>
        </div>
      </Link>

      <div className="property-footer">
        <button className="wishlist-btn" onClick={() => setWishlisted(!wishlisted)}>
          {wishlisted ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon" />}
        </button>
        <button className="contact-btn" onClick={() => setShowPopup(true)}>Contact Agent</button>
      </div>

      {showPopup && <ContactPopup property={property} closePopup={() => setShowPopup(false)} />}
    </div>
  );
};

export default PropertyCard;
