import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import { AiTwotoneHeart, AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import RestaurantCard from '../../components/common/RestaurantCard';
import { Link, Redirect } from 'react-router-dom';
import useMyPage from '../../hooks/useMyPage';
import Comment from '../DetailPage/Comment';
import useCheck from '../../hooks/useCheck';
import Report from 'pages/DetailPage/Report';
import { generalReportStateToString } from 'lib/report';
import useDetail from 'hooks/useDetail';
import ProcessModal from 'components/common/ProcessModal';
import ButtonGroup from 'components/common/ButtonGroup';
import Button from 'components/common/Button';

const MyPageBlock = styled.div``;
const NameBlock = styled.div`
  display: flex;
  align-items: center;

  padding: 30px;

  background-color: ${palette.white};
  .name {
    font-size: 12px;
    color: black;
    span {
      font-size: 20px;
    }
  }
  button {
    border: 1px solid ${palette.middleGray};
    padding: 6.5px 15px;
    border-radius: 15px;
    outline: none;
    background-color: transparent;
    margin-left: auto;

    font-size: 10px;
    font-weight: lighter;
  }
`;

const InHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${palette.white};
  padding: 20px 30px;
  font-size: 17px;
  svg {
    margin-right: 10px;
    font-size: 1.5rem;
  }
  span {
    font-weight: bolder;
  }
`;

const GrayHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 20px 30px;
  font-size: 17px;

  margin-bottom: 20px;
  svg {
    margin-right: 10px;
    font-size: 1.5rem;
  }
  span {
  }
`;

const LikeBlock = styled.div`
  margin-top: 15px;

  .shopsContainer {
    margin-top: 25px;
    background-color: transparent;
    .shops {
      a {
        display: block;
      }
      a + a {
        margin-top: 15px;
      }
    }
  }
`;

const ReviewBlock = styled.div`
  background-color: ${palette.white};
  /* 해야 AllButton margin 적용 됨 */
  padding-bottom: 0.1px;
  .comments {
    padding: 0 20px;
    .commentWrapper + .commentWrapper {
      margin-top: 15px;
    }
  }
`;

const ReportBlock = styled.div`
  margin-top: 30px;
  padding-bottom: 0.1px;
  .comments {
    padding: 0 20px;
    .commentWrapper + .commentWrapper {
      margin-top: 15px;
    }
  }
`;

const AllButton = styled.button`
  color: ${palette.mainRed};
  border: none;
  outline: none;
  display: block;
  width: 100px;
  margin: 30px auto;
  font-size: 12.5px;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
`;

const ReviewReport = styled.div`
  textarea {
    resize: none;
    margin: 10px 0;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;

    border: 1px solid ${palette.middleGray};
  }
`;

const AllHeaderBlock = styled.div`
  border: none;
  border-radius: 10px;
  background-color: ${palette.mainRed};
  margin: 25px 0;
  padding: 12.5px 0;
  display: flex;
  align-items: center;
  color: white;
  .heart {
    margin-left: 20px;
    margin-right: 10px;
    font-size: 1.25rem;
  }
  span {
    font-size: 12.5px;
  }
`;

const AllBlock = styled.div`
  .shopsContainer {
    margin-top: 25px;
    background-color: transparent;
    .shops {
      a {
        display: block;
      }
      a + a {
        margin-top: 15px;
      }
    }
  }
  .comments {
    .commentWrapper + .commentWrapper {
      margin-top: 15px;
    }
  }
`;

const AllModeCloseButton = styled(AiOutlineClose)`
  outline: none;
  border: none;

  padding: 10px;

  margin-left: auto;
  margin-right: 10px;
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
`;

function MyPage() {
  const { getMyShop, getMyReview, logoutDispatch, getMyReport, shops, reviews, reports } = useMyPage();
  const { deleteReview, deleteReviewReportDispatch } = useDetail('');
  const [reviewDeleteNumber, setReviewDeleteNumber] = useState('');
  const [reviewDeleteDone, setReviewDeleteDone] = useState(false);

  type AllMode = 'none' | 'shops' | 'reviews' | 'reports';

  const { user } = useCheck();
  const [allMode, setAllMode] = useState<AllMode>('none');

  const [reviewDeleteAlert, setReviewDeleteAlert] = useState(false);

  const openReviewDelete = useCallback((reviewId: string) => {
    setReviewDeleteAlert(true);
    setReviewDeleteNumber(reviewId);
  }, []);

  useEffect(() => {
    getMyShop();
    getMyReview();
    getMyReport();
  }, [getMyShop, getMyReview, getMyReport]);

  useEffect(() => {
    if (deleteReview.data) {
      setReviewDeleteDone(true);
    }
  }, [deleteReview.data]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" titleColor={palette.mainRed} titleText="마이푸딩" />
      {allMode !== 'none' && (
        <AllHeaderBlock>
          <AiTwotoneHeart className="heart" />
          {allMode === 'shops' && <span>나중에 가려고 킵해둔 식당</span>}
          {allMode === 'reviews' && <span>{user.name}님의 리뷰</span>}
          {allMode === 'reports' && <span>내가 딱 잡아낸 신고와 정보 처리 현황</span>}
          <AllModeCloseButton onClick={() => setAllMode('none')} />
        </AllHeaderBlock>
      )}
      {allMode === 'none' && (
        <MyPageBlock>
          <NameBlock>
            <div className="name">
              <span>{user.name}</span>님, 반가워요!
            </div>
            <button onClick={logoutDispatch}>로그아웃</button>
          </NameBlock>
          <LikeBlock>
            <InHeader>
              <AiTwotoneHeart /> 가고싶어요
            </InHeader>
            <div className="shopsContainer">
              <div className="shops">
                {shops.data &&
                  shops.data.slice(0, 2).map((shop, index) => (
                    <Link to={`/shop/${shop._id}`} key={shop._id}>
                      <RestaurantCard shop={shop} delay={index} />
                    </Link>
                  ))}
              </div>
              <AllButton className="allButton" onClick={() => setAllMode('shops')}>
                전체보기 {'>'}
              </AllButton>
            </div>
          </LikeBlock>
          <ReviewBlock>
            <InHeader>
              <AiFillEdit />
              {user.name}
              <span>님의 리뷰</span>
            </InHeader>
            <div className="comments">
              {reviews.data &&
                reviews.data.slice(0, 2).map((review, index) => (
                  <div className="commentWrapper" key={review._id}>
                    <Comment
                      review={review}
                      index={index}
                      commentLikeOffset={Array.from(Array(reviews.data?.length)).map(() => 0)}
                      likeComment={() => {}}
                      openReviewReport={() => {}}
                      openDeleteReport={openReviewDelete}
                      userId={user._id}
                    />
                  </div>
                ))}
            </div>
            <AllButton className="allButton" onClick={() => setAllMode('reviews')}>
              전체보기 {'>'}
            </AllButton>
          </ReviewBlock>
          <ReportBlock>
            <GrayHeader>
              <AiFillEdit />
              <span>신고 처리 및 정보 수정 현황</span>
            </GrayHeader>
            <div className="comments">
              {reports.data &&
                reports.data.slice(0, 2).map((report, index) => (
                  <div className="commentWrapper" key={report.registerDate}>
                    <Report
                      title={report.title}
                      text={report.text.length > 0 ? report.text : '\u00A0'}
                      date={report.registerDate}
                      state={generalReportStateToString(report.state)}
                    />
                  </div>
                ))}
            </div>
            <AllButton className="allButton" onClick={() => setAllMode('reports')}>
              전체보기 {'>'}
            </AllButton>
          </ReportBlock>
        </MyPageBlock>
      )}
      {allMode === 'shops' && (
        <AllBlock>
          <div className="shopsContainer">
            <div className="shops">
              {shops.data &&
                shops.data.map((shop, index) => (
                  <Link to={`/shop/${shop._id}`} key={shop._id}>
                    <RestaurantCard shop={shop} delay={index} />
                  </Link>
                ))}
            </div>
          </div>
        </AllBlock>
      )}
      {allMode === 'reviews' && (
        <AllBlock>
          <div className="comments">
            {reviews.data &&
              reviews.data.map((review, index) => (
                <div className="commentWrapper" key={review._id}>
                  <Comment
                    review={review}
                    index={index}
                    commentLikeOffset={Array.from(Array(reviews.data?.length)).map(() => 0)}
                    likeComment={() => {}}
                    openReviewReport={() => {}}
                    openDeleteReport={openReviewDelete}
                    userId={user._id}
                  />
                </div>
              ))}
          </div>
        </AllBlock>
      )}
      {allMode === 'reports' && (
        <AllBlock>
          <div className="comments">
            {reports.data &&
              reports.data.map((report, index) => (
                <div className="commentWrapper" key={report.registerDate}>
                  <Report
                    title={report.title}
                    text={report.text.length > 0 ? report.text : '\u00A0'}
                    date={report.registerDate}
                    state={generalReportStateToString(report.state)}
                  />
                </div>
              ))}
          </div>
        </AllBlock>
      )}
      <ProcessModal
        onCancel={() => setReviewDeleteAlert(false)}
        visible={reviewDeleteAlert}
        done={reviewDeleteDone}
        setDone={setReviewDeleteDone}
        doneMessage="댓글이 정상적으로 삭제되었습니다"
        afterDone={() => window.location.reload(false)}
        error={deleteReview.error}
        loading={deleteReview.loading}
      >
        <ReviewReport>
          <h1 style={{ marginTop: '20px', marginBottom: '40px', textAlign: 'center' }}>정말로 댓글을 삭제하시겠습니까?</h1>
          <ButtonGroup direction="row" gap="10px" rightAlign>
            <Button theme="text" onClick={() => setReviewDeleteAlert(false)}>
              닫기
            </Button>
            <Button theme="red" onClick={() => deleteReviewReportDispatch(reviewDeleteNumber)}>
              삭제하기
            </Button>
          </ButtonGroup>
        </ReviewReport>
      </ProcessModal>
    </Container>
  );
}

export default MyPage;
