import React from 'react';
import { Fade } from 'react-awesome-reveal';

interface FullHeightProps {
  children: React.ReactNode;
}

function FullHeightFade({ children }: FullHeightProps) {
  return <Fade css={'height : 100%;'}>{children}</Fade>;
}

export default FullHeightFade;
