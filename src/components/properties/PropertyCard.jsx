import React from "react";
import { FaHeart } from "react-icons/fa";

const PropertyCard = ({ property, isWishlisted, toggleWishlist }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card property-card shadow-sm p-3">
        <img src={property.image} className="card-img-top" alt={property.title} />
        <div className="card-body">
          <h6 className="text-muted">{property.location}</h6>
          <h5 className="card-title">{property.title}</h5>
          <p className="text-success fw-bold">{property.price} /month</p>
          <p className="text-muted">+ Deposit {property.deposit}</p>
          <p className="small">{property.area} sqft • {property.bhk} BHK • {property.bathrooms} Baths</p>

          <div className="highlights">
            {property.highlights?.map((highlight, index) => (
              <span key={index} className="badge bg-light text-dark me-1">{highlight}</span>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">{property.postedTime} ago</span>
            <span className="verified-badge">Verified</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-primary fw-bold">{property.dealer}</span>
            <button className="btn btn-outline-primary">Contact</button>
          </div>

          <FaHeart
            className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
            onClick={() => toggleWishlist(property.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
