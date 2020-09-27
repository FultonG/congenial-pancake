import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Form = styled.form`
  width: 50%;
  border-radius: 10px;
  background-color: white;
  padding: 5%;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.06);
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  margin-top: 20px;
  
  @media only screen and (max-width: 576px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  background-color: #fafafa;
  border-width: 0px 0px 0px 0px;
  border-radius: 5px 5px 5px 5px;
  min-height: 47px;
  padding: 16px;
  width: ${({width}) => width? width: '100%'};
  color: #3d4459;
  margin: 5px 0px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
`;