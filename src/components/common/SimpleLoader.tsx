import React from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import './SimpleLoader.css';

const SimpleLoaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -100px;
  width: 100%;
  height: 100vh;
  /* transform: translateX(-30px); */
`;

function SimpleLoader() {
  return (
    <SimpleLoaderBlock>
      <div className="loader-4 center">
        <span></span>
      </div>
    </SimpleLoaderBlock>
  );
}

export default SimpleLoader;
