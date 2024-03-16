import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style/LeafMap.css'; // Create a separate CSS file for styling if needed
import poly from '../hexagons.json';
import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import './style/LeafMap.css';
import L from 'leaflet'; // Import Leaflet library
import iconUrl from "../pin.png";

const LeafMap = () => {
    const [markers, setMarkers] = useState([]);

    const setColor = (feature) => {
      const shoppingScore = feature.properties.shopping_score;
      let color;
      // Define your color scale or logic here based on shopping_score value
      if (shoppingScore >= 0 && shoppingScore < 20) {
          color = '#f48c06'; // Red for low scores
      } else if (shoppingScore >= 20 && shoppingScore < 40) {
          color = '#dc2f02'; // Orange for moderate scores
      } else if (shoppingScore >= 40 && shoppingScore < 60) {
          color = '#9d0208'; // Yellow for medium scores
      } else if (shoppingScore >= 60 && shoppingScore < 80) {
          color = '#6a040f'; // Green for high scores
      } else {
          color = '#370617'; // Bright green for very high scores
      }
      return { color: color, weight: 1 };
  };

    const AddMarkerToClick = () => {
        const map = useMapEvents({
          click: (e) => {
            const newMarker = {
              id: markers.length + 1,
              latlng: [e.latlng.lat, e.latlng.lng],
            };
    
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          },
        });
    
        return null;
      };
  
    // Define custom icon
    const customIcon = L.icon({
        iconUrl: iconUrl, // Path to your custom icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32] // Popup anchor point relative to the icon
    });

  return (
    <>
    <MapContainer center={[41.017860343158034, 28.997707316618385]} zoom={11}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={poly} style={setColor} />
      <AddMarkerToClick />

                {markers.map((marker) => (
        <Marker key={marker.id} position={marker.latlng} icon={customIcon}>
          <Popup>
            Marker {marker.id} <br /> Location: {marker.latlng[0]}, {marker.latlng[1]}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
};

export default LeafMap;
