import React, { useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import DropBox from '../../components/common/DropBox';
import useWriteReview from '../../hooks/useWriteReview';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: 900;
  margin-top: 80px;
  margin-bottom: 35px;
`;

const ButtonGroup = styled.div``;

const ButtonSubGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  button {
    flex: 1;
    font-weight: 500;
    font-size: 12.5px;
    padding: 12.5px 10px;
  }
`;

const ButtonWithMargin = styled(Button)`
  margin: 0 5px;
`;

const ScoreContainer = styled.div`
  display: flex;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  span.text {
    font-size: 18px;
    text-align: center;
    font-weight: 500;
  }
  .score {
    margin: 0 15px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

const TextAreaBlock = styled.textarea`
  resize: none;
  flex: 1;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 30px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 12.5px;
`;

const SubmitButton = styled(Button)`
  margin: 20px 0;
  margin-left: auto;
`;

const ScoreOptions = [
  // { value: '4.5', label: '4.5점(A+)' },
  // { value: '4.0', label: '4.0점(A0)' },
  // { value: '3.5', label: '3.5점(B+)' },
  // { value: '3.0', label: '3.0점(B0)' },
  // { value: '2.5', label: '2.5점(C+)' },
  // { value: '2.0', label: '2.0점(C0)' },
  // { value: '1.5', label: '1.5점(D+)' },
  // { value: '1.0', label: '1.0점(D0)' },
  { value: '4.5', label: 'A+' },
  { value: '4.0', label: 'A0' },
  { value: '3.5', label: 'B+' },
  { value: '3.0', label: 'B0' },
  { value: '2.5', label: 'C+' },
  { value: '2.0', label: 'C0' },
  { value: '1.5', label: 'D+' },
  { value: '1.0', label: 'D0' },
];

function WriteReviewPage({ match, history }: RouteComponentProps) {
  const shopId = (match.params as any).shopId;

  const { keywords, onChangeInputDispatch, onSubmit, onClick, reset, review, reviewRequest } = useWriteReview(shopId);

  const { user } = useCheck();

  const onChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeInputDispatch(event.target.name, event.target.value);
  };

  const onDropBoxChange = (data: string) => {
    onChangeInputDispatch('score', data);
  };

  useEffect(() => {
    reset();
  }, [reset]);
  useEffect(() => {
    onDropBoxChange('4.5');
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (reviewRequest.data !== null) {
      history.push(`/shop/${shopId}`);
    }
  }, [reviewRequest.data, shopId, history]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Container color="red">
      <Header category="modal" headerColor="red" />
      <Title>이 식당의 특징은?</Title>
      <ButtonGroup>
        <ButtonSubGroup>
          <ButtonWithMargin theme="white" onClick={() => onClick('costRatio')} selected={keywords.costRatio}>
            가성비
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('atmosphere')} selected={keywords.atmosphere}>
            분위기
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('group')} selected={keywords.group}>
            단체
          </ButtonWithMargin>
        </ButtonSubGroup>
        <ButtonSubGroup>
          <ButtonWithMargin theme="white" onClick={() => onClick('individual')} selected={keywords.individual}>
            혼밥
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('riceAppointment')} selected={keywords.riceAppointment}>
            밥약
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('spicy')} selected={keywords.spicy}>
            안매워요
          </ButtonWithMargin>
        </ButtonSubGroup>
      </ButtonGroup>
      <ScoreContainer>
        <span className="text">자네의 학점은</span>
        <DropBox dataSet={ScoreOptions} onChange={onDropBoxChange} />
        <span className="text">일세!</span>
      </ScoreContainer>

      <Title>리뷰를 공유해주세요!</Title>
      <FlexContainer>
        <TextAreaBlock rows={16} placeholder="내용을 작성해주세요." name="review" onChange={onChangeEvent}>
          {review}
        </TextAreaBlock>
      </FlexContainer>
      <FlexContainer>
        <SubmitButton theme="white" onClick={onSubmit}>
          작성하기
        </SubmitButton>
      </FlexContainer>
    </Container>
  );
}

export default withRouter(WriteReviewPage);
