import React from 'react';
import styled, { css } from 'styled-components';
import { MdClear, MdKeyboardArrowLeft } from 'react-icons/md';
import palette from '../../styles/palette';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';
import MypageButton from '../common/MypageButton';

const HeaderBlock = styled.div`
  width: 100%;
  height: 60px;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  ${(props: HeaderProps) =>
    css`
      if(props.headerColor !== 'none') {
        color: ${props.headerColor === 'red' ? palette.white : palette.mainRed};
      }
    `}

  img {
    width: 50px;
    height: 50px;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 2.5rem;
  }
  button:nth-child(1) {
    padding-left: 0;
  }

  button:nth-child(2) {
    margin-left: auto;
    padding-right: 0;
  }
`;

type HeaderColor = 'red' | 'white' | 'none';
type Category = 'main' | 'modal';

interface HeaderProps extends RouteComponentProps {
  category: Category;
  headerColor: HeaderColor;
  onBack?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
        console.log('마이 페이지로 가자');
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
          <button>
            <img src="https://ifh.cc/g/FaLxN0.png" style={{ width: '30px', height: '10px' }} alt="logo" />
          </button>
          {user ? (
            <button onClick={onRightButtonClick}>
              <img src="https://ifh.cc/g/aVLW50.png" alt="mypage" />
            </button>
          ) : (
            <button onClick={onRightButtonClick}>
              <img src="https://ifh.cc/g/eMtxxz.png" alt="login" />
            </button>
          )}
        </HeaderContainer>
      ) : (
        <HeaderContainer {...props}>
          <button onClick={onLeftButtonClick}>
            <MdKeyboardArrowLeft />
          </button>
          <button onClick={onRightButtonClick}>
            <MdClear />
          </button>
        </HeaderContainer>
      )}
    </HeaderBlock>
  );
}

export default withRouter(Header);
