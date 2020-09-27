import styled from "styled-components";

export const Receipt = styled.div`
  width: 50%;
  height: 95vh;
  padding: 5%;
  padding-top: 80px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  //   transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;

  background: white;
  position: relative;
  margin-top: -50px;

  @media only screen and (max-width: 576px) {
    width: 90%;
  }
  &:before,
  &:after {
    content: "";
    width: 100%;
    height: 5px;
    position: absolute;
    bottom: 100%;
    left: 0;
    background-image: linear-gradient(135deg, transparent 66%, white 67%),
      linear-gradient(45deg, white 33%, gray 34%, transparent 44%);
    background-position: -5px 0;
    background-size: 10px 100%;
    background-repeat: repeat-x;
  }

  &:after {
    top: 100%;
    bottom: auto;
    background-image: linear-gradient(
        135deg,
        white 33%,
        gray 34%,
        transparent 44%
      ),
      linear-gradient(45deg, transparent 66%, white 67%);
  }
`;
