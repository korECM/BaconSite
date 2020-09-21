import React from 'react';
import styled from 'styled-components';

interface FullHeightProps {
  children: React.ReactNode;
}

const Fade = styled.div`
  height: 100%;

  animation-name: fadeIn;
  animation-duration: 0.5s;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.5s;
`;

function FullHeightFade({ children }: FullHeightProps) {
  return <Fade>{children}</Fade>;
}

export default FullHeightFade;
