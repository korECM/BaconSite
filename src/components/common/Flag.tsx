import React from 'react';
import styled, { css } from 'styled-components';

const FlagBlock = styled.div`
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;

  ${(props: FlagProps) => css`
    color: ${props.flagColor};
  `}
`;

const FlagShape = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.div`
  position: absolute;
  top: 15px;
  right: 37px;
  bottom: 0;

  font-size: 26px;
  font-weight: 900;

  ${(props: FlagProps) => css`
    color: ${props.titleColor};
  `};
`;

const Desc = styled.div`
  position: absolute;
  top: 45px;
  right: 32.5px;
  bottom: 0;

  font-size: 12.5px;
  font-weight: 900;

  ${(props: FlagProps) => css`
    color: ${props.descColor};
  `}
`;

interface FlagProps {
  titleText: string;
  descText: string;
  titleColor: string;
  descColor: string;
  flagColor: string;
}

function Flag(props: FlagProps) {
  return (
    <FlagBlock {...props}>
      <FlagShape xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90" fill="currentcolor">
        <path d="M10 90 L38 70 L66 90 L66 0 L10 0 Z" />
      </FlagShape>
      <Title {...props}>{props.titleText}</Title>
      <Desc {...props}>{props.descText}</Desc>
    </FlagBlock>
  );
}

export default Flag;
