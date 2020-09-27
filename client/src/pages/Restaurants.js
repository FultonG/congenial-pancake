import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import API from '../apiService';

import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const PageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    // margin: 1rem 4rem;  
    overflow-x: hidden;
    
`;

const List = styled.ul(() => `
    list-style-type: none;
    width: 40%;
    height: 100vh;
    padding-left: 0;
    float: left;
    padding: 15px 25px;
    overflow-y: auto;
    margin: 0;

    /* width */
    &::-webkit-scrollbar {
        // width: 7px;
        display: none;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        // background: #f3f3f3;
        background: none;
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

const ListItem = styled.li(({hoverScale=true, selected, cursor='normal'}) => `
    width: 100%;
    padding: 10px;
    border-top: 1px solid #9fe9ff;
    border-bottom: 1px solid #9fe9ff;
    display: flex;
    flex-direction: column;
    transition: transform .4s;
    background: ${selected ? "linear-gradient(90deg, rgba(162,212,217,0.15) 0%, rgba(0,212,255,0.15) 100%)" : "inherit"};
    cursor: ${cursor};
    &:hover {
        // box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        // background-color: rgba(255, 153, 43, 0.10);
        background: linear-gradient(90deg, rgba(162,212,217,0.1) 0%, rgba(0,212,255,0.1) 100%);
        transform: ${hoverScale ? "scale(1.03)" : "scale(1)"};
      }
`
);

const TemplatePicture = styled.div`
    width: 40px;
    height: 40px;
    background-color: #cecece;
    border-radius: 10px;
    margin: 10px;
`;

const DetailContainer = styled.div`
    width: 60%;
    height: 100vh;
    float: right;
    padding: 15px 25px;
    overflow-y: auto;
    margin: 0;

    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

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
    // background: #888;
    background: none;
    border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`;

const Header = styled.h1((fontSize=18) => `
    font-size: ${fontSize};
`)

const TemplateMap = styled.div`
    background-color: #cecece;
    border-radius: 10px;
    min-width: 150px;
    min-height: 150px;
    margin: 25px 0px;
`;

const Restaurants = () => {
    const [selected, setSelected] = useState(null);
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            let res = await API.getAllVendors();
            setSelected(res[0])
            setVendors(res);
        };

        fetchRestaurants();
    }, []);

    return (
        <PageContainer>
            <List>
                <div>               
                    <Header>Restaurants</Header>
                    {vendors.map((rest, index) => {
                        return (
                            <ListItem key={index} onClick={() => setSelected(vendors[index])} selected={rest.name === selected.name}>
                                <h3 style={{fontWeight: 600, margin: 0, marginBottom: 10}}>{rest.name}</h3>
                                <div style={{display: 'flex', alignItems: 'flex-start', width: "50%"}}>
                                    <TemplatePicture style={{marginLeft: 0}}/>
                                    <TemplatePicture />
                                    <TemplatePicture />
                                    <TemplatePicture />
                                </div>
                                <div>{rest.address}</div>
                                
                            </ListItem>
                        )
                    })}
                 </div>
            </List>

            {selected &&
            <DetailContainer style={{float: 'right'}}>
                <Header>{selected.name}</Header>
                <div>
                    <TemplateMap />
                    <div>{selected.address}</div>
                </div>
                
                <Header fontSize={14}></Header>
                <hr />
                <h3>Menu</h3>
                <Menu items={selected.menu}/>

            </DetailContainer>
            }
    
        </PageContainer>
        )
}

const QuantityInput = styled.input`
    display: grid;
    place-items: center;
    // background: white;
    background: inherit;
    font-size: 14px;
    font-weight: 600;
    border: none;
    height: 30px;
    width: 30px;
    line-height: 15px;
    padding-left: 8px;
    padding-top: 5px;
    border-radius: 15px;
    &:hover {
    }
    &::-webkit-inner-spin-button, 
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none;
    }
    &:focus: {
        border: none;
    }
`;
const QuantityStep = styled.span`
    display: grid;
    place-items: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 12px;
    border: none;
    height: 24px;
    width: 24px;
    margin: 0px 10px;
    border-radius: 25px;
    cursor: pointer;
    &:hover {
        background: linear-gradient(90deg, rgba(162,212,217,0.2) 0%, rgba(0,212,255,0.2) 100%);
        font-weight: 800;
    }
    &:focus {
        background: linear-gradient(90deg, rgba(162,212,217,0.25) 0%, rgba(0,212,255,0.25) 100%);
    }
`;

const MenuItemHeader = styled.h3`
    font-weight: 600;
    margin: 0;
    margin-bottom: 10px;
    width: auto;
    float: left;   
`;

const MenuItemAmount = styled.span`
    display: inline;
    color: #ABABAB;
    font-size: 16px;
    font-weight: 400;
    float: right;
`;

const MenuContainer = styled.div`
    // overflow-y: auto;
    // overflow-x: hidden;
    margin: 0;
    // height: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

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

const Menu = ({ items }) => {
    let history = useHistory();

    const [cart, setCart] = useState({});

    function initCart() {
        let cartItems = {};

            for(const key in items) {
            cartItems[key] = 0;            
        }

        setCart(cartItems);

    }
    useEffect(() => initCart(), []);
    useEffect(() => initCart(), [items])

    function updateQuantity(e, key, direction) {
        let quantity = cart[key];
        switch(direction) {
            case "+": 
                quantity++;
            break;
            case "-": 
                quantity--;
            break;
        }

        setCart(prev => ({...prev, [key]: quantity}));
    }  
    
    function returnMenu() {
        let menuItems = [];
        for(const key in items) {
            
            let item = items[key];
            menuItems.push((
                <ListItem key={key} hoverScale={false}>
                        <div className="header">
                            <MenuItemHeader>{key}</MenuItemHeader>
                            <MenuItemAmount >${item.amount}</MenuItemAmount>
                        </div>
                        <div>{item.description}</div>
                        <div className="quantity" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <QuantityStep onClick={(e) => updateQuantity(e, key, '-')}>-</QuantityStep>
                            <QuantityInput type="number" readOnly min={0} max={10} value={cart[key]}/>
                            <QuantityStep onClick={(e) => updateQuantity(e, key, '+')}>+</QuantityStep>
                        </div>
                            
                </ListItem>
            ))
        }
        return menuItems;
        
    }

    function goToCheckout() {
        history.push('/checkout', { cart: cart, menu: items} );
    }

    return (
        <MenuContainer>
            <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                
            {returnMenu()}
            </ul>
            <CartCheckout itemsInCart onCheckout={goToCheckout}/>
            <div style={{height: '45px'}}></div>
        </MenuContainer> 
    )
}

const CartCard = styled.div(({ showCard=false}) => `
    display: flex;
    // width: 90%;
    width: 35%;
    height: 40px;
    min-height: 30px;
    padding: 4px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background: white;
    margin-bottom: ${!showCard ? "-40px" : "5px"};
    position: fixed;
    bottom: 0;
    transition: margin 1s;
`);

const InnerCard = styled.div`
    background: linear-gradient(90deg, rgba(162,212,217,0.6) 0%, rgba(0,212,255,0.8) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #2875ac;

    font-weight: bold;
    text-transform: uppercase;

`;

const CartButton = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover: {

    }
`;

const CartCheckout = ({ itemsInCart, onCheckout }) => (
    <CartButton onClick={(e) => onCheckout(e)}>
        <CartCard showCard={itemsInCart}>
            <InnerCard>
                Checkout <FaShoppingCart style={{margin: '0px 5px'}}/>
            </InnerCard>
        </CartCard>
    </CartButton>
    
)

export default Restaurants;