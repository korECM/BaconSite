import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const RoundContainerBlock = styled.div`
  width: 100%;
  min-height: 85px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0;

  border-radius: 20px;

  -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);

  ${(props: RoundContainerProps) =>
    props.theme &&
    props.theme === 'gray' &&
    css`
      background-color: ${palette.middleLightGray};
      color: ${palette.middleGray};
    `}
  ${(props: RoundContainerProps) =>
    props.theme &&
    props.theme === 'image' &&
    props.imageLink &&
    css`
      background: url(${props.imageLink}) rgba(150, 150, 150, 0.8);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-blend-mode: multiply;
      min-height: 105px;
      color: ${palette.white};
    `}
`;

type Theme = 'gray' | 'image';

interface RoundContainerProps {
  children: React.ReactNode;
  theme: Theme;
  imageLink?: string;
}

function RoundContainer(props: RoundContainerProps) {
  return <RoundContainerBlock {...props} />;
}

export default RoundContainer;
