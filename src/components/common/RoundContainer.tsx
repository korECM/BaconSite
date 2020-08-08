import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSpring, animated } from 'react-spring';

const RoundContainerBlock = styled.div`
  min-height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15px 0;

  border-radius: 12.5px;

  -webkit-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);

  ${(props: RoundContainerProps) =>
    props.theme &&
    props.theme === 'gray' &&
    css`
      background-color: ${palette.middleLightGray};
      color: ${palette.middleGray};
    `}
  ${(props: RoundContainerProps) =>
    props.theme &&
    props.theme === 'image' &&
    props.imageLink &&
    css`
      background: url(${props.imageLink}) rgba(150, 150, 150, 0.8);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-blend-mode: multiply;
      min-height: 105px;
      color: ${palette.white};
    `}
`;

const AnimatedRoundContainerBlock = animated(RoundContainerBlock);

type Theme = 'gray' | 'image';

interface RoundContainerProps {
  children: React.ReactNode;
  theme: Theme;
  imageLink?: string;
  delay?: number;
}

function RoundContainer(props: RoundContainerProps) {
  // const slideUpTransition = useTransition(true, null, {
  //   from: {
  //     transform: `translateY(50px) scale(0.9)`,
  //     opacity: 0,
  //   },
  //   enter: {
  //     transform: `translateY(0px) scale(1)`,
  //     opacity: 1,
  //   },
  //   config: {
  //     tension: 350,
  //     friction: 25,
  //   },
  // });

  const appear = useSpring({
    from: {
      transform: `translateY(50px) scale(0.9)`,
      opacity: 0,
    },
    to: {
      transform: `translateY(0px) scale(1)`,
      opacity: 1,
    },
    config: {
      tension: 350,
      friction: 25,
    },
    delay: props.delay || 0,
  });

  return <AnimatedRoundContainerBlock style={appear} {...props} />;

  // return <div>{slideUpTransition.map(({ item, key, props }) => (item ? <AnimatedRoundContainerBlock style={props} {...p} /> : null))}</div>;
}

export default RoundContainer;
