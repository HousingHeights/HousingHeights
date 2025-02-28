import React, { useState, useEffect } from "react";
import PropHeader from "./PropHeader";
import PropertyCard from "./PropertyCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./properties.css";
import { Form, Button, Row, Col, Collapse } from "react-bootstrap";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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
  const states = ["Andhra Pradesh","Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Punjab"];

  useEffect(() => {
    fetch("api/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Properties:", data);
        setProperties(data); // Remove the extra closing parenthesis here
      })
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

  return (
    <div className="properties-page">
      <PropHeader />
      <div className="container-fluid py-4">
        <Row>
          <Col lg={3} md={4} sm={12} className="filters p-4 bg-light rounded shadow-sm">
            <h4 className="mb-3">Filters</h4>
            <Button variant="danger" className="mb-3 w-100" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>

            <Form.Group className="mb-3 d-flex align-items-center">
  <Form.Label className="me-2 mb-0" style={{ whiteSpace: "nowrap" }}>
    Properties with Photos
  </Form.Label>
  <div className="form-check form-switch">
    <Form.Check type="switch" className="mt-3" checked={photosOnly} onChange={() => setPhotosOnly(!photosOnly)} />
  </div>
</Form.Group>



            <Form.Group className="mb-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Select</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
                <option value="Land">Land</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Listing Type</Form.Label>
              <Form.Select value={listingType} onChange={(e) => setListingType(e.target.value)}>
                <option value="">Select</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Range min={0} max={10000000} step={50000} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              <div>Max Price: ₹{maxPrice}</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area Range (sq. ft.)</Form.Label>
              <Form.Range min={0} max={5000} value={maxArea} onChange={(e) => setMaxArea(e.target.value)} />
              <div>Max Area: {maxArea} sq. ft.</div>
            </Form.Group>
             
            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control type="number" min="0" max="10" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control type="number" min="0" max="10" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ownership Type</Form.Label>
              <Form.Select value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)}>
                <option value="">Select</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Form.Select>
            </Form.Group>

           
  
  <Form.Group className="mb-3">
  <Form.Label>Amenities</Form.Label>
  
  {/* Initially visible amenities */}
  {["Swimming Pool", "Gym", "Security"].map((amenity) => (
    <Form.Check key={amenity} label={amenity} checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
  ))}

  {/* Hidden amenities that appear above the "+ More" link */}
  <Collapse in={showMoreAmenities}>
    <div>
      {["Garden", "Lift", "Power Backup", "Parking", "Pet Friendly", "Internet & Cable TV"].map((amenity) => (
        <Form.Check key={amenity} label={amenity} checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
      ))}
    </div>
  </Collapse>

  {/* Minimal "+ More" link without underline */}
  <span 
    className="text-primary toggle-link" 
    onClick={() => setShowMoreAmenities(!showMoreAmenities)}
  >
    {showMoreAmenities ? "−" : "+"}
  </span>
</Form.Group>



            <Form.Group className="mb-3 d-flex align-items-center">
  <Form.Label className="mb-0" style={{ whiteSpace: "nowrap" }}>
    Verified Listings
  </Form.Label>
  <Form.Check type="switch" className=" mt-3 ms-4" checked={verified} onChange={() => setVerified(!verified)} />
</Form.Group>



            <Form.Group className="mb-3">
              <Form.Label>Availability for Visits</Form.Label>
              <Form.Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="">Select</option>
                <option value="Anytime">Anytime</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="By Appointment">By Appointment</option>
              </Form.Select>
            </Form.Group>

            <Col md={9}>
            <Row>
              {properties.map((property) => (
                <Col md={4} key={property.id} className="mb-4">
                  <PropertyCard property={property} isWishlisted={wishlist.includes(property.id)} toggleWishlist={toggleWishlist} />
                </Col>
              ))}
            </Row>
          </Col>

          </Col>
          
        </Row>
      </div>
    </div>
  );
};

export default Properties;
