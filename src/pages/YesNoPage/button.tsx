import styled from 'styled-components';
import React from 'react';
import { Fade, Bounce } from 'react-awesome-reveal';

const ButtonWindow = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  font-weight: 100;
  font-size: 40px;
  display: flex;
  text-align: center;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const ButtonBlock = styled.div`
  display: center;
  width: 100%;
  margin: 10px 0;
  span {
    margin-left: 10px;
  }
  flex-direction: column;
  text-align: center;
  align-items: flex-start;
  padding-left: 20px;
  color: #db2a37;

  div:nth-child(1) {
    font-size: 12px;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    font-size: 10px;
  }
  padding: 31px;
  font-size: 20px;
  font-weight: 900;
  width: 100%;
`;

function Button() {
  return (
    <ButtonWindow>
      <Fade>
        <Bounce>
          <ButtonContainer>
            <ButtonBlock>
              <span>매운 거</span>
            </ButtonBlock>
          </ButtonContainer>
        </Bounce>
      </Fade>
      <Fade>
        <Bounce>
          <ButtonContainer>
            <ButtonBlock>
              <span>안매운 거</span>
            </ButtonBlock>
          </ButtonContainer>
        </Bounce>
      </Fade>
    </ButtonWindow>
  );
}

export default Button;
