import React from 'react';
import palette from '../../styles/palette';
import styled, { css } from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;

  b {
    border-radius: 20px;
    border: none;
    outline: none;
    padding-left: 30px;
    margin-bottom: 10px;
    display: block;

    width: 100%;
    height: 50px;

    font-size: 15px;
    background-color: ${palette.white};
    color: black;
    line-height: 50px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    -webkit-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 9px -9px rgba(0, 0, 0, 0.05);

    display: flex;
    align-items: center;
    button {
      margin-left: auto;
    }
  }

  button {
    border-radius: 10px;
    border: none;
    outline: none;
    width: 70px;
    height: 50px;
    background-color: transparent;
    color: ${palette.darkGray};
    font-size: 25px;
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
        <span>{text}</span>
        <button onClick={onRemove}>x</button>
      </b>
    </ButtonContainer>
  </li>
);

export default RouletteItem;
