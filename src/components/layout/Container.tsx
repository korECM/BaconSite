import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const ContainerBlock = styled.div`
  padding: 0 7.5%;
  padding-top: 35px;

  padding-bottom: 50px;

  height: 100%;

  ${(props: ContainerProps) =>
    css`
      background-color: ${props.color === 'red' ? palette.mainRed : palette.lightGray};
    `}
`;

type Color = 'red' | 'white';

interface ContainerProps {
  children: React.ReactNode;
  color: Color;
}

function Container(props: ContainerProps) {
  return <ContainerBlock {...props} />;
}

export default Container;
