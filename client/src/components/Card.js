import styled from 'styled-components';

const Card = styled.div(({width = '100%', height = 'auto', minHeight = height, margin = '0px',padding = '0px', lg = width, md = lg, sm = md, xs = sm, cursor, hover, selfCenter, direction = 'row'}) => `
  display: flex;
  flex-direction: ${direction};
  flex-wrap: wrap;
  width: ${width};
  height: ${height};
  min-height: ${minHeight};
  margin: ${margin};
  padding: ${padding};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background: white;
  ${selfCenter && 'margin: 10px auto;'}
  @media only screen and (max-width: 1200px){
    width: ${lg}
  }
  @media only screen and (max-width: 992px){
    width: ${md}
  }
  @media only screen and (max-width: 768px){
    width: ${sm}
  }
  @media only screen and (max-width: 576px){
    width: ${xs}
  }
  &:hover {
    cursor: ${cursor};
    ${hover && 'box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);'}
  }
`
);

export default Card;