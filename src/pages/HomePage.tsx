import React from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styled, { css } from 'styled-components';
import palette from '../styles/palette';
import FullHeightFade from '../components/common/FullHeightFade';
import titlelogo from './fooding_titlelogo.png';

const TitleSlogan = styled.h1`
  font-size: 14px;
  font-family: 'Nanum Gothic';
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  color: black;
`;

const TitleLogo = styled.div`
  display: flex;

  justify-content: center;

  img {
    flex: 1;
    padding: 0 10%;
    max-height: 64px;
    max-width: 284px;
  }
`;

const Categories = styled.h1`
  font-size: 15px;
  font-family: 'Nanum Gothic';
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 0px;
  color: black;
`;

const ButtonLine = styled.h1`
  display: 100%;
  font-family: 'Nanum Gothic';
  font-weight: 200;
  color: white;
  padding-bottom: 3px;

  vertical-align: center;
`;

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 10px;

  width: 27%;
  height: 90px;

  margin: 3%;

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
        <TitleSlogan>뭐 먹을지 고민될 땐?</TitleSlogan>
        <TitleLogo>
          <img src={titlelogo} alt="titlelogo" />
        </TitleLogo>
        <Categories>Categories</Categories>
        <Divider></Divider>
        <ButtonLine>
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
        </ButtonLine>
        <Divider></Divider>
        <ButtonLine>
          <ButtonBlock>
            <Link to="/rouletteList">
              <TextBox>돌림판</TextBox>
              <TextBox>리스트 받기</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/result">
              <TextBox>필터링</TextBox>
              <TextBox>결과</TextBox>
            </Link>
          </ButtonBlock>
          <ButtonBlock>
            <Link to="/filter">
              <TextBox>필터링</TextBox>
              <TextBox>검색</TextBox>
            </Link>
          </ButtonBlock>
        </ButtonLine>
      </Container>
    </FullHeightFade>
  );
}

export default HomePage;
