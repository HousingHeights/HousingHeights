import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "./WishlistContext";
import ContactPopup from "./ContactPopup";
import "./propertyCard.css";

const API_KEY = "Hqt8At0Wx5LlhLLPy7l6hmPxw0WHdqFUJBDr4NLMhLdb6fH7v8ZOHPpH"; // Replace with your actual API key

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const isWishlisted = wishlist.some((item) => item.id === property.id);

  const [imageUrl, setImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Function to determine image search query based on property type
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

  // Fetch property image
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

  // Handle Wishlist Click
  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property);
    }
  };

  // Handle "Book Now" Click
  const handleBookNow = () => {
    navigate("/payment", { state: { property } });
  };

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
        <button className="pwishlist-btn" onClick={handleWishlistClick}>
          {isWishlisted ? <FaHeart className="pheart-icon filled" /> : <FaRegHeart className="heart-icon" />}
        </button>
        <button className="contact-btn" onClick={() => setShowPopup(true)}>Contact Agent</button>
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
      </div>

      {showPopup && <ContactPopup property={property} closePopup={() => setShowPopup(false)} />}
    </div>
  );
};

export default PropertyCard;
