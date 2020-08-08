import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const ButtonBlock = styled.button`

    outline : none;
    border : none;

    border-radius : 12.5px;
    padding : 8.5px 27.5px;

    margin-bottom: 15px;
    margin-top: 15px;

    -webkit-box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.1);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.1);
    box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.1);

  transition : background-color 0.2s ease;

  :hover {
    background-color: ${palette.mainRed}; 
		color: ${palette.white};
		cursor: pointer;
	}

${(props: ButtonProps) =>
  props.big &&
  css`
    padding: 31px;
    font-size: 24px;
    font-weight: 900;
    width: 100%;
  `}

  ${(props: ButtonProps) =>
    props.theme &&
    css`
      background-color: ${props.theme === 'white' ? palette.white : palette.gray};
      color: ${props.theme === 'white' ? palette.mainRed : palette.darkGray};
    `}

  ${(props: ButtonProps) =>
    props.selected &&
    css`
      background-color: ${palette.mainRed};
      color: ${palette.white};
    `}
`;

type Theme = 'white' | 'gray';
// type Selected = 'true' | 'false';
// let Selected = 'false';

interface ButtonProps {
  children: React.ReactNode;
  big?: boolean;
  selected?: boolean;
  theme: Theme;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps) {
  return <ButtonBlock {...props} />;
}

export default Button;
