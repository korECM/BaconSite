import React from 'react';
import styled from 'styled-components';
import PacmanLoader from 'react-spinners/PacmanLoader';
import palette from '../../styles/palette';

const LoaderBlock = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 40%;
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
