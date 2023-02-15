import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents, Polyline} from 'react-leaflet';
import * as L from "leaflet";
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

  const [result, setResult] = useState(false);

//výpočet vzdálenosti
/*
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Poloměr Země v kilometrech
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const totalDistance = getDistance(latlngs[0][0], latlngs[0][1], latlngs[1][0], latlngs[1][1]);

const distanceInKm = L.GeometryUtil.readableDistance(totalDistance * 1000, true);
*/
//end

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
      setResult(true);
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

  

  return (
    <div className="App">

    <div className="rightPanel">
      <h1 className="title">Loklaizace</h1>
      <h1>Najdi na mapě:</h1>
      <Task 
      title = "Null island"
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

      <button className="btn-primary" onClick={Zkontrlovatbtn}>Zkontrolovat</button>
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
