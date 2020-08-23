import React from 'react';
import styled from 'styled-components';
import PacmanLoader from 'react-spinners/PacmanLoader';
import palette from '../../styles/palette';

const LoaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -100px;
  /* margin-left: -100px; */
  /* width: 200px; */
  width: 100%;
  height: 100vh;
  /* height: 200px; */
  transform: translateX(-30px);
`;

interface LoaderProps {
  color?: string;
}

function Loader({ color }: LoaderProps) {
  return (
    <LoaderBlock>
      <PacmanLoader color={color || palette.mainRed} size={20} />
    </LoaderBlock>
  );
}

export default Loader;
