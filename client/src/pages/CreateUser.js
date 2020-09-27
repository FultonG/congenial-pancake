import React, {useState} from 'react';
import { FormContainer, Form, Input, ButtonContainer } from '../components/Form';
import Button from '../components/Button';
import API from '../apiService';

const initialUserData = {
  username: "",
  password: "",
  first_name : "",
  last_name: "",
  address: {
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      zip: ""
  }
}

const CreateUser = () => {

  const [userData, setUserData] = useState(initialUserData);

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
      let res = await API.createUser(userData);
      console.log(res);
    } catch(e) {
      console.log(e.message);
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitUser}>
        <h1>Create a User</h1>
        <Input placeholder="Username" value={userData.username} onChange={(e) => updatePayload('username', e.currentTarget.value)}></Input>
        <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => updatePayload('password', e.currentTarget.value)}></Input>
        <Input placeholder="First Name" value={userData.first_name} onChange={(e) => updatePayload('first_name', e.currentTarget.value)}></Input>
        <Input placeholder="Last Name" value={userData.last_name} onChange={(e) => updatePayload('last_name', e.currentTarget.value)}></Input>
        <Input placeholder="Street Number" value={userData.address.street_number} onChange={(e) => updatePayload('street_number', e.currentTarget.value, true)}></Input>
        <Input placeholder="Street Name" value={userData.address.street_name} onChange={(e) => updatePayload('street_name', e.currentTarget.value, true)}></Input>
        <Input placeholder="City" value={userData.address.city} onChange={(e) => updatePayload('city', e.currentTarget.value, true)}></Input>
        <Input placeholder="State" value={userData.address.zip} onChange={(e) => updatePayload('zip', e.currentTarget.value, true)}></Input>
        <ButtonContainer>
          <Button type="submit">Create</Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  )
}

export default CreateUser;