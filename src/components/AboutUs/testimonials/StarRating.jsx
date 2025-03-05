import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  
  return (
    <div className="star-rating">
      {"⭐".repeat(fullStars)}
      {halfStar && "⭐"}
    </div>
  );
};

export default StarRating;
