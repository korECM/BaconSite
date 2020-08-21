import React from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styled, { css } from 'styled-components';
import palette from '../styles/palette';
import FullHeightFade from '../components/common/FullHeightFade';

const ServiceTitle = styled.h1`
  font-size: 25px;
  font-family: 'Nanum Gothic';
  font-weight: 500;
  margin-top: 50px;
  margin-bottom: 20px;
  color: black;
`;

const Caregories = styled.h1`
  font-size: 15px;
  font-family: 'Nanum Gothic';
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 0px;
  color: black;
`;

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 10px;

  width: 70px;
  height: 70px;

  margin: 10px;

  background-color: ${palette.mainRed};
  color: ${palette.white};

  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;

  -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
`;

const TextBox = styled.h1`
  font-size: 10px;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;
`;

const Divider = styled.div`
  border-bottom: 0px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 17px;
`;

function HomePage() {
  return (
    <FullHeightFade>
      <Container color="white">
        <Header category="main" headerColor="none" />
        <ServiceTitle>CAU Fooding</ServiceTitle>
        <Caregories>Caregories</Caregories>
        <Divider></Divider>
        <ButtonBlock>
          <Link to="/shop/5f26b992555be6865ede4e28">
            <TextBox>테스트</TextBox>
            <TextBox>가게</TextBox>
          </Link>
        </ButtonBlock>
        <ButtonBlock>
          <Link to="/yesno">
            <TextBox>선택장애</TextBox>
            <TextBox>Yes or No</TextBox>
          </Link>
        </ButtonBlock>
        <ButtonBlock>
          <Link to="/roulette">
            <TextBox>돌려돌려</TextBox>
            <TextBox>돌림판</TextBox>
          </Link>
        </ButtonBlock>
      </Container>
    </FullHeightFade>
  );
}

export default HomePage;
