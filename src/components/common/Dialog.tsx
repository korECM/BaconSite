import styled from 'styled-components';
import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import { useTransition, animated } from 'react-spring';

const DialogBlock = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogBackground = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

const WhiteBox = styled.div`
  box-sizing: border-box;
  border-radius: 4px;
  width: 20rem;
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;

  @media only screen and (min-width: 1000px) {
    width: 25rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0;
    margin-bottom: 2rem;
    color: #868e96;
  }
`;

interface DialogProps {
  title: string;
  desc: string;
  mode: 'confirm' | 'cancel';
  cancelText: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  visible: boolean;
}

const Dialog = (p: DialogProps) => {
  const fadeTransition = useTransition(p.visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const slideUpTransition = useTransition(p.visible, null, {
    from: {
      transform: `translateY(200px) scale(0.8)`,
      opacity: 0,
    },
    enter: {
      transform: `translateY(0px) scale(1)`,
      opacity: 1,
    },
    leave: {
      transform: `translateY(200px) scale(0.8)`,
      opacity: 0,
    },
    config: {
      tension: 200,
      friction: 15,
    },
  });

  return (
    <div>
      {fadeTransition.map(({ item, key, props }) => (item ? <DialogBackground key={key} style={props} /> : null))}
      {slideUpTransition.map(({ item, key, props }) =>
        item ? (
          <DialogBlock style={props} key={key}>
            <WhiteBox>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              {p.mode === 'confirm' && (
                <ButtonGroup direction="row" rightAlign gap="0">
                  <Button theme="white" onClick={p.onConfirm}>
                    {p.confirmText}
                  </Button>
                </ButtonGroup>
              )}
              {p.mode === 'cancel' && (
                <ButtonGroup direction="row" rightAlign gap="10px">
                  <Button theme="text" onClick={p.onCancel}>
                    {p.cancelText}
                  </Button>
                  <Button theme="red" onClick={p.onConfirm}>
                    {p.confirmText}
                  </Button>
                </ButtonGroup>
              )}
            </WhiteBox>
          </DialogBlock>
        ) : null,
      )}
    </div>
  );
};
export default Dialog;
