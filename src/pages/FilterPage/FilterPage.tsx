// import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import palette, { hexToRGB } from '../../styles/palette';
import Flag from '../../components/common/Flag';
import RestaurantCard from '../../components/common/RestaurantCard';
import Loader from '../../components/common/Loader';
import { Fade, Bounce } from 'react-awesome-reveal';
import { Animated } from 'react-animated-css';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const TitleComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 30px;
  font-weight: 900;
  margin-top: 7px;
  margin-bottom: 0px;
  color: black;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const SubtitleComment = styled.h1`
  font-family: 'Nanum Gothic';
  font-size: 25px;
  font-weight: 100;
  margin-top: 7px;
  margin-bottom: 0px;
  color: ${palette.darkGray};
  padding-top: 30px;
  padding-bottom: 30px;
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

const ButtonBlock2 = styled.button`

    outline : none;
    border : none;

    border-radius : 12.5px;
    padding : 8.5px 27.5px;

    margin-bottom: 15px;
    margin-top: 15px;
    margin: 3%;



  transition : background-color 0.2s ease;

  ${(props: ButtonProps) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${(props: ButtonProps) =>
    !['text', 'border'].includes(props.theme) &&
    css`
      -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      :hover {
        background-color: ${palette.mainRed};
        color: ${palette.white};
        cursor: pointer;
      }
    `}

    ${(props: ButtonProps) =>
      props.theme === 'red' &&
      css`
        :hover {
          background-color: ${hexToRGB(palette.mainRed, 0.7)};
          color: ${palette.white};
        }
      `}

  ${(props: ButtonProps) =>
    props.middle &&
    css`
      padding: 15px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 900;
    `}

${(props: ButtonProps) =>
  props.big &&
  css`
    padding: 31px;
    font-size: 24px;
    font-weight: 900;
    width: 100%;
  `}

  ${(props: ButtonProps) =>
    props.theme === 'white' &&
    css`
      background-color: ${palette.white};
      color: ${palette.mainRed};
    `}
    ${(props: ButtonProps) =>
      props.theme === 'red' &&
      css`
        background-color: ${palette.mainRed};
        color: ${palette.white};
      `}
    ${(props: ButtonProps) =>
      props.theme === 'gray' &&
      css`
        background-color: ${palette.gray};
        color: ${palette.darkGray};
      `}
    ${(props: ButtonProps) =>
      props.theme === 'text' &&
      css`
        background-color: transparent;
        color: ${palette.mainRed};
      `}

      ${(props: ButtonProps) =>
        props.theme === 'border' &&
        css`
          background-color: transparent;
          color: ${palette.mainRed};
          border: 1px solid ${palette.mainRed};
        `}

  ${(props: ButtonProps) =>
    props.selected &&
    css`
      background-color: ${palette.mainRed};
      color: ${palette.white};
    `}

  ${(props: ButtonProps) =>
    props.disabled &&
    css`
      background-color: ${palette.middleGray};
      color: ${palette.white};
      &:hover {
        background-color: ${palette.middleGray};
        color: ${palette.white};
        cursor: default;
      }
    `}
`;

type Theme = 'white' | 'gray' | 'text' | 'red' | 'border';
// type Selected = 'true' | 'false';
// let Selected = 'false';

interface ButtonProps {
  children: React.ReactNode;
  big?: boolean;
  middle?: boolean;
  selected?: boolean;
  disabled?: boolean;
  theme: Theme;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps) {
  return <ButtonBlock2 {...props} />;
}

function FilterPage({ match }: RouteComponentProps) {
  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
      <Fade>
        <Container color="white">
          <Helmet>
            <title>당신만을 위한 식당 - 푸딩</title>
          </Helmet>
          <Header category="modal" headerColor="white" />
          <Fade>
            <Bounce>
              <TitleComment>필터링 검색</TitleComment>
              <SubtitleComment>정렬</SubtitleComment>
              <ButtonLine>
                <Button theme="gray">추천순</Button>
                <Button theme="gray">평점순</Button>
                <Button theme="gray">리뷰순</Button>
              </ButtonLine>
              <Divider></Divider>
              <ButtonLine></ButtonLine>
            </Bounce>
          </Fade>
        </Container>
      </Fade>
    </Animated>
  );
}

export default FilterPage;
