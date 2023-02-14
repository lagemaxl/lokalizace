import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet';
import './App.css';


function App() {
  const [center] = useState([50.6813617, 14.0078506]);

  const [position, setPosition] = useState([51.505, -0.09]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return false;
}
  

  return (
    <div className="App">

    <div className="rightPanel">
      <h1>Loklaizace</h1>
    </div>


    <MapContainer center={center} zoom={2} className="leaflet-container">
        <TileLayer
          url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          //url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png'
          attribution= 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents />

        <Marker position={position} />
    </MapContainer>
  
    </div>
  );
}

export default App;
