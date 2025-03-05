import React from "react";
import { FaTimes } from "react-icons/fa";
import "./ContactPopup.css";

const ContactPopup = ({ property, closePopup }) => {
  return (
    <div className="contact-popup-overlay">
      <div className="contact-popup">
        {/* Header */}
        <div className="popup-header">
          <h3>You are requesting to view advertiser details.</h3>
          <button className="close-btn" onClick={closePopup}>
            <FaTimes />
          </button>
        </div>

        {/* Seller & Property Info */}
        <div className="popup-info">
          <div className="seller-details">
            <p><strong>Posted by Dealer:</strong></p>
            <p>📞 {property.seller?.phone || "Not Available"}</p>
            <p>✉️ {property.seller?.email || "Not Available"}</p>
          </div>
          <div className="property-price">
            <p><strong>Price:</strong> ₹{property.price.toLocaleString("en-IN")}</p>
            <p>{property.title}</p>
          </div>
        </div>

        {/* Form Inputs */}
        <form className="contact-form">
          <h4>Fill in your details to contact the advertiser:</h4>

          {/* Name & Phone */}
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Phone Number:</label>
          <input type="tel" placeholder="+91 XXXXX XXXXX" required />

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          {/* Checkboxes */}
          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> I am interested in home loans
            </label>
            <label>
              <input type="checkbox" /> I am interested in a site visit
            </label>
          </div>

          {/* Terms & Submit */}
          <div className="terms">
            <label>
              <input type="checkbox" required /> I agree to the Terms & Conditions
            </label>
          </div>

          <button type="submit" className="view-details-btn">
            View Advertiser Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
