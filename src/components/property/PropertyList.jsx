import React,{ useState, useEffect } from "react";

const amenityToFeatureKey = (amenity) => {
  const mapping = {
    "Swimming Pool": "swimmingPool",
    "Gym": "gym",
    "Security": "security",
    "Garden": "garden",
    "Lift": "liftElevator",
    "Power Backup": "powerBackup",
    "Parking": "parking",
    "Pet Friendly": "petFriendly",
    "Internet & Cable TV": "internetCableTV"
  };
  return mapping[amenity] || "";
};

const PropertyList = ({ properties, filters }) => {
  const filteredProperties = properties.filter((property) =>
    filters.selectedAmenities.every((amenity) => {
      const featureKey = amenityToFeatureKey(amenity);
      return property.features[featureKey]; // Check if feature is true
    })
  );

  // return (
  //   <div>
  //     {filteredProperties.map((property) => (
  //       <div key={property.id}>{property.title}</div>
  //     ))}
  //   </div>
  // );
};

export default PropertyList;
