import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaHome, FaBuilding, FaUser, FaPhone } from "react-icons/fa";
import { MdLocationOn, MdOutlineApartment, MdOutlineSecurity, MdLocalParking, MdOutlinePets, MdPool, MdFitnessCenter, MdPower } from "react-icons/md";
import ContactPopup from "./ContactPopup";
import "./PropertyDetails.css";

const API_KEY = "Hqt8At0Wx5LlhLLPy7l6hmPxw0WHdqFUJBDr4NLMhLdb6fH7v8ZOHPpH"; // Replace with your actual API key

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div className="property-details-page">
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
    </div>
  );
};

export default PropertyDetails;






























// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import ContactPopup from "./ContactPopup";
// import "./PropertyDetails.css";

// const API_KEY = "Hqt8At0Wx5LlhLLPy7l6hmPxw0WHdqFUJBDr4NLMhLdb6fH7v8ZOHPpH"; // Replace with your actual API key

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [imageUrl, setImageUrl] = useState(""); // State to store fetched image
//   const formatFeatureName = (key) => {
//     return key
//       .replace(/([A-Z])/g, " $1") // Add space before capital letters
//       .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
//   };
  

//   useEffect(() => {
//     fetch("/indian_property_listings.json") // Ensure this file is in `public/`
//       .then((response) => response.json())
//       .then((data) => {
//         const foundProperty = data.properties.find((p) => p.id === parseInt(id));
//         setProperty(foundProperty);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error loading property data:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       if (!property) return;

//       try {
//         const searchQuery = property.propertyType || "house"; // Default search term if propertyType is missing
//         const response = await fetch(
//           `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`,
//           { headers: { Authorization: API_KEY } }
//         );
//         const data = await response.json();

//         if (data.photos.length > 0) {
//           setImageUrl(data.photos[Math.floor(Math.random() * data.photos.length)].src.medium);
//         } else {
//           setImageUrl("https://via.placeholder.com/400x250?text=No+Image");
//         }
//       } catch (error) {
//         console.error("Error fetching images:", error);
//         setImageUrl("https://via.placeholder.com/400x250?text=Error+Loading");
//       }
//     };

//     fetchImages();
//   }, [property]); // Run only when `property` is set

//   if (loading) return <h2>Loading property details...</h2>;
//   if (!property) return <h2>Property not found.</h2>;

//   return (
//     <div className="property-details-page">
//       {/* Use the fetched image URL */}
//       <img src={imageUrl || property.imageUrl} alt={property.title} className="property-image-large" />

//       <h1>{property.title}</h1>
// <p>{property.propertyType} | {property.listingType}</p>

// <p><strong>Price:</strong> ₹{property.price.toLocaleString("en-IN")}</p>
// <p><strong>Area:</strong> {property.area} sqft</p>
// <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
// <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
// <p><strong>Ownership Type:</strong> {property.ownershipType}</p>

// <p><strong>Location:</strong> {property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}, {property.location.country}</p>

// <p><strong>Description:</strong> {property.description}</p>

// <p>
//   <strong>Amenities:</strong> {property.features
//     ? Object.keys(property.features)
//         .filter((key) => property.features[key]) // Only keep true values
//         .map((key) => formatFeatureName(key)) // Format the key names
//         .join(", ")
//     : "No amenities available"}
// </p>
// <p><strong>Seller:</strong> {property.seller?.name || "N/A"}</p>
// <p><strong>Contact:</strong> {property.seller?.phone || "N/A"}</p>
// <p><strong>Availability for Visits:</strong> {property.availabilityForVisits || "Not specified"}</p>




//       {/* Wishlist & Contact Buttons */}
//       <div className="property-footer">
//         <button className="wishlist-btn" onClick={() => setWishlisted(!wishlisted)}>
//           {wishlisted ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon" />}
//         </button>
//         <button className="contact-btn" onClick={() => setShowPopup(true)}>Contact Agent</button>
//       </div>

//       {/* Contact Popup */}
//       {showPopup && <ContactPopup property={property} closePopup={() => setShowPopup(false)} />}

//       {/* Back to Listings */}
//       <Link to="/" className="back-link">← Back to Listings</Link>
//     </div>
//   );
// };

// export default PropertyDetails;
















// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import ContactPopup from "./ContactPopup";
// import "./PropertyDetails.css";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/indian_property_listings.json") // Make sure this is in the `public/` folder
//       .then((response) => response.json())
//       .then((data) => {
//         const foundProperty = data.properties.find((p) => p.id === parseInt(id)); // Ensure proper ID matching
//         setProperty(foundProperty);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error loading property data:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <h2>Loading property details...</h2>;
//   if (!property) return <h2>Property not found.</h2>;

//   return (
//     <div className="property-details-page">
//       <img src={property.imageUrl} alt={property.title} className="property-image-large" />
//       <h1>{property.title}</h1>
//       <p>{property.propertyType} | {property.listingType}</p>
//       <p>Location: {property.location.city}, {property.location.state}</p>
//       <p className="property-price">Price: ₹{property.price.toLocaleString("en-IN")}</p>
//       <p>{property.description}</p>

//       {/* Wishlist & Contact Buttons */}
//       <div className="property-footer">
//         <button className="wishlist-btn" onClick={() => setWishlisted(!wishlisted)}>
//           {wishlisted ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon" />}
//         </button>
//         <button className="contact-btn" onClick={() => setShowPopup(true)}>Contact Agent</button>
//       </div>

//       {/* Contact Popup */}
//       {showPopup && <ContactPopup property={property} closePopup={() => setShowPopup(false)} />}

//       {/* Back to Listings */}
//       <Link to="/" className="back-link">← Back to Listings</Link>
//     </div>
//   );
// };

// export default PropertyDetails;




  















// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./PropertyDetails.css";

// const PropertyDetails = () => {
//   const { id } = useParams(); // Get property ID from URL
//   const [property, setProperty] = useState(null);

//   useEffect(() => {
//     fetch("../property_indian_listings.json")
//       .then((response) => response.json())
//       .then((data) => {
//         const foundProperty = data.find((p) => String(p.id) === id); // Ensure id comparison works
//         setProperty(foundProperty);
//       })
//       .catch((error) => console.error("Error loading property data:", error));
//   }, [id]);

//   if (!property) return <h2>Loading property details...</h2>;

//   return (
//     <div className="property-details-page">
//       <img src={property.imageUrl} alt={property.title} className="property-image-large" />
//       <h1>{property.title}</h1>
//       <p>{property.propertyType} | {property.listingType}</p>
//       <p>Location: {property.location.city}, {property.location.state}</p>
//       <p className="property-price">Price: ₹{property.price.toLocaleString("en-IN")}</p>
//       <p>{property.description}</p>
//     </div>
//   );
// };

// export default PropertyDetails;



























// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);

//   useEffect(() => {
//     fetch("/property_indian_listings.json")
//       .then((response) => response.json())
//       .then((data) => {
//         const foundProperty = data.find((p) => p.id === parseInt(id));
//         setProperty(foundProperty);
//       })
//       .catch((error) => console.error("Error loading property data:", error));
//   }, [id]);

//   if (!property) return <h2>Loading property details...</h2>;

//   return (
//     <div className="property-details-page">
//       <img src={property.imageUrl} alt={property.title} className="property-image-large" />
//       <h1>{property.title}</h1>
//       <p>{property.propertyType} | {property.listingType}</p>
//       <p>Location: {property.location.city}, {property.location.state}</p>
//       <p className="property-price">Price: ₹{property.price.toLocaleString("en-IN")}</p>
//       <p>{property.description}</p>
//     </div>
//   );
// };

// export default PropertyDetails;
