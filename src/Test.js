import React, { useState, useEffect,useRef } from 'react' ;
import axios from 'axios';
import './index.css';
import Webcam from 'react-webcam' ;
function Test() {
  const webcamRef = useRef(null) ;
  const[name, setName] = useState('')
  const videoConstraints = {
    width : 200,
    height : 200,
    facingMode: 'user'
  };
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(`imageSrc = ${imageSrc}`)
                  //for deployment, you should put your backend url / api
      axios.post('http://127.0.0.1:5000/api', {data : imageSrc})
          .then(res => {
            console.log(`response = ${res.data}`)
            setName(res.data)
      })
          .catch(error => {
            console.log(`error = ${error}`)
      })
    }, 
     [webcamRef]
    );
  return (
    <div>
    <Webcam
     audio = {false}
	 height = {100}
	 ref = {webcamRef}
	 screenshotFormat = "image/jpeg"
	 width = {150}
	 videoConstraints = {videoConstraints}
	/>
    <button onClick={capture}>Click to Verify</button>
	<h2>{name}</h2>
  </div>
  );
}

export default Test;
