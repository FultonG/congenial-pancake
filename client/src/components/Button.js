import styled from 'styled-components';

const Button = styled.button`
  background: linear-gradient(90deg, rgba(162,212,217,1) 0%, rgba(0,212,255,1) 100%);
  font-size: 16px;
  border-radius: 30px 30px 30px 30px;
  padding: 10px 20px;
  border: 0;
  min-height: 40px;
  min-width: 150px;
  margin: 32px;
  color: white;
  &:hover {
    // background: linear-gradient(90deg, rgba(162,212,217,1) 0%, rgba(0,212,255,1) 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
export default Button;