import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Button from '../../components/common/Button';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import { AdminElementInterface } from './AdminDetail';
import { ReviewInterface } from '../../api/review';
import ButtonGroup from '../../components/common/ButtonGroup';

const CommentContainer = styled.div`
  color: ${palette.darkGray};
`;

const Comment = styled.div`
  margin: 15px 0;
  padding: 5px;

  border: 1px solid ${palette.middleGray};

  p {
    margin: 5px 0;
    font-size: 12px;
  }
  p.desc {
    font-size: 10px;
  }
  button {
    margin: 0;
  }
`;

interface AdminReviewInformationProps extends AdminElementInterface {
  reviews: ReviewInterface[] | null;
}

function AdminReviewInformation({ reviews, reload, confirmAlert }: AdminReviewInformationProps) {
  const onButtonClick = useCallback(
    (reviewId: string) => {
      if (!confirmAlert()) return;
      const request = async () => {
        await axios.delete(`${apiLink()}/shop/review/${reviewId}`, { withCredentials: true });
        reload();
      };
      request();
    },
    [reload, confirmAlert],
  );

  return (
    <CommentContainer>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <Comment key={review._id}>
            <p>작성자 : {review.user.name}</p>
            <p>내용 : {review.comment}</p>
            <p className="desc">
              좋아요 : {review.likeNum} 작성일 : {new Date(review.registerDate).toISOString()}
            </p>
            <ButtonGroup direction="column" gap="0" rightAlign>
              <Button theme="red" onClick={() => onButtonClick(review._id)}>
                삭제
              </Button>
            </ButtonGroup>
          </Comment>
        ))
      ) : (
        <p>작성된 댓글이 아직 없어요</p>
      )}
    </CommentContainer>
  );
}

export default AdminReviewInformation;
