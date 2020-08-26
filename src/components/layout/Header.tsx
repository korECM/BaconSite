import React from 'react';
import styled, { css } from 'styled-components';
import { MdClear, MdKeyboardArrowLeft } from 'react-icons/md';
import palette from '../../styles/palette';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';
import FoodingTitleRed from 'assets/FoodingTitleRed.png';
import FoodingTitleWhite from 'assets/FoodingTitleWhite.png';
import JustFooding from 'assets/JustFooding.png';

const HeaderBlock = styled.div`
  width: 100%;
  height: 60px;
`;

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
  ${(props: HeaderProps) =>
    css`
      if(props.headerColor !== 'none') {
        color: ${props.headerColor === 'red' ? palette.white : palette.mainRed};
      }
    `}

  ${(props: HeaderProps) =>
    props.iconColor &&
    css`
      color: ${props.iconColor};
    `}

  ${(props: HeaderProps) =>
    props.backColor &&
    css`
      background-color: ${props.backColor};
    `}

  img {
    width: 50px;
    height: 50px;
  }

  .titleLogo {
    width: 109px;
    height: 31px;
    margin: 0 auto;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 2.5rem;
    cursor: pointer;
  }
  .left {
    position: absolute;
    left: 0;
    padding-left: 0;
  }

  .right {
    position: absolute;
    right: 0;
    /* margin-left: auto; */
    padding-right: 0;
  }

  .myPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 27px;
      height: 23px;
    }
    div {
      font-size: 10px;
      margin-top: 5px;
    }
  }

  .title {
    width: 109px;
    height: 31px;
    margin: 0 auto;

    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    ${(props: HeaderProps) =>
      props.titleColor &&
      css`
        color: ${props.titleColor};
      `}
  }
`;

type HeaderColor = 'red' | 'white' | 'none';
type Category = 'main' | 'modal';

interface HeaderProps extends RouteComponentProps {
  category: Category;
  headerColor: HeaderColor;
  backColor?: string;
  titleText?: string;
  titleColor?: string;
  iconColor?: string;
}

function Header(props: HeaderProps) {
  const { user } = useCheck();

  const onLeftButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.category === 'modal') {
      props.history.goBack();
    }
  };

  const onRightButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.category === 'modal') {
      props.history.push('/');
    } else {
      if (user) {
        props.history.push('/myPage');
      } else {
        localStorage.setItem('redir', props.match.url);
        props.history.push('/auth/login');
      }
    }
  };

  return (
    <HeaderBlock>
      {props.category === 'main' ? (
        <HeaderContainer {...props}>
          {/* <button className="left">
            <img src={logo} style={{ width: '40px', height: '40px' }} alt="logo" />
          </button> */}
          <img className="titleLogo" src={props.headerColor === 'red' ? FoodingTitleWhite : FoodingTitleRed} alt="title" />
          <button onClick={onRightButtonClick} className="right myPage">
            <img src={JustFooding} alt="mypage" />
            <div>마이푸딩</div>
          </button>
        </HeaderContainer>
      ) : (
        <HeaderContainer {...props}>
          <button onClick={onLeftButtonClick} className="left">
            <MdKeyboardArrowLeft />
          </button>
          {props.titleText ? (
            <div className="title">{props.titleText}</div>
          ) : (
            <img className="titleLogo" src={props.headerColor === 'red' ? FoodingTitleWhite : FoodingTitleRed} alt="title" />
          )}
          <button onClick={onRightButtonClick} className="right">
            <MdClear />
          </button>
        </HeaderContainer>
      )}
    </HeaderBlock>
  );
}

export default withRouter(Header);
