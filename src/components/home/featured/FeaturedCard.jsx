import React from "react";
import { featured } from "../../data/Data";

const FeaturedCard = () => {
  return (
    <div className="featured-cards">
      {featured.map((item, index) => (
        <div className="featured-box" key={index}>
          <div className="img-container">
            <img src={item.cover} alt={item.name} />
          </div>
          <h4>{item.name}</h4>
          <label>{item.total}</label>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCard;