import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle, AiOutlineFrown } from 'react-icons/ai';
import Dialog from './Dialog';
import palette from 'styles/palette';
import BounceLoader from 'react-spinners/BounceLoader';

const ProcessModalBlock = styled.div``;

const ReportBlock = styled.div`
  .text {
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const SuccessBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  svg {
    margin-top: 35px;
    margin-bottom: 20px;
    color: ${palette.mainRed};
    font-size: 2.5rem;
  }
  div {
    text-align: center;
    margin-bottom: 45px;
  }
`;

const FailBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  svg {
    /* margin-top: 35px;
    margin-bottom: 20px; */
    color: ${palette.mainRed};
    font-size: 2.5rem;
    width: 30px;
    height: 30px;
    margin: auto 0;
  }
  div {
    text-align: center;
    margin-bottom: 45px;
  }
`;

const LoaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

interface ProcessModalProps {
  onCancel: () => void;
  visible: boolean;
  error: any;
  loading: boolean;
  done: boolean;
  setDone: (state: boolean) => void;
  doneMessage: string;
  errorMessage?: string;
  errorMessageBlock?: React.ReactNode;
  children?: React.ReactNode;
  afterDone?: () => void;
  icon?: React.ReactNode;
}

function ProcessModal({
  done,
  setDone,
  doneMessage,
  error,
  loading,
  onCancel,
  visible,
  children,
  afterDone,
  icon,
  errorMessage,
  errorMessageBlock,
}: ProcessModalProps) {
  const [showError, setShowError] = useState(false);

  const onCancelAction = useCallback(() => {
    setTimeout(() => {
      setShowError(false);
    }, [500]);
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        onCancel();
        setTimeout(() => {
          setDone(false);
          if (afterDone) afterDone();
        }, [500]);
      }, 1500);
    }
  }, [done, afterDone, onCancel, setDone]);

  useEffect(() => {
    if (loading) {
      setShowError(true);
    }
  }, [loading]);

  return (
    <Dialog mode="custom" onCancel={onCancelAction} visible={visible} customPadding="1rem">
      <ReportBlock>
        {showError && error ? (
          <FailBlock>
            <AiOutlineFrown />
            {errorMessageBlock ? errorMessageBlock : <div>{errorMessage || `오류가 발생했습니다 : ${error}`}</div>}
          </FailBlock>
        ) : loading ? (
          <LoaderBlock>
            <BounceLoader color={palette.mainRed} size="30" />
          </LoaderBlock>
        ) : done ? (
          <SuccessBlock>
            {icon ? icon : <AiOutlineCheckCircle />}
            <div>{doneMessage}</div>
          </SuccessBlock>
        ) : children ? (
          children
        ) : null}
      </ReportBlock>
    </Dialog>
  );
}

interface AlertModalProps {
  onCancel: () => void;
  visible: boolean;
  message?: string;
  messageBlock?: React.ReactNode;
  icon?: React.ReactNode;
}

function AlertModal({ onCancel, visible, icon, message, messageBlock }: AlertModalProps) {
  const onCancelAction = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Dialog mode="custom" onCancel={onCancelAction} visible={visible} customPadding="1rem">
      <ReportBlock>
        <FailBlock>
          <AiOutlineFrown />
          {messageBlock ? messageBlock : <div>{message}</div>}
        </FailBlock>
      </ReportBlock>
    </Dialog>
  );
}

export default ProcessModal;
export { AlertModal };
