import React from 'react';
import styled from 'styled-components';

interface FullHeightProps {
  children: React.ReactNode;
}

const Fade = styled.div`
  height: 100%;

  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s; /* Firefox */
  -webkit-animation: fadein 0.5s; /* Safari and Chrome */
  -o-animation: fadein 0.5s; /* Opera */

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function FullHeightFade({ children }: FullHeightProps) {
  return <Fade>{children}</Fade>;
}

export default FullHeightFade;
