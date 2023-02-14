import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents, Polyline} from 'react-leaflet';
import './App.css';


function Task(props){
  return(
    <div className="task">
      <h2 className="placeTOfind">{props.title}</h2>
      <div className="correct-bar"></div>
    </div>
  )
}


function App() {

  const [center] = useState([50.6813617, 14.0078506]);
  const [position, setPosition] = useState([50.6813617, 14.0078506]);
  const [rightposition] = useState([0, 0]);
  let positions = [position, rightposition];

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        setPosition([e.latlng.lat, e.latlng.lng]);
        positions = [position, rightposition];
      },
    });
    return false;
}

    function Zkontrlovatbtn(){
      console.log("Zkontrolovats");  
    }
  

  return (
    <div className="App">

    <div className="rightPanel">
      <h1 className="title">Loklaizace</h1>
      <h1>Najdi na mapě:</h1>
      <Task 
      title = "Praha"
      />
      <h1>Další v pořadí:</h1>
      <Task 
      title = "Praha"
      />
            <Task 
      title = "Praha"
      />
            <Task 
      title = "Praha"
      />
            <Task 
      title = "Praha"
      />

      <button className="btn-primary" onClick={Zkontrlovatbtn()}>Zkontrolovat</button>
    </div>


    <MapContainer center={center} zoom={2} className="leaflet-container">
        <TileLayer
          //url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png'
          noWrap={true}
          attribution= 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents />
        
        <Marker position={rightposition}/>
        <Marker position={position} />
        <Polyline positions={positions} color={'blue'} />
    </MapContainer>
  
    </div>
  );
}

export default App;
