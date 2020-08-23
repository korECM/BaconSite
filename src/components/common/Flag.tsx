import React from 'react';
import styled, { css } from 'styled-components';
import RedFlag from './RedFlag.png';

const FlagBlock = styled.div`
  height: 85px;
  width: 53px;
  background-image: ${`url(${RedFlag})`};

  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;

  align-items: center;

  justify-content: flex-end;

  margin-left: auto;
  margin-right: 30px;

  ${(props: FlagProps) => css`
    color: ${props.flagColor};
  `};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 900;

  ${(props: FlagProps) => css`
    color: ${props.titleColor};
  `};
`;

const Desc = styled.div`
  font-size: 10px;
  font-weight: 900;

  margin-top: 5px;
  margin-bottom: 32.5px;

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
      <Title {...props}>{props.titleText}</Title>
      <Desc {...props}>{props.descText}</Desc>
    </FlagBlock>
  );
}

export default Flag;
