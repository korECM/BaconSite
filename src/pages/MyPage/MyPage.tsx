import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import { AiTwotoneHeart, AiFillEdit } from 'react-icons/ai';
import RestaurantCard from '../../components/common/RestaurantCard';
import { Link, Redirect } from 'react-router-dom';
import useMyPage from '../../hooks/useMyPage';
import Comment from '../DetailPage/Comment';
import useCheck from '../../hooks/useCheck';

const MyPageBlock = styled.div``;
const NameBlock = styled.div`
  display: flex;
  align-items: center;

  padding: 30px;

  background-color: ${palette.white};
  .name {
    font-size: 12px;
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
  // 해야 AllButton margin 적용 됨
  padding-bottom: 0.1px;
  .comments {
    padding: 0 20px;
    .commentWrapper + .commentWrapper {
      margin-top: 15px;
    }
  }
`;

const AllButton = styled(Link)`
  color: ${palette.mainRed};
  display: block;
  width: 100px;
  margin: 30px auto;
  font-size: 12.5px;
  text-align: center;
  cursor: pointer;
`;

function MyPage() {
  const { getMyShop, getMyReview, logoutDispatch, shops, reviews } = useMyPage();
  const { user } = useCheck();

  useEffect(() => {
    getMyShop();
    getMyReview();
  }, [getMyShop, getMyReview]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" titleColor={palette.mainRed} titleText="마이푸딩" />
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
                shops.data.map((shop, index) => (
                  <Link to={`/shop/${shop._id}`} key={shop._id}>
                    <RestaurantCard shop={shop} delay={index} />
                  </Link>
                ))}
            </div>
            <AllButton to="" className="allButton">
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
              reviews.data.map((review, index) => (
                <div className="commentWrapper" key={review._id}>
                  <Comment
                    review={review}
                    index={index}
                    commentLikeOffset={Array.from(Array(reviews.data?.length)).map(() => 0)}
                    likeComment={() => {}}
                    openReviewReport={() => {}}
                  />
                </div>
              ))}
          </div>
          <AllButton to="" className="allButton">
            전체보기 {'>'}
          </AllButton>
        </ReviewBlock>
      </MyPageBlock>
    </Container>
  );
}

export default MyPage;
