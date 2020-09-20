import React, { useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import useWriteReview from '../../hooks/useWriteReview';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import useCheck from '../../hooks/useCheck';
import palette from 'styles/palette';
import useDetail from 'hooks/useDetail';

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
  justify-content: center;
  margin-bottom: 20px;
  button {
    flex: 1;
    font-weight: 500;
    font-size: 12.5px;
    padding: 12.5px 10px;
    max-width: 100px;
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
    font-weight: bolder;
  }
  .score {
    margin: 0 15px;
  }
  select {
    width: 100px;
    padding: 0.7em 0.5em;
    margin: 0 10px;
    padding-left: 40px;
    padding-right: 30px;
    color: ${palette.mainRed};
    font-weight: bolder;
    font-family: inherit;
    background: url(https://d3ojewq8movb4o.cloudfront.net/downArrow.png) no-repeat 95% 50%;
    background-color: white;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10px;
  }

  select::-ms-expand {
    /* for IE 11 */
    display: none;
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

  const { keywords, onChangeInputDispatch, onSubmit, onClick, reset, review, reviewRequest, score } = useWriteReview(shopId);

  const { checkReview, checkTodayReviewDispatch } = useDetail(shopId);

  const { user } = useCheck();

  const onChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeInputDispatch(event.target.name, event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeInputDispatch('score', event.target.value);
  };

  useEffect(() => {
    checkTodayReviewDispatch();
  }, [shopId, checkTodayReviewDispatch]);

  useEffect(() => {
    if (checkReview.error) {
      history.push(`/shop/${shopId}`);
    }
  }, [checkReview.error, shopId, history]);

  useEffect(() => {
    reset();
  }, [reset]);
  useEffect(() => {
    onChangeInputDispatch('score', '4.5');
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
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <Title>이 식당의 특징은?</Title>
      <ButtonGroup>
        <ButtonSubGroup>
          <ButtonWithMargin theme="white" onClick={() => onClick('costRatio')} selected={keywords.costRatio}>
            가성비
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('atmosphere')} selected={keywords.atmosphere}>
            분위기
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('riceAppointment')} selected={keywords.riceAppointment}>
            밥약
          </ButtonWithMargin>
        </ButtonSubGroup>
        <ButtonSubGroup>
          <ButtonWithMargin theme="white" onClick={() => onClick('individual')} selected={keywords.individual}>
            혼밥
          </ButtonWithMargin>
          <ButtonWithMargin theme="white" onClick={() => onClick('group')} selected={keywords.group}>
            단체
          </ButtonWithMargin>
          {/* <ButtonWithMargin theme="white" onClick={() => onClick('spicy')} selected={keywords.spicy}>
            매워요
          </ButtonWithMargin> */}
        </ButtonSubGroup>
      </ButtonGroup>
      <ScoreContainer>
        <span className="text">자네의 학점은</span>
        <select value={score} onChange={onSelectChange}>
          {ScoreOptions.map((data) => (
            <option value={data.value} key={data.value}>
              {data.label}
            </option>
          ))}
        </select>
        <span className="text">일세!</span>
      </ScoreContainer>

      <Title>리뷰를 공유해주세요!</Title>
      <FlexContainer>
        <TextAreaBlock maxLength={500} rows={16} placeholder="내용을 작성해주세요." name="review" onChange={onChangeEvent} value={review} />
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
