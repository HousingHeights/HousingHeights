import React, { useEffect, useState } from "react";
import PropertyCard from "../property/PropertyCard";
import PropertyHeader from "./PropertyHeader";
import PropertyFilters from "./PropertyFilters";
import PropertyList from "./PropertyList";

import "./property.css";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  const [filters, setFilters] = useState({
    propertyType: "",
    listingType: "",
    maxPrice: 10000000,
    maxArea: 5000,
    bedrooms: "",
    bathrooms: "",
    ownershipType: "",
    selectedAmenities: [],
    availability: "",
    city: "",
    state: "",
    verified: false,
    photosOnly: false,
  });

  useEffect(() => {
    fetch("/indian_property_listings.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
        
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  useEffect(() => {
    filterProperties();
  }, [filters, properties]);

  const filterProperties = () => {
    let filtered = properties.filter((property) => {
      return (
        (!filters.propertyType || property.propertyType === filters.propertyType) &&
        (!filters.listingType || property.listingType === filters.listingType) &&
        (!filters.city || property.location.city === filters.city) &&
        (!filters.state || property.location.state === filters.state) &&
        (filters.maxPrice >= property.price) &&
        (filters.maxArea >= property.area) &&
        (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || property.bathrooms === parseInt(filters.bathrooms)) &&
        (filters.selectedAmenities.length === 0 || 
          filters.selectedAmenities.every((amenity) => property.features[amenity.toLowerCase().replace(/\s/g, "")])
        ) && 
        (!filters.verified || property.verified === filters.verified) &&
        (!filters.photosOnly || (property.image && property.image.trim() !== ""))
      );
    });
  
    setFilteredProperties(filtered);
  };
  
  

  return (
    <div className="properties-page">
      <PropertyHeader />
      <header className="properties-header">
        <h1>Properties</h1>
      </header>

      <div className="property-content">
        <PropertyFilters filters={filters} setFilters={setFilters} />
        <PropertyList properties={filteredProperties} filters={filters} />

        <div className="property-list">
          {filteredProperties.length > 0 ? filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />) : <p>No properties match your filters.</p>}
        </div>
      </div>
    </div>
  );
};

export default Property;
