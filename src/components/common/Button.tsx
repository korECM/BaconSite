import React from 'react';
import styled, { css } from 'styled-components';
import palette, { hexToRGB } from '../../styles/palette';

const ButtonBlock = styled.button`
  outline: none;
  border: none;

  border-radius: 12.5px;
  padding: 8.5px 27.5px;

  margin-bottom: 15px;
  margin-top: 15px;

  transition: background-color 0.2s ease;

  ${(props: ButtonProps) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${(props: ButtonProps) =>
    !['text', 'border'].includes(props.theme) &&
    css`
      -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
      box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
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
  return <ButtonBlock {...props} />;
}

export default Button;
