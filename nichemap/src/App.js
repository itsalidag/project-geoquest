import './App.css';
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function App() {
  return (
     <MapContainer center={[41.017860343158034, 28.997707316618385]} zoom={13}>>
       <TileLayer 
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       />
     </MapContainer>
  );
}

export default App;
