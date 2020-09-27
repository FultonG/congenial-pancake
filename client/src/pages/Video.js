import React, { useEffect, useRef, useState } from 'react';
import ApiService from '../apiService';
import Button from '../components/Button';
import Card from '../components/Card';
import { OrderContainer, VideoPlayer, PageTitle } from './VideoStyles';
import { BiUserCheck } from 'react-icons/bi';

import styled from "styled-components";
import API from "../apiService";

function getOrders(vendorName) {
  return API.getOrders(vendorName);
}

const Video = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [ordered, setOrdered] = useState([]);
  const [preparing, setPreparing] = useState([]);
  const [done, setDone] = useState([]);
  const [delivered, setDelivered] = useState([]);

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

  useEffect(() => {
    let v = JSON.parse(localStorage.getItem("user")).vendorName;
    getOrders(v).then(orders => {
      if (orders && orders.length > 0) {
        // setOrders(orders)
        setOrdered(orders.filter(order => order.status === 'ordered'));
        setPreparing(orders.filter(order => order.status === 'preparing'));
        setDone(orders.filter(order => order.status === 'done'));
        setDelivered(orders.filter(order => order.status === 'delivered'));

      }
    })


  }, [])

  const handlePolling = (e) => {
    const { clientHeight, clientWidth } = videoRef.current;
    canvasRef.current.width = clientWidth * 2;
    canvasRef.current.height = clientHeight * 2;
    canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);
    const url = canvasRef.current.toDataURL()
    var blobBin = atob(url.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });
    let vendorName = JSON.parse(localStorage.getItem("user")).vendorName;
    // setInterval(() => {
    ApiService.sendScreenshot(file, vendorName).then(res => {
      console.log(res.licenseTag);
      updateOrderArrival(res.licenseTag);
    })
      .catch(err => {
        console.log("it messed up", err);
      })
    // }, 1000 * 60)

  }


  function updateOrderArrival(licenseTag) {
    let found = null;
    found = ordered.findIndex(order => order.licenseTag == licenseTag);
    if (found) {
      setOrdered((prev) => {
        let arr = prev.slice();
        arr[found].arrived = true;
        return arr;
      });
      return;
    }


    found = preparing.findIndex(order => order.licenseTag == licenseTag);
    if (found) {
      setPreparing((prev) => {
        let arr = prev.slice();
        arr[found].arrived = true;
        return arr;
      });
      return;
    }


    found = done.findIndex(order => order.licenseTag == licenseTag);
    if (found) {
      setDone((prev) => {
        let arr = prev.slice();
        arr[found].arrived = true;
        return arr;
      });
      return;
    }


    found = delivered.findIndex(order => order.licenseTag == licenseTag);
    if (found) {
      setDelivered((prev) => {
        let arr = prev.slice();
        arr[found].arrived = true;
        return arr;
      });
      return;
    }

  }

  function handleDrag(id, fromStatus, toStatus) {
    let index = null, found = null;
    console.log(id, fromStatus, toStatus)
    switch (fromStatus) {
      case "ordered":
        index = ordered.findIndex(order => order._id == id);
          index = ordered.findIndex(order => order._id == id); 
        index = ordered.findIndex(order => order._id == id);
        found = ordered[index];
        setOrdered((prev) => {
          return prev.filter(item => item._id !== id)
        });

        break;
      case "preparing":
        index = preparing.findIndex(order => order._id == id);
          index = preparing.findIndex(order => order._id == id); 
        index = preparing.findIndex(order => order._id == id);
        found = preparing[index];
        setPreparing((prev) => {
          return prev.filter(item => item._id !== id)
        });
        break;
      case "done":
        index = done.findIndex(order => order._id == id);
          index = done.findIndex(order => order._id == id); 
        index = done.findIndex(order => order._id == id);
        found = done[index];
        setDone((prev) => {
          return prev.filter(item => item._id !== id)
        });
        break;
      case "delivered":
        index = delivered.findIndex(order => order._id == id);
          index = delivered.findIndex(order => order._id == id); 
        index = delivered.findIndex(order => order._id == id);
        found = delivered[index];
        setDelivered((prev) => {
          return prev.filter(item => item._id !== id)
        });
        break;

    }

    switch (toStatus) {
      case "ordered":
        setOrdered((prev) => {
          return [...prev, found];
        });

        break;
      case "preparing":
        setPreparing((prev) => {
          return [...prev, found];
        });
        break;
      case "done":
        setDone((prev) => {
          return [...prev, found];
        });
        break;
      case "delivered":
        setDelivered((prev) => {
          return [...prev, found];
        });
        break;

    }
  }

  return (
    <>
      <OrderContainer>
        <VideoPlayer ref={videoRef} autoPlay muted ></VideoPlayer>
        <canvas style={{borderRadius: "10px", width: "45%", margin: "1%"}}  ref={canvasRef}></canvas>
      </OrderContainer>
      <Card style={{ position: 'absolute', bottom: 0, height: '55%', display: 'flex', alignItems: 'flex-start', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', flexGrow: 1, height: '100%' }}>
          <Column>
            <h3>Ordered</h3>
            <ColumnCardList orders={ordered} status="ordered" onDrag={handleDrag} />
          </Column>
          <Column>
            <h3>Preparing</h3>
            <ColumnCardList orders={preparing} status="preparing" onDrag={handleDrag} />
          </Column>
          <Column>
            <h3>Done</h3>
            <ColumnCardList orders={done} status="done" onDrag={handleDrag} />
          </Column>
          <Column>
            <h3>Delivered</h3>
            <ColumnCardList orders={delivered} status="delivered" onDrag={handleDrag} />
          </Column>
        </div>
        <Button onClick={handlePolling}>Click</Button>
      </Card>
    </>

  )
}

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0px 16px;
`;

const ColumnList = styled.div`
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &:hover: {
    overflow-y: auto;
  }

  /* width */
  &::-webkit-scrollbar {
      width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
      background: #f3f3f3;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
  background: #555;
  }
`;

const ColumnCard = styled.div(({ arrived = false, delivered = false }) => `
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  min-height: 150px;
  margin: 4px;
  padding: 8px 16px;
  background: ${arrived ? (delivered ? 'rgba(14, 193, 14, 33%)' : 'rgba(203,185,13,33%)') : 'white'};

`);

const ColumnCardList = ({ orders, status, onDrag }) => {
  const handleDrop = (e) => {
    let id = e.dataTransfer.getData("id");
    let fromStatus = e.dataTransfer.getData("fromStatus");
    onDrag(id, fromStatus, status);

    //replace with state change
    // props.dispatch({type: 'move', payload: {next: status, id}})

  }
  return (
    <ColumnList onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {orders.map((order, index) => (
        <DraggableCard key={order._id} {...order} status={status} />
      ))}
    </ColumnList>
  )
}

function getOrderDetails(order) {
  let arr = [];
  for (const key in order) {
    arr.push({
      name: key,
      quantity: order[key]
    })
  }
  return (
    arr.map((item, index) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
        <b style={{ overflowWrap: 'anywhere' }}>{item.name}</b>
        <span>x{item.quantity}</span>
      </div>
    ))
  )
}
const DraggableCard = ({ _id, order, status, arrived }) => {
  const handleOnDragStart = (e) => {
    e.dataTransfer.setData("id", _id);
    e.dataTransfer.setData("fromStatus", status);
  }
  return (
    <ColumnCard draggable onDragStart={handleOnDragStart} arrived={arrived} delivered={status == "delivered"}>
      <div style={{ float: 'right', display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {arrived ? 'Arrived' : 'Not Arrived'}
        <BiUserCheck size={20} style={{ marginLeft: 10 }} />
      </div>
      <h4>Order #{_id}</h4>
      {getOrderDetails(order)}

    </ColumnCard>
  )
}
export default Video;