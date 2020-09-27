import React from 'react';
import Card from '../components/Card';
import {useLocation, useHistory} from 'react-router-dom';

const OrderStatus = () => {
  let location = useLocation();
  let history = useHistory();
  if(location.state == undefined){
    return history.push('/restaurants');
  }
  return (
    <Card>
      <h2>Order Status: {location.state.order.status}</h2>
    </Card>
  )
}

export default OrderStatus;