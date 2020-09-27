import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import API from "../apiService";
import Modal from "react-modal";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { Receipt } from "../components/Receipt";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `;

  const List = styled.ul(
    () => `
    height: inherit;
    list-style-type: none;
    padding-left: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 0;

    &:hover {
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
`
  );

  const ListItem = styled.li(
    ({ hoverScale = true, selected, cursor = "normal" }) => `
    width: 100%;
    min-height: 75px;
    padding: 10px;
    border-top: 1px solid #9fe9ff;
    border-bottom: 1px solid #9fe9ff;
    display: flex;
    flex-direction: column;
    transition: transform .4s;
    background: ${
      selected
        ? "linear-gradient(90deg, rgba(162,212,217,0.15) 0%, rgba(0,212,255,0.15) 100%)"
        : "inherit"
    };
    cursor: ${cursor};
    &:hover {
        // box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        // background-color: rgba(255, 153, 43, 0.10);
        background: linear-gradient(90deg, rgba(162,212,217,0.1) 0%, rgba(0,212,255,0.1) 100%);
        transform: ${hoverScale ? "scale(1.03)" : "scale(1)"};
      }
`
  );

  const ItemContent = styled.div` 
    display: flex;
    flex-direction: column;
    margin-right: auto;
  `;
  const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 85%;
    overflow-y: auto;
  `;

  const ListPic = styled.div`
    height: 50px;
    width: 50px;
    background: gray;
    border-radius: 5px;
    margin-right: 25px;
  `;

  const FlexItem = styled.div(
    (direction = "row") => `
      display: flex;
      flex-direction: ${direction};
      justify-content: space-between;
`
  );
  
  const IconCircle = styled.div`
    display: grid;
    place-items: center;
    cursor: pointer;
    border-radius: 100%;
    margin: 32px 16px;
    height: 50px;
    width: 50px;
    transition: transform 0.5s;
    transform: scale(0.95);
    &:hover {
        transform: scale(1);
        background-color: #cecece;
    }
  `;

const initialCheckoutData = {
  account_id: "",
  merchant_id: "",
  amount: 0,
};

function getSubtotal(list) {
    let subtotal = 0;
    list.forEach(item => subtotal += item.price * item.quantity);
    return subtotal.toFixed(2);    
}

function getTax(amt) {
    return (amt * 0.07).toFixed(2);
}

function getTotal(list) {
    const subtotal = parseFloat(getSubtotal(list));
    const tax = parseFloat(getTax(subtotal));
    return parseFloat((subtotal + tax).toFixed(2));

}
const Checkout = ({ }) => {
  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  let location = useLocation();
  let history = useHistory();
  useEffect(() => {
    //Set new list of items for order receipt
    const newList = [];
    for(const key in location.state.cart) {
        newList.push({
            name: key,
            quantity: location.state.cart[key],
            price: location.state.menu[key].amount
        })
    }

    setList(newList);
    
    checkoutData.amount = getTotal(newList);
    // Set merchant/account id info here
    checkoutData.merchant_id = location.state.vendor.merchant_id;
    checkoutData.vendorName = location.state.vendor.vendorName;
    checkoutData.order = location.state.cart;
  }, []);

  const submitCheckout = async (e) => {
    try {
      e.preventDefault();
      let res = await API.checkout(checkoutData);
      history.push('/status', {...res}); 
    } catch (e) {
      setError(e.message);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Receipt>
        <h1>Order Confirmation</h1>
        <Content>
          <List>
            {list.map((item, index) => {
                return (
                <ListItem hoverScale={false} key={index}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <ListPic />
                  <ItemContent>
                    <b>{item.name}</b>
                    <div>Qty: {item.quantity}</div>
                  </ItemContent>
                  <div>${item.price * item.quantity}</div>
                </div>
              </ListItem>
  
            )} )}
          </List>
          <hr />
          <div>
            <FlexItem>
              <b>Subtotal</b>
              <span>${getSubtotal(list)}</span>
            </FlexItem>
            <FlexItem>
              <b>Estimated Sales Tax</b>
              <span>${getTax(getSubtotal(list))}</span>
            </FlexItem>

            <FlexItem>
              <b>Total</b>
            <span>${getTotal(list)}</span>
            </FlexItem>
          </div>
          <hr />
          <div style={{display: 'flex', flexDirection: 'row'}}>
              <IconCircle onClick={() => history.push("/restaurants")}>
                <BiArrowBack />
              </IconCircle>
              <Button type="button" style={{flex: 1}} onClick={submitCheckout}>Place Order</Button>
          </div>
          
        </Content>
      </Receipt>
    </Container>
  );
};

export default Checkout;
