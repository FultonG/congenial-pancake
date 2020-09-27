import React, {useState} from 'react';
import { FormContainer, Form, Input, ButtonContainer } from '../components/Form';
import Button from '../components/Button';
import API from '../apiService';
import { useHistory } from "react-router-dom";

const initialUserData = {
  username: "",
  password: ""
}

const LoginPage = () => {
  const [userData, setUserData] = useState(initialUserData);

  
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
      let res = await API.loginUser(userData);
      if(res) {
        localStorage.setItem("userJWT", res.token);
        localStorage.setItem("isVendor", true)
        if(res.vendorName) {
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

  return (
    <FormContainer>
      <Form onSubmit={submitUser}>
        <h1>Login</h1>
        <Input placeholder="Username" value={userData.username} onChange={(e) => updatePayload('username', e.currentTarget.value)}></Input>
        <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => updatePayload('password', e.currentTarget.value)}></Input>

        <ButtonContainer>
          <a style={{alignSelf: 'center', margin: '32px 16px'}} href="/register">Don't have an account? Click here.</a>
          <Button type="submit">Login</Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  )
}

export default LoginPage;