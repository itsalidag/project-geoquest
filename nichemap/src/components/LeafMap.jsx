import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style/LeafMap.css'; // Create a separate CSS file for styling if needed
import poly from '../hexagons.json';
import React, { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import './style/LeafMap.css';
import L from 'leaflet'; // Import Leaflet library
import iconUrl from "../pin.png";

const LeafMap = ({ selectedCity, isSubmitted }) => {
    const [markers, setMarkers] = useState([]);
    const setColor = (feature) => {
      const shoppingScore = feature.properties.color_code;
      
      return { color: shoppingScore, weight: 0.2 };
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

  const [geojsonData, setGeojsonData] = useState(null);

  const fetchGeoJSON = async () => {
        try {
          console.log(selectedCity)
          const body = JSON.stringify({ city: selectedCity, function: ["shopping"] }); // Replace with your desired city and function
          const response = await fetch('http://127.0.0.1:5000/score_hexagons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
          });
          const data = await response.json();
          setGeojsonData(data);
        } catch (error) {
          console.error('Error fetching GeoJSON:', error);
        }
      };
  useEffect(() => {
      if (isSubmitted) {
        fetchGeoJSON(selectedCity);
      }
  }, [selectedCity, isSubmitted]);
  return (
    <>
    <MapContainer center={[39.38864867568084, 35.150886488581726]} zoom={6}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && <GeoJSON data={geojsonData} key={selectedCity} style={setColor}/>}
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
