import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import poly from './polygon.json';

function App() {
  const [markers, setMarkers] = useState([]);

  const setColor = ({ properties }) => {
    return { weight: 1 };
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

  return (
    <MapContainer center={[41.017860343158034, 28.997707316618385]} zoom={13}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={poly} style={setColor} />
      <AddMarkerToClick />

      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.latlng}>
          <Popup>
            Marker {marker.id} <br /> Location: {marker.latlng[0]}, {marker.latlng[1]}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
