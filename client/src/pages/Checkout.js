import React, { useEffect, useRef } from 'react';
import ApiService from '../apiService';
import { FormContainer, Form, Input, ButtonContainer} from '../components/Form';
import Card from '../components/Card';

const Checkout = () => {


  return (
    <FormContainer>
        <Form>
            <Input placeholder="First Name" />
        </Form>
    </FormContainer>
  )
}

export default Checkout;