import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';
import MypageButton from '../common/MypageButton';

const HeaderBlock = styled.div`
  width: 40%;
  height: 50px;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 13px;
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

function Account(props: HeaderProps) {
  const { user } = useCheck();

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
      {user ? (
        <button onClick={onRightButtonClick}>
          <MypageButton fontSize="20px">my</MypageButton>
        </button>
      ) : (
        <button onClick={onRightButtonClick}>
          <MypageButton fontSize="20px">login</MypageButton>
        </button>
      )}
    </HeaderBlock>
  );
}

export default withRouter(Account);
