import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import {Icon} from 'leaflet';
import { RotatingLines } from 'react-loader-spinner';
const position = [22.5937, 78.9629]


const customIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [33, 45],
  iconAnchor:[17,46],
  popupAnchor:[3,-46]

})

const modifyDescription = (description) => (


 description.charAt(0).toUpperCase() + description.slice(1)

)
// The map function will return the component
function Map({pageNum}) {
  // The useEffect function will fetch the data from the API we created and store it in the variable Backend Data
    useEffect(()=>{
        fetch(`/api?page=${pageNum}&limit=10`).then(
          response => response.json()
        ).then(
          data=>{
            setBackendData(data)
          }
        )

      },[pageNum])
      const [backendData,setBackendData]=useState([{}]);

  return (
    
   <div id="map" className='map'>
       
       {(backendData.currentPage!=pageNum)?(
        <div id="loader" className='loader'>
        <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={backendData.currentPage!=pageNum}
/>
        </div>    
    ):(  <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

     {backendData.users && backendData?.users.map((user,i)=>(
        <Marker position={[parseFloat(user.lat),parseFloat(user.long)]} icon={customIcon} >
    <Popup>
      <p key={i}><b>City:</b> {modifyDescription(user.city)}
        <br/>
        <b>Temperature:</b> {user.temp}
        <br/>
        <b>Description:</b> {modifyDescription(user.des)}
        </p>
    </Popup>
  </Marker>
     ))
     }
</MapContainer> )}

      

  </div>
  )
    }
export default Map