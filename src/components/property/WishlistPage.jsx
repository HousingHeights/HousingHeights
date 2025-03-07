import React, { useContext } from "react"; 
import { WishlistContext } from "./WishlistContext"; 
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import "./WishlistPage.css";



const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No properties in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
      <Link to="/Property"><p>← Back to Listings</p></Link>
    </div>
  );
};

export default WishlistPage;


















