import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 3px;

  width: 45px;
  height: 45px;

  background-color: ${palette.mainRed};
  color: ${palette.white};

  font-weight: 200;

  -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);

  ${(props: ButtonProps) =>
    css`
      font-size: props.fontSize;
    `}
`;

interface ButtonProps {
  children: React.ReactNode;
  fontSize: string;
}

function MypageButton(props: ButtonProps) {
  return <ButtonBlock {...props} />;
}

export default MypageButton;
