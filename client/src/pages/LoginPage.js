import React, {useState} from 'react';
import { FormContainer, Form, Input, ButtonContainer } from '../components/Form';
import Button from '../components/Button';
import API from '../apiService';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const initialUserData = {
  username: "",
  password: ""
}

const LoginPage = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [userType, setUserType] = useState("customer");
  
  const history = useHistory();

  const updatePayload = (attr, value, isAddress = false) => {
    if(isAddress){
      setUserData(prev => ({...prev, address: {...prev.address, [attr]: value } }))
    } else {
      setUserData(prev => ({...prev, [attr]: value}));
    }
  }

  const submitUser = async (e) => {
    try {
      e.preventDefault();
      
      let res = userType =="customer" ? await API.loginUser(userData) : await API.loginVendor(userData);
      if(res) {
        console.log(res);
        localStorage.setItem("userJWT", res.token);
        localStorage.setItem("user", JSON.stringify(userType == "vendor" ? res.vendor : res.user))
        localStorage.setItem("isVendor", userType == "vendor")
        if(userType == "vendor") {
          history.push("/vendor");
        }
        else {
          history.push("/restaurants");
        }
      }
    } catch(e) {
      console.log(e.message);
    }
  }

  function handleUserChange(e) {
    console.log(e.target.value);

    setUserType(e.target.value);
  }
  return (
    <FormContainer>
      <Form onSubmit={submitUser}>
        <h1>Login</h1> 
      
        <Input placeholder="Username" value={userData.username} onChange={(e) => updatePayload('username', e.currentTarget.value)}></Input>
        <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => updatePayload('password', e.currentTarget.value)}></Input>
        <Input as="select" onChange={(e) => handleUserChange(e)}>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
      </Input>
        <ButtonContainer>
          <a style={{alignSelf: 'center', margin: '32px 16px'}} href="/register">Don't have an account? Click here.</a>
          <Button type="submit">Login</Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  )
}

export default LoginPage;