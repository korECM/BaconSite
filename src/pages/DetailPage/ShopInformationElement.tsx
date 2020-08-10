import styled from 'styled-components';
import React from 'react';
import { useSpring, animated } from 'react-spring';

const ShopInformationBlock = styled(animated.div)`
  display: flex;
  margin: 20px 0;
  a {
    margin-left: 10px;
  }
`;

interface ShopInformationBlockProps {
  index: number;
  content: {
    data: string;
    icon: JSX.Element;
    tag: JSX.Element;
  };
}

function ShopInformationElement({ content, index }: ShopInformationBlockProps) {
  const { x } = useSpring({
    from: { x: 0 },
    x: 1,
    config: {
      duration: 500,
      tension: 300,
      friction: 10,
    },
    delay: index * 60,
  });

  return (
    <ShopInformationBlock
      style={{
        opacity: x.interpolate({
          range: [0, 0.6],
          output: [0, 1],
        }),
        transform: x
          .interpolate({
            range: [0, 0.4, 0.6, 0.8, 1],
            output: [90, -20, 10, -5, 0],
          })
          .interpolate((x) => `perspective(400px) rotateX(${x}deg)`),
      }}
    >
      {content.icon}
      {content.tag}
    </ShopInformationBlock>
  );
}

export default ShopInformationElement;
