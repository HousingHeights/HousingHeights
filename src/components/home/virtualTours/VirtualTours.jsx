import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./virtualTours.css";
import { properties } from "../../data/Data";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

const VirtualTours = () => {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <div className="virtual-tours-container">
      <h2>Explore Properties with Virtual Tours</h2>

      <div className="map-container">
        <MapContainer center={[17.385, 78.4867]} zoom={12} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {properties.map((property, index) => {
            if (!property.lat || !property.lng) {
              console.warn(`Skipping property ${property.name} due to missing lat/lng.`);
              return null;
            }
            return (
              <Marker
                key={index}
                position={[property.lat, property.lng]}
                eventHandlers={{ click: () => setSelectedTour(property) }}
              >
                <Popup>{property.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {selectedTour && (
        <div className="virtual-tour">
          <h3>{selectedTour.name}</h3>
          <ReactPhotoSphereViewer src={selectedTour.virtualTour} width="100%" height="400px" />
        </div>
      )}
    </div>
  );
};

export default VirtualTours;
