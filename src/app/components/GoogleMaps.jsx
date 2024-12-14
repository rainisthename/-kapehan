"use client"; // Add this to use the hook in Next.js

import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const MapComponent = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBBk1ScAHRBt96t8aCT2h-hx3lKbiFUwhw", // Replace with your Google Maps API Key
  });

  const center = {
    lat: lat,
    lng: lng,
  };

  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank"); // Opens in new tab
  };
  const mapOptions = {
    disableDefaultUI: true,  // Disables all default UI controls
    zoomControl: false,      // Disables the zoom control
    scrollwheel: false,      // Disables zoom with scroll wheel
    draggable: false,        // Disables dragging the map
    gestureHandling: 'none', // Disables gestures (including pinch to zoom)
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
    <GoogleMap
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={center}
      zoom={18}  // Set zoom dynamically based on state
      options={mapOptions} // Apply the custom map options
    >
      <Marker position={center} />
    </GoogleMap>
  </div>
  );
};

export default MapComponent;
