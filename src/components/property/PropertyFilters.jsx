import React, { useState } from "react";
import { Form, Button, Col, Collapse } from "react-bootstrap";

const PropertyFilters = ({ filters, setFilters }) => {
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [maxArea, setMaxArea] = useState(5000);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [availability, setAvailability] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [verified, setVerified] = useState(false);
  const [photosOnly, setPhotosOnly] = useState(false);

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
  const states = ["Andhra Pradesh", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Punjab" , "Delhi"];


  const handleInputChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.selectedAmenities.includes(amenity);
      return {
        ...prevFilters,
        selectedAmenities: isSelected
          ? prevFilters.selectedAmenities.filter((item) => item !== amenity) // Remove
          : [...prevFilters.selectedAmenities, amenity], // Add
      };
    });
  };
  

  // const toggleAmenity = (amenity) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     selectedAmenities: prevFilters.selectedAmenities.includes(amenity)
  //       ? prevFilters.selectedAmenities.filter((a) => a !== amenity)
  //       : [...prevFilters.selectedAmenities, amenity],
  //   }));
  // };

  return (
    <Col lg={3} md={4} sm={12} className="filters p-4 bg-light rounded shadow-sm">
      <h4 className="mb-3">Filters</h4>
      <Button variant="danger" className="mb-3 w-100" onClick={() => window.location.reload()}>
        Reset Filters
      </Button>

      <Form.Group className="mb-3 d-flex align-items-center">
  <Form.Label className="me-2 mb-0">Properties with Photos</Form.Label>
  <div className="form-check form-switch">
    <Form.Check
      type="switch"
      className="mt-3"
      checked={filters.photosOnly} 
      onChange={() => handleInputChange("photosOnly", !filters.photosOnly)} // ✅ Fix applied
    />
  </div>
</Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Property Type</Form.Label>
        <Form.Select value={filters.propertyType} onChange={(e) => handleInputChange("propertyType", e.target.value)}>
          <option value="">Select</option>
          <option value="Apartment">Apartment</option>
          <option value="Independent House">House</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
          <option value="Flat">Land</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Listing Type</Form.Label>
        <Form.Select value={filters.listingType} onChange={(e) => handleInputChange("listingType", e.target.value)}>
          <option value="">Select</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Price: ₹{filters.maxPrice}</Form.Label>
        <Form.Range min={0} max={10000000} step={50000} value={filters.maxPrice} onChange={(e) => handleInputChange("maxPrice", Number(e.target.value))} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Area: {filters.maxArea} sq. ft.</Form.Label>
        <Form.Range min={0} max={5000} value={filters.maxArea} onChange={(e) => handleInputChange("maxArea", Number(e.target.value))} />
      </Form.Group>
         
      <Form.Group className="mb-3">
  <Form.Label>City</Form.Label>
  <Form.Select 
    value={filters.city} 
    onChange={(e) => handleInputChange("city", e.target.value)} // ✅ Fix applied
  >
    <option value="">Select</option>
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>State</Form.Label>
  <Form.Select 
    value={filters.state} 
    onChange={(e) => handleInputChange("state", e.target.value)} // ✅ Fix applied
  >
    <option value="">Select</option>
    {states.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </Form.Select>
</Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Control type="number" min="0" max="10" value={filters.bedrooms} onChange={(e) => handleInputChange("bedrooms", e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Control type="number" min="0" max="10" value={filters.bathrooms} onChange={(e) => handleInputChange("bathrooms", e.target.value)} />
      </Form.Group>

            
       
      <Form.Group className="mb-3">
  <Form.Label>Amenities</Form.Label>
  {["Swimming Pool", "Gym", "Security"].map((amenity) => (
    <Form.Check
      key={amenity}
      label={amenity}
      checked={filters.selectedAmenities.includes(amenity)}  // ✅ Fix applied
      onChange={() => toggleAmenity(amenity)}
    />
  ))}
  <Collapse in={showMoreAmenities}>
    <div>
      {["Garden", "Lift", "Power Backup", "Parking", "Pet Friendly", "Internet & Cable TV"].map((amenity) => (
        <Form.Check
          key={amenity}
          label={amenity}
          checked={filters.selectedAmenities.includes(amenity)}  // ✅ Fix applied
          onChange={() => toggleAmenity(amenity)}
        />
      ))}
    </div>
  </Collapse>
  <span className="text-primary toggle-link" onClick={() => setShowMoreAmenities(!showMoreAmenities)}>
    {showMoreAmenities ? "−" : "+"}
  </span>
</Form.Group>

      

      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Label className="mb-0">Verified Listings</Form.Label>
        <Form.Check type="switch" className="mt-3 ms-4" checked={filters.verified} onChange={() => handleInputChange("verified", !filters.verified)} />
      </Form.Group>
    </Col>
  );
};

export default PropertyFilters;










