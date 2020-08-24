import React from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import RoundContainer from '../../components/common/RoundContainer';
import palette from '../../styles/palette';
import { ReviewInterface } from '../../api/getReview';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const CommentBlock = styled(RoundContainer)`
  display: flex;

  text-align: left;
  align-items: center;
  padding: 5px 20px;
  padding-right: 10px;

  margin: 0;

  & + & {
    margin-top: 20px;
  }

  .contentContainer {
    flex: 1;
  }

  .name {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .content {
    margin-top: 5px;
    font-size: 11.5px;
    line-height: 1.5;
  }

  .detail {
    margin-top: 5px;
    font-size: 10px;
    display: flex;
    align-items: center;
    .likeNum,
    .report {
      margin-left: 10px;
    }

    .report {
      padding: 0;
      font: inherit;
      border: none;
      outline: none;
      background-color: transparent;
      color: ${palette.middleGray};
      cursor: pointer;
    }
    .likeNum {
      font-weight: bold;
    }
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: auto;
    padding: 15px;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

interface CommentProps {
  review: ReviewInterface;
  index: number;
  openReviewReport: (reviewId: string) => void;
  likeComment: any;
  commentLikeOffset: number[];
}

function Comment({ review, index, openReviewReport, likeComment, commentLikeOffset }: CommentProps) {
  return (
    <CommentBlock theme="gray" delay={index * 150}>
      <div className="contentContainer">
        <div className="name">{review.user.name}</div>
        <div className="content">{review.comment}</div>
        <div className="detail">
          {[new Date(review.registerDate)].map((date) => (
            <div key={date.toString()}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</div>
          ))}
          ``
          <div className="likeNum">좋아요 {review.likeNum + commentLikeOffset[index]}개</div>
          <button onClick={() => openReviewReport(review._id)} className="report">
            신고하기
          </button>
        </div>
      </div>
      <button onClick={() => likeComment(index)}>
        {commentLikeOffset[index] === 0 ? (
          review.didLike ? (
            <MdFavorite style={{ color: palette.mainRed }} />
          ) : (
            <MdFavoriteBorder />
          )
        ) : commentLikeOffset[index] === 1 ? (
          <MdFavorite style={{ color: palette.mainRed }} />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>
    </CommentBlock>
  );
}

export default Comment;
