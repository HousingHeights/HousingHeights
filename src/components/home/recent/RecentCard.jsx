import React, { useState } from "react";
import { list } from "../../data/Data";
import "./recentCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import both filled and empty hearts

const RecentCard = ({ showIcons = true }) => {
  const [liked, setLiked] = useState(Array(list.length).fill(false)); // Track heart state for each card

  // Function to toggle heart icon state
  const toggleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <div className="content grid3 mtop">
      {list.map((val, index) => {
        const { cover, category, location, name, price, type } = val;
        return (
          <div className="cbox shadow" key={index}>
            <div className="img">
              <img src={cover} alt="" />
            </div>
            <div className="text">
              <h4>{name}</h4>
              <p>
                <i className="fa fa-location-dot"></i> {location}
              </p>
            </div>
            <div className="button flex">
              {/* Heart icon - toggles between filled and empty */}
              <span className="heart-icon" onClick={() => toggleLike(index)}>
                {liked[index] ? <FaHeart className="filled-heart" /> : <FaRegHeart className="empty-heart" />}
              </span>

              <div>
                <button className="btn2">{price}</button> <label>/sqft</label>
              </div>
              <span>{type}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentCard;
