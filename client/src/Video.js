import React, { useEffect, useRef } from 'react';
import ApiService from './apiService';
const Video = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const constraints = {
    video: {
      facingMode: 'user',
      height: { min: 360, ideal: 720, max: 1080 }
    },
    audio: true
  };

  useEffect(() => {
    const fetchMedia = async () => {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    }

    fetchMedia()
  }, [])

  const handleClick = (e) => {
    const {clientHeight, clientWidth} = videoRef.current;
    canvasRef.current.height = clientHeight;
    canvasRef.current.width = clientWidth;
    canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);  
    console.log(canvasRef.current.toDataURL());
    const url = canvasRef.current.toDataURL()
    ApiService.sendScreenshot(url).then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log("it fucked up", err);
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <video ref={videoRef} autoPlay muted></video>
      <div>
        <button onClick={handleClick}>click</button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Video;