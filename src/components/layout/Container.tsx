import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const ContainerBlock = styled.div`
  padding: 0 7.5%;

  padding-top: 35px;

  padding-bottom: 50px;

  @media only screen and (min-width: 768px) {
    padding: 0 15%;
    padding-top: 35px;

    padding-bottom: 50px;
  }
  @media only screen and (min-width: 1000px) {
    padding: 0 27.5%;
    padding-top: 35px;

    padding-bottom: 50px;
  }

  @media only screen and (min-width: 1600px) {
    padding: 0 35%;
    padding-top: 35px;

    padding-bottom: 50px;
  }

  ${(props: ContainerProps) =>
    css`
      color: ${props.color === 'red' ? palette.white : palette.mainRed};
    `}

  ${(props: ContainerProps) =>
    !props.notFullHeight &&
    css`
      min-height: calc(100% - 35px);
    `}

  ${(props: ContainerProps) =>
    props.noBottomPadding &&
    css`
      padding-bottom: 0;
    `}
          
  ${(props: ContainerProps) =>
    css`
      background-color: ${props.color === 'red' ? palette.mainRed : palette.lightGray};
    `};
`;

type Color = 'red' | 'white';

interface ContainerProps {
  children: React.ReactNode;
  color: Color;
  notFullHeight?: boolean;
  noBottomPadding?: boolean;
}

function Container(props: ContainerProps) {
  return <ContainerBlock {...props} />;
}

export default Container;
