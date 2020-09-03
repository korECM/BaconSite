import React, { useEffect } from 'react';
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
  children?: React.ReactNode;
  afterDone?: () => void;
}

function ProcessModal({ done, setDone, doneMessage, error, loading, onCancel, visible, children, afterDone }: ProcessModalProps) {
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

  return (
    <Dialog mode="custom" onCancel={onCancel} visible={visible} customPadding="1rem">
      <ReportBlock>
        {error ? (
          <FailBlock>
            <AiOutlineFrown />
            <div>오류가 발생했습니다 : {error}</div>
          </FailBlock>
        ) : loading ? (
          <LoaderBlock>
            <BounceLoader color={palette.mainRed} size="30" />
          </LoaderBlock>
        ) : done ? (
          <SuccessBlock>
            <AiOutlineCheckCircle />
            <div>{doneMessage}</div>
          </SuccessBlock>
        ) : children ? (
          children
        ) : null}
      </ReportBlock>
    </Dialog>
  );
}

export default ProcessModal;
