import React from "react"
import { list } from "../../data/Data"

const RecentCard = ({ showIcons = true }) => {
  return (
    <div className="content grid3 mtop">
      {list.map((val, index) => {
        const { cover, category, location, name, price, type } = val;
        return (
          <div className="box shadow" key={index}>
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

