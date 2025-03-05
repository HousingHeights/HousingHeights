import React, { useState } from 'react';

const PropertiesForm = () => {
  const [formData, setFormData] = useState({});
  const [photoCount, setPhotoCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      if (files.length > 5) {
        setError('You can upload a maximum of 5 images.');
        return;
      }
      setPhotoCount(files.length);
    }
    if (name === "video") {
      if (files.length > 1) {
        setError('You can upload only 1 video.');
        return;
      }
      setVideoCount(files.length);
    }
    setError('');
    setFormData({
      ...formData,
      [name]: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photoCount > 5) {
      setError('Please ensure you upload the required number of photos.');
      return;
    }
    if (videoCount > 1) {
      setError('Please upload only 1 video.');
      return;
    }
    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Property Information */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold">Property Information</legend>
        <input name="propertyTitle" type="text" placeholder="Property Title" onChange={handleChange} className="w-full p-2 border rounded" />
        
        <select name="propertyType" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
          <option value="Land">Land</option>
        </select>

        <select name="listingType" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Listing Type</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="area" type="number" placeholder="Area (sq ft/m²)" onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="bedrooms" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Bedrooms</option>
          {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <select name="bathrooms" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Bathrooms</option>
          {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <select name="ownershipType" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Ownership Type</option>
          <option value="Freehold">Freehold</option>
          <option value="Leasehold">Leasehold</option>
        </select>

        <textarea name="propertyDescription" placeholder="Property Description" onChange={handleChange} className="w-full p-2 border rounded"></textarea>

        <input name="images" type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2" />
        {error && <p className="text-red-500">{error}</p>}
      </fieldset>

      {/* Location Details */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold">Location Details</legend>
        <input name="address" type="text" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="city" type="text" placeholder="City" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="state" type="text" placeholder="State/Province" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="zip" type="text" placeholder="ZIP/Postal Code" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="country" type="text" placeholder="Country" onChange={handleChange} className="w-full p-2 border rounded" />
      </fieldset>

      {/* Property Features & Amenities */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold">Property Features & Amenities</legend>
        {['Swimming Pool', 'Gym', 'Security', 'Garden', 'Lift/Elevator', 'Power Backup', 'Parking', 'Pet Friendly', 'Internet & Cable TV'].map((feature) => (
          <label key={feature} className="block">
            <input type="checkbox" name={feature} onChange={handleCheckboxChange} className="mr-2" />
            {feature}
          </label>
        ))}
      </fieldset>

      {/* Seller / Agent Details */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold">Seller / Agent Details</legend>
        <input name="sellerName" type="text" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
      </fieldset>

      {/* Additional Information */}
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold">Additional Information</legend>
        <select name="availability" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Availability for Visits</option>
          <option value="Anytime">Anytime</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="By Appointment">By Appointment</option>
        </select>
      </fieldset>

      {/* Terms & Submission */}
      <fieldset className="space-y-2">
        <label className="block">
          <input type="checkbox" name="terms" onChange={handleCheckboxChange} className="mr-2" />
          I agree to the Terms & Conditions.
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </fieldset>
    </form>
  );
};

export default PropertiesForm;
