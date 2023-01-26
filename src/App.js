import React,{useState,useEffect} from 'react';

import 'leaflet/dist/leaflet.css';
import  Map from './Map.js';




function App() {
const [count, setCount] =useState(1);
const [isNextDisabled, setIsNextDisabled] =useState(count === 3);
const [isPreviousDisabled, setIsPreviousDisabled] =useState(count === 1);
useEffect(()=>{
  setIsNextDisabled(count ===  3);
  setIsPreviousDisabled(count === 1);

},[count])
  return (
 <div id="content" className='content'>
    <div id="header" className='header'>Weather Map</div>
    <Map pageNum={count} ></Map>
    <div id="footer" className='footer'>
    <div class="page"><h2>Page No : {count}/3 </h2></div>
     <button type="button" onClick={()=> setCount(count - 1)} disabled={isPreviousDisabled}>PREVIOUS</button>
    <button type="button" onClick={()=> setCount(count + 1)} disabled={isNextDisabled}>NEXT</button>
    </div>
    </div>
    
   
  )
}

export default App
