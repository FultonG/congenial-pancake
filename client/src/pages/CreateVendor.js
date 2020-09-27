import React, {useState} from 'react';
import { FormContainer, Form, Input, ButtonContainer } from '../components/Form';
import Button from '../components/Button';
import API from '../apiService';
import Modal from 'react-modal';

const initialVendorData = {
  vendorName: "",
  password: "",
  username : "",
  name: "",
}

const CreateUser = () => {

  const [vendorData, setVendorData] = useState(initialVendorData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState('');

  const updatePayload = (attr, value) => {
    setVendorData(prev => ({...prev, [attr]: value}));
  }

  const submitUser = async (e) => {
    try {
      e.preventDefault();
      let res = await API.createVendor(vendorData);
      console.log(res);
    } catch(e) {
      setError(e.message);
      toggleModal();
    }
  }

  const toggleModal = () => {
    setModalIsOpen(prev => !prev);
  }

  return (
    <FormContainer>
      <Form onSubmit={submitUser}>
        <h1>Create a User</h1>
        <Input placeholder="Vendor Name" value={vendorData.vendorname} onChange={(e) => updatePayload('vendorName', e.currentTarget.value)}></Input>
        <Input placeholder="Password" type="password" value={vendorData.password} onChange={(e) => updatePayload('password', e.currentTarget.value)}></Input>
        <Input placeholder="User Name" value={vendorData.username} onChange={(e) => updatePayload('username', e.currentTarget.value)}></Input>
        <Input placeholder="Name" value={vendorData.name} onChange={(e) => updatePayload('name', e.currentTarget.value)}></Input>
        <ButtonContainer>
          <Button type="submit">Create</Button>
        </ButtonContainer>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Error"
        >
          <button onClick={toggleModal}>close</button>
          ({error & <div>{error}</div>})
        </Modal>
      </Form>
    </FormContainer>
  )
}

export default CreateUser;