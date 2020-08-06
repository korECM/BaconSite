import React from 'react';
import styled from 'styled-components';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import DropBox from '../../components/common/DropBox';

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
  button {
    flex: 1;
    font-weight: 500;
    font-size: 12.5px;
    padding: 12.5px 10px;
  }
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

function WriteReviewPage() {
  const onDropBoxChange = (data: string) => {
    console.log(data);
  };

  return (
    <Container color="red">
      <Header category="modal" headerColor="red" />
      <Title>이 식당의 특징은?</Title>
      <ButtonGroup>
        <ButtonSubGroup>
          <Button theme="white">가성비</Button>
          <Button theme="white" selected>
            분위기
          </Button>
          <Button theme="white" selected>
            단체
          </Button>
        </ButtonSubGroup>
        <ButtonSubGroup>
          <Button theme="white">혼밥</Button>
          <Button theme="white" selected>
            밥약
          </Button>
          <Button theme="white">안매워요</Button>
        </ButtonSubGroup>
      </ButtonGroup>
      <ScoreContainer>
        <span className="text">자네의 학점은</span>
        <DropBox dataSet={ScoreOptions} onChange={onDropBoxChange} />
        <span className="text">일세!</span>
      </ScoreContainer>

      <Title>리뷰를 공유해주세요!</Title>
      <FlexContainer>
        <TextAreaBlock rows={16} placeholder="내용을 작성해주세요."></TextAreaBlock>
      </FlexContainer>
      <FlexContainer>
        <SubmitButton theme="white">작성하기</SubmitButton>
      </FlexContainer>
    </Container>
  );
}

export default WriteReviewPage;
