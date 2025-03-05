import React from "react";

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "filled-star" : "empty-star"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
