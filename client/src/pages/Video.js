import React, { useEffect, useRef } from 'react';
import ApiService from '../apiService';
import Button from '../components/Button';
import Card from '../components/Card';
import { OrderContainer, VideoPlayer } from './VideoStyles';

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
  }, [constraints])

  const handleClick = (e) => {
    const { clientHeight, clientWidth } = videoRef.current;
    canvasRef.current.height = clientHeight;
    canvasRef.current.width = clientWidth;
    canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);
    const url = canvasRef.current.toDataURL()
    var blobBin = atob(url.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });
    ApiService.sendScreenshot(file).then(res => {
      console.log(res);
    })
      .catch(err => {
        console.log("it fucked up", err);
      })
  }

  return (
    <>
      <OrderContainer>
          <VideoPlayer ref={videoRef} autoPlay muted ></VideoPlayer>
          <canvas ref={canvasRef} style={{ display: 'none', borderRadius: '10px', width: '45%', margin: '1%' }}></canvas>
        <Card direction="column" padding="10%" width="45%" margin='1%'></Card>
      </OrderContainer>
      <div>
        <Button onClick={handleClick}>click</Button>
      </div>
    </>

  )
}

export default Video;