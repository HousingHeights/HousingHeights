import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (property) => {
    if (!wishlist.some((item) => item.id === property.id)) {
      setWishlist([...wishlist, property]);
    }
  };

  const removeFromWishlist = (propertyId) => {
    setWishlist(wishlist.filter((item) => item.id !== propertyId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
