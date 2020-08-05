import React from 'react';
import styled from 'styled-components';
import PacmanLoader from 'react-spinners/PacmanLoader';
import palette from '../../styles/palette';

const LoaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
  width: 200px;
  height: 200px;
  transform: translateX(-30px);
`;

function Loader() {
  return (
    <LoaderBlock>
      <PacmanLoader color={palette.mainRed} size={20} />
    </LoaderBlock>
  );
}

export default Loader;
