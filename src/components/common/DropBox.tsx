import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import palette, { hexToRGB } from '../../styles/palette';
import { MdExpandMore } from 'react-icons/md';

const DropBoxBlock = styled(animated.div)`
  overflow: hidden;
  width: 80px;
  position: absolute;
`;

const DropBoxBlockWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 30px;
  margin: 0 10px;
`;

const DropBoxControl = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: white;
  height: 30px;
  width: 80px;
  padding-left: 15px;
  color: ${palette.mainRed};
  text-align: center;
  & + & {
    border-top: 0.5px solid ${hexToRGB(palette.mainRed, 0.25)};
  }
  &:first-child {
    border-radius: 7.5px 7.5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 7.5px 7.5px;
  }
`;

const IconWrapper = styled(MdExpandMore)`
  margin-left: auto;
  font-size: 1.25rem;
`;

const AnimatedIconWrapper = animated(IconWrapper);

interface DataInterface {
  value: string;
  label: string;
}

interface DropBoxProps {
  dataSet: DataInterface[];
  onChange: (data: string) => void;
}

function DropBox({ dataSet, onChange }: DropBoxProps) {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(dataSet[0]);

  const onButtonClick = useCallback(
    (index: number) => {
      if (toggle) {
        if (index === -1) return;
        setData(dataSet[index]);
        onChange(dataSet[index].value);
      }
      setToggle(!toggle);
    },
    [toggle, dataSet, onChange],
  );

  const buttonProps = useSpring({
    config: {
      velocity: 5,
    },
    height: toggle ? `${30 * (dataSet.length + 1)}px` : '30px',
  });

  const svgProps = useSpring({
    transform: `rotateX(${toggle ? -180 : 0}deg)`,
  });

  return (
    <DropBoxBlockWrapper>
      <DropBoxBlock style={buttonProps}>
        <DropBoxControl style={{ borderRadius: toggle ? '7.5px 7.5px 0 0' : '7.5px' }} onClick={() => onButtonClick(-1)}>
          {data.label}
          <AnimatedIconWrapper style={svgProps} />
        </DropBoxControl>
        {dataSet.map((data, index) => (
          <DropBoxControl key={data.label} onClick={() => onButtonClick(index)}>
            {data.label}
          </DropBoxControl>
        ))}
      </DropBoxBlock>
    </DropBoxBlockWrapper>
  );
}

export default DropBox;
