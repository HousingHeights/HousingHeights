import React, { useState, useEffect } from "react";
import PropHeader from "./PropHeader";
import PropertyCard from "./PropertyCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [availability, setAvailability] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  const toggleWishlist = (propertyId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(propertyId)
        ? prevWishlist.filter((id) => id !== propertyId)
        : [...prevWishlist, propertyId]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((item) => item !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  const clearAllFilters = () => {
    setPropertyType("");
    setListingType("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setBedrooms("");
    setBathrooms("");
    setOwnershipType("");
    setSelectedAmenities([]);
    setAvailability("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
  };

  const filteredProperties = properties.filter((property) => {
    return (
      (!propertyType || property.type === propertyType) &&
      (!listingType || property.listingType === listingType) &&
      (!minPrice || property.price >= minPrice) &&
      (!maxPrice || property.price <= maxPrice) &&
      (!minArea || property.area >= minArea) &&
      (!maxArea || property.area <= maxArea) &&
      (!bedrooms || property.bedrooms.toString() === bedrooms) &&
      (!bathrooms || property.bathrooms.toString() === bathrooms) &&
      (!ownershipType || property.ownershipType === ownershipType) &&
      (!city || property.city === city) &&
      (!state || property.state === state) &&
      (!zipCode || property.zipCode === zipCode) &&
      (!country || property.country === country) &&
      (selectedAmenities.length === 0 || selectedAmenities.every((amenity) => property.amenities.includes(amenity))) &&
      (!availability || property.availability === availability)
    );
  });

  return (
    <div className="properties-page">
      <PropHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 filters p-4 shadow-sm">
            <h2 className="mb-3">Filters</h2>
            <button className="clear-all" onClick={clearAllFilters}>Clear All</button>

            <h4>Property Type</h4>
            <select className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Select</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Office">Office</option>
              <option value="Land">Land</option>
            </select>

            <h4>Listing Type</h4>
            <select className="form-control" value={listingType} onChange={(e) => setListingType(e.target.value)}>
              <option value="">Select</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>

            <h4>Price Range</h4>
            <input type="number" className="form-control" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" className="form-control" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

            <h4>Bedrooms</h4>
            <input type="number" className="form-control" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />

            <h4>Bathrooms</h4>
            <input type="number" className="form-control" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />

            <h4>Ownership Type</h4>
            <select className="form-control" value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)}>
              <option value="">Select</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>

            <h4>Amenities</h4>
            {["Swimming Pool", "Gym", "Security", "Garden", "Lift", "Power Backup", "Parking", "Pet Friendly", "Internet & Cable TV"].map((amenity) => (
              <div key={amenity}>
                <input type="checkbox" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} /> {amenity}
              </div>
            ))}

            <h4>Availability for Visits</h4>
            <select className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="">Select</option>
              <option value="Anytime">Anytime</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="By Appointment">By Appointment</option>
            </select>
          </div>

          <div className="col-md-9">
            <div className="row">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property.id} className="col-md-4 mb-4">
                    <PropertyCard property={property} isWishlisted={wishlist.includes(property.id)} toggleWishlist={toggleWishlist} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No properties found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
