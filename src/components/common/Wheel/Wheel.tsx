import React, { useState, useEffect, useRef } from 'react';

import { getRotationDegrees } from './utils';
import rouletteSelector from 'assets/roulette-selector.png';
import { WheelData } from './types';
import WheelCanvas from './WheelCanvas';

import styled from 'styled-components';

const DEFAULT_BACKGROUND_COLORS = ['darkgrey', 'lightgrey'];
const DEFAULT_TEXT_COLORS = ['black'];
const DEFAULT_OUTER_BORDER_COLOR = 'black';
const DEFAULT_OUTER_BORDER_WIDTH = 5;
const DEFAULT_INNER_RADIUS = 0;
const DEFAULT_INNER_BORDER_COLOR = 'black';
const DEFAULT_INNER_BORDER_WIDTH = 0;
const DEFAULT_RADIUS_LINE_COLOR = 'black';
const DEFAULT_RADIUS_LINE_WIDTH = 5;
const DEFAULT_FONT_SIZE = 20;
const DEFAULT_TEXT_DISTANCE = 60;

const NonDraggableImage = styled.img`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const RouletteContainer = styled.div`
  position: relative;
  width: 80vw;
  max-width: 445px;
  height: 80vw;
  max-height: 445px;
  object-fit: contain;
  flex-shrink: 0;
  z-index: 5;
  pointer-events: none;
`;

interface RotationContainerProps {
  startSpinningTime: number;
  continueSpinningTime: number;
  stopSpinningTime: number;
  finalRotationDegrees: number;
}

const RotationContainer = styled.div<RotationContainerProps>`
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.started-spinning {
    animation: spin ${({ startSpinningTime }) => startSpinningTime / 1000}s cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,
      continueSpin 0.75s linear ${({ startSpinningTime }) => startSpinningTime / 1000}s 1 normal forwards running,
      stopSpin ${({ stopSpinningTime }) => stopSpinningTime / 1000}s cubic-bezier(0, 0, 0.35, 1.02)
        ${({ startSpinningTime, continueSpinningTime }) => (startSpinningTime + continueSpinningTime) / 1000}s 1 normal forwards running;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes continueSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes stopSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(${(props) => 1440 + props.finalRotationDegrees}deg);
    }
  }
`;

const RouletteSelectorImage = styled(NonDraggableImage)`
  position: absolute;
  z-index: 5;
  width: 17%;
  right: 6px;
  top: 15px;
`;

interface Props {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: WheelData[];
  onStopSpinning?: () => any;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerRadius?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontSize?: number;
  perpendicularText?: boolean;
  textDistance?: number;
}

const STARTED_SPINNING = 'started-spinning';

const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 750;
const STOP_SPINNING_TIME = 8000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  onStopSpinning = () => null,
  backgroundColors = DEFAULT_BACKGROUND_COLORS,
  textColors = DEFAULT_TEXT_COLORS,
  outerBorderColor = DEFAULT_OUTER_BORDER_COLOR,
  outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH,
  innerRadius = DEFAULT_INNER_RADIUS,
  innerBorderColor = DEFAULT_INNER_BORDER_COLOR,
  innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH,
  radiusLineColor = DEFAULT_RADIUS_LINE_COLOR,
  radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH,
  fontSize = DEFAULT_FONT_SIZE,
  perpendicularText = false,
  textDistance = DEFAULT_TEXT_DISTANCE,
}: Props) => {
  const wheelData = useRef<WheelData[]>([...data]);
  const [rotationDegrees, setRotationDegrees] = useState(NaN);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [stopCalled, setStopCalled] = useState(false);
  const [semiHasStarted, setSemiHasStarted] = useState(false);

  useEffect(() => {
    const dataLength = data.length;
    wheelData.current = [...data];
    for (let i = 0; i < dataLength; i++) {
      wheelData.current[i] = {
        ...data[i],
        style: {
          backgroundColor: data[i].style?.backgroundColor || backgroundColors[i % backgroundColors.length],
          textColor: data[i].style?.textColor || textColors[i % textColors.length],
        },
      };
    }
    setIsDataUpdated(true);
  }, [data, backgroundColors, textColors]);

  useEffect(() => {
    if (mustStartSpinning) {
      startSpinning();
      const finalRotationDegreesCalculated = getRotationDegrees(prizeNumber, data.length);
      setRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [data.length, mustStartSpinning, prizeNumber]);

  useEffect(() => {
    if (stopCalled === false && hasStoppedSpinning && semiHasStarted === false) {
      setStopCalled(true);
      onStopSpinning();
    }
  }, [hasStoppedSpinning, onStopSpinning, stopCalled, semiHasStarted]);

  // const startSpinning = () => {
  //   setHasStartedSpinning(true);
  //   setTimeout(() => {
  //     setHasStoppedSpinning(true);
  //   }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
  // };

  const startSpinning = () => {
    setStopCalled(false);
    setSemiHasStarted(true);
    if (hasStartedSpinning) {
      setHasStartedSpinning(false);
      setTimeout(() => {
        setHasStartedSpinning(true);
        setHasStoppedSpinning(false); // +
        setTimeout(() => {
          // setHasStartedSpinning(false); // +
          setSemiHasStarted(false);
          setHasStoppedSpinning(true);
        }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
      }, 500);
    } else {
      setHasStartedSpinning(true);
      setHasStoppedSpinning(false); // +
      setTimeout(() => {
        // setHasStartedSpinning(false); // +
        setSemiHasStarted(false);
        setHasStoppedSpinning(true);
      }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
    }
  };

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return '';
  };

  if (!isDataUpdated) {
    return null;
  }

  return (
    <RouletteContainer>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={START_SPINNING_TIME}
        continueSpinningTime={CONTINUE_SPINNING_TIME}
        stopSpinningTime={STOP_SPINNING_TIME}
        finalRotationDegrees={rotationDegrees}
      >
        <WheelCanvas
          width="900"
          height="900"
          data={wheelData.current}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          fontSize={fontSize}
          perpendicularText={perpendicularText}
          textDistance={textDistance}
        />
      </RotationContainer>
      <RouletteSelectorImage src={rouletteSelector} alt="roulette-static" />
    </RouletteContainer>
  );
};
