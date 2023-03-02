import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents, Polyline} from 'react-leaflet';
import * as L from 'leaflet';
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
  const [MouseFree, setMouseFree] = useState(true);
  const [result, setResult] = useState(false);
  const [resultnum, setResultnum] = useState(0)
  const [locations, setLocations] = useState([]); //lokace které se budou brát z JSON soubo

  useEffect(() => {
    fetch("locations.json")
      .then(response => response.json())
      .then(data => setLocations(data.animals))
      .catch(error => console.error(error));
  }, []);





  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        if(MouseFree){
          setPosition([e.latlng.lat, e.latlng.lng]);
        }
        positions = [position, rightposition];
      },
    });
    return false;
}

    function Zkontrlovatbtn(){
      setResult(true);
      setMouseFree(false);
      const res = Distance(position[0], position[1], rightposition[0], rightposition[1])
      console.log(res);
      setResultnum(res.toFixed(1))
    }

    function Result() {

      return(
        <>
        <Marker position={rightposition} className="marker"
                  icon={
                    new L.Icon({
                      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png`,
                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41]
                    })
                  }
        />
        <Polyline positions={positions} color={'blue'}/>
        </>
      )
    }


    function Distance(lat1, lon1, lat2, lon2) {
      const earthRadiusKm = 6371;
    
      const dLat = degreesToRadians(lat2 - lat1);
      const dLon = degreesToRadians(lon2 - lon1);
    
      const lat1Rad = degreesToRadians(lat1);
      const lat2Rad = degreesToRadians(lat2);
    
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      return earthRadiusKm * c;
    }
    
    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }
    

    

  return (
    <div className="App">

    <div className="rightPanel">
      <h1 className="title">Loklaizace</h1>
      <h1>Najdi na mapě:</h1>
      <Task 
      title = {locations[1].name}
      />
      <h1>Další v pořadí:</h1>
      <Task 
      title = "Praha"
      />
            <Task 
      title = "Ústí nad Labem"
      />
            <Task 
      title = "Hell"
      />
            <Task 
      title = "Peklo"
      />

      <button className="btn-primary" onClick={Zkontrlovatbtn}>Zkontrolovat</button>

      <div>
        <h1 className="title">Vzdálenost: {resultnum} km</h1>
        <h1 className="title">Počet bodů za tohle kolo: 0</h1>
        <h1 className="title">Celkový počet bodů: 0</h1>
      </div>


    </div>


    <MapContainer center={center} zoom={2} className="leaflet-container">
        <TileLayer
          //url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png'
          noWrap={true}
          attribution= 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents />
        
        <Marker position={position} />

        {result ? <Result/> : <></>}


    </MapContainer>
  
    </div>
  );
}

export default App;

      /*
      <div>
        <h1 className="title">Vzdálenost: {reskm} km</h1>
        <h1 className="title">Počet bodů za tohle kolo: 0</h1>
        <h1 className="title">Celkový počet bodů: 0</h1>
      </div>
      */

      /*
            <div>
      {animals.map(animal => (
        <div key={animal.name}>
          <h2>{animal.name}</h2>
          <p>Value 1: {animal.value1}</p>
          <p>Value 2: {animal.value2}</p>
        </div>
      ))}
    </div>
    */