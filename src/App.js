import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';
import './App.css';


function App() {
  const [center] = useState([50.6813617, 14.0078506]);

  const [position, setPosition] = useState([51.505, -0.09]);

  const handleClick = (e) => {
    setPosition(e.latlng);
  };

  return (
    <div className="App">

    <div className="rightPanel">

    </div>


    <MapContainer center={center} zoom={2} className="leaflet-container" onClick={handleClick}>
      <useMap onClick={(e) => setPosition([e.latlng.lat, e.latlng.lng])}>
        <TileLayer
          url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          //url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png'
          attribution= 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
        <Marker position={position} />
        </useMap>
    </MapContainer>
  
    </div>
  );
}

export default App;
