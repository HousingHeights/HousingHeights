import React, { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaHome, FaBuilding, FaUser, FaPhone } from "react-icons/fa";
import { MdLocationOn, MdOutlineApartment, MdOutlineSecurity, MdLocalParking, MdOutlinePets, MdPool, MdFitnessCenter, MdPower } from "react-icons/md";
import ContactPopup from "./ContactPopup";
import "./PropertyDetails.css";
import { WishlistContext } from "./WishlistContext";
import { useNavigate } from "react-router-dom";


const API_KEY = "Hqt8At0Wx5LlhLLPy7l6hmPxw0WHdqFUJBDr4NLMhLdb6fH7v8ZOHPpH";
const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State to store fetched image
  const navigate = useNavigate();

  const formatFeatureName = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  
  useEffect(() => {
    fetch("/indian_property_listings.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find((p) => p.id === parseInt(id));
        setProperty(foundProperty);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading property data:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
        const fetchImages = async () => {
          if (!property) return;
          try {
            const searchQuery = property.propertyType || "house";
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
            console.error("Error fetching images:", error);
            setImageUrl("https://via.placeholder.com/400x250?text=Error+Loading");
          }
        };
        fetchImages();
      }, [property]);

  if (loading) return <h2>Loading property details...</h2>;
  if (!property) return <h2>Property not found.</h2>;

  const isWishlisted = wishlist.some((item) => item.id === property.id);

  return (
    <div className="property-details-page">
     
     <button className="back-button" onClick={() => navigate("/Property")}>← Go Back</button>

      <img src={imageUrl || property.imageUrl} alt={property.title} className="property-image-large" />
      
      <h1>{property.title}</h1>
      <p><FaHome /> {property.propertyType} | {property.listingType}</p>
      <p className="property-price"><FaRupeeSign /> ₹{property.price.toLocaleString("en-IN")}</p>

      <div className="property-info">
        <p><FaMapMarkerAlt /> <strong>Location:</strong> {property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}, {property.location.country}</p>
        <p><FaBed /> <strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><FaBath /> <strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><FaBuilding /> <strong>Ownership Type:</strong> {property.ownershipType}</p>
        <p><MdOutlineApartment /> <strong>Area:</strong> {property.area} sqft</p>
      </div>

      <p><strong>Description:</strong> {property.description}</p>

      <p>
        <strong>Amenities:</strong>{" "}
        {property.features
          ? Object.keys(property.features)
              .filter((key) => property.features[key])
              .map((key) => {
                const icons = {
                  swimmingPool: <MdPool />,
                  gym: <MdFitnessCenter />,
                  security: <MdOutlineSecurity />,
                  garden: "🌳",
                  liftElevator: "🛗",
                  powerBackup: <MdPower />,
                  parking: <MdLocalParking />,
                  petFriendly: <MdOutlinePets />,
                  internetCableTV: "📡",
                };
                return <span key={key} className="amenity">{icons[key]} {key.replace(/([A-Z])/g, " $1")}</span>;
               })
           : "No amenities available"}
       </p>

       <p><FaUser /> <strong>Seller:</strong> {property.seller?.name || "N/A"}</p>
       <p><FaPhone /> <strong>Contact:</strong> {property.seller?.phone || "N/A"}</p>
       <p><strong>Availability for Visits:</strong> {property.availabilityForVisits || "Not specified"}</p>
     

       <div className="property-footer">
         <button className="wishlist-btn" onClick={() => setWishlisted(!wishlisted)}>
           {wishlisted ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon" />}
        </button>
         <button className="contact-btn" onClick={() => setShowPopup(true)}>Contact Agent</button>
        </div>

       {showPopup && <ContactPopup property={property} closePopup={() => setShowPopup(false)} />}
      
       <Link to="/" className="back-link">← Back to Listings</Link>     

      <div className="property-footer">
        <button className="wishlist-btn" 
          onClick={() => {
            isWishlisted ? removeFromWishlist(property.id) : addToWishlist(property);
          }}>
          {/* {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"} */}
        </button>
      </div>
      
      <Link to="/wishlist" className="wishlist-link">Go to Wishlist</Link>
    </div>
  );
};

export default PropertyDetails;











































