import styled, { css } from 'styled-components';
import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

const DialogBlock = styled.div`
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

const DialogBackground = styled.div`
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
  width: 25rem;
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0;
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
}

const Dialog = (props: DialogProps) => {
  return (
    <div>
      <DialogBackground />
      <DialogBlock>
        <WhiteBox>
          <h3>{props.title}</h3>
          <p>{props.desc}</p>
          {props.mode === 'confirm' && (
            <ButtonGroup direction="row" rightAlign gap="0">
              <Button theme="white" onClick={props.onConfirm}>
                {props.confirmText}
              </Button>
            </ButtonGroup>
          )}
          {props.mode === 'cancel' && (
            <ButtonGroup direction="row" rightAlign gap="10px">
              <Button theme="text" onClick={props.onCancel}>
                {props.cancelText}
              </Button>
              <Button theme="red" onClick={props.onConfirm}>
                {props.confirmText}
              </Button>
            </ButtonGroup>
          )}
        </WhiteBox>
      </DialogBlock>
    </div>
  );
};
export default Dialog;
