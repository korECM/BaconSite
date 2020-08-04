import React from 'react';
import styled, { css } from 'styled-components';
import { MdClear, MdKeyboardArrowLeft } from 'react-icons/md';
import palette from '../../styles/palette';

const HeaderBlock = styled.div`
  width: 100%;
  height: 50px;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  ${(props: HeaderProps) =>
    css`
      color: ${props.headerColor === 'red' ? palette.white : palette.mainRed};
    `}

  img {
    width: 40px;
    height: 40px;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 2.5rem;
  }

  button:nth-child(2) {
    margin-left: auto;
  }
`;

type HeaderColor = 'red' | 'white';
type Category = 'main' | 'modal';

interface HeaderProps {
  category: Category;
  headerColor: HeaderColor;
  onBack?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMenu?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Header(props: HeaderProps) {
  return (
    <HeaderBlock>
      {props.category === 'main' ? (
        <HeaderContainer {...props}>
          <button>
            <img src="https://avatars3.githubusercontent.com/u/69138035?s=60&v=4" alt="logo" />
          </button>
          <button onClick={props.onMenu}>my</button>
        </HeaderContainer>
      ) : (
        <HeaderContainer {...props}>
          <button>
            <MdKeyboardArrowLeft />
          </button>
          <button>
            <MdClear />
          </button>
        </HeaderContainer>
      )}
    </HeaderBlock>
  );
}

export default Header;
