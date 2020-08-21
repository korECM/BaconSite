import React from 'react';
import palette from '../../styles/palette';
import styled, { css } from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;

  b {
    border-radius: 30px;
    border: none;
    outline: none;
    padding-left: 30px;
    margin-bottom: 10px;
    display: block;

    width: 100%;
    height: 50px;

    font-size: 15px;
    font-weight: 2000;
    font-family: 'Nanum Gothic';
    background-color: ${palette.white};
    color: black;
    line-height: 50px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
    box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  }

  button {
    border-radius: 10px;
    border: none;
    outline: none;
    width: 70px;
    height: 50px;

    vertical-align: right;
    margin-right: 10px;
    padding-right: 10px;
    background-color: transparent;
    color: ${palette.darkGray};
    font-size: 25px;
    font-weight: 1200;
    font-family: 'Nanum Gothic';
  }
  button:nth-child(1) {
    padding-left: 0;
  }

  button:nth-child(2) {
    margin-left: auto;
    padding-right: 0;
  }
`;

interface Props {
  text: string;
  done: boolean;
  onToggle(): void;
  onRemove(): void;
}

const RouletteItem: React.SFC<Props> = ({ text, done, onToggle, onRemove }) => (
  <li>
    <ButtonContainer>
      <b
        style={{
          textDecoration: done ? 'line-through' : 'none',
        }}
      >
        {text}
        <button onClick={onRemove}>x</button>
      </b>
    </ButtonContainer>
  </li>
);

export default RouletteItem;
