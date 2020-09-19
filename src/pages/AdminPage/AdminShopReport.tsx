import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getReviewReportAPI, ReviewReportResponse } from 'api/report';
import { dateToString } from 'lib/date';
import palette from 'styles/palette';
import { deleteReviewAPI } from 'api/review';
import { apiLink } from 'lib/getAPILink';
import { reviewReportStateToString } from 'lib/report';
import { withRouter } from 'react-router-dom';

const AdminReviewReportBlock = styled.div``;

const ReportContainer = styled.div``;

const Report = styled.div`
  margin: 10px;

  padding: 10px;

  border: 1px solid ${palette.middleGray};

  font-size: 13px;

  div {
    margin: 10px 0;
    display: flex;
    align-items: center;

    a {
      margin-left: auto;
      color: ${palette.mainRed};
    }
  }

  .comment {
    display: block;
    border: 1px solid ${palette.middleGray};
    padding: 10px;
    margin: 5px;
  }

  button {
    border: 1px solid ${palette.middleGray};
    border-radius: 10px;
    outline: none;
    padding: 5px 20px;
    margin-right: 10px;
    background-color: transparent;
  }
`;

function AdminReviewReport() {
  const [report, setReport] = useState<ReviewReportResponse[]>([]);

  const request = async () => {
    const response = await getReviewReportAPI();
    setReport(response);
  };

  const deleteComment = async (report: ReviewReportResponse) => {
    try {
      await deleteReviewAPI(report.reviewId._id);
      await axios.put(
        apiLink() + `/report/review/${report._id}`,
        {
          state: 'done',
        },
        {
          withCredentials: true,
        },
      );
      request();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectReport = async (report: ReviewReportResponse) => {
    try {
      await axios.put(
        apiLink() + `/report/review/${report._id}`,
        {
          state: 'reject',
        },
        {
          withCredentials: true,
        },
      );
      request();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <AdminReviewReportBlock>
      <ReportContainer>
        {report.map((report) => (
          <Report key={`${report.registerDate}`}>
            <div>신고한 사람 : {report.userId.name}</div>
            <div className="comment">
              <div>댓글 작성자 : {report.reviewId.user.name}</div>
              <div>내용 : {report.reviewId.comment}</div>
            </div>
            <div>신고 사유 : {report.comment}</div>
            <div>상태 : {reviewReportStateToString(report.state)}</div>
            <div>신고일 : {dateToString(report.registerDate)}</div>
            <div>
              <button onClick={() => deleteComment(report)}>댓글 삭제</button>
              <button onClick={() => rejectReport(report)}>신고 거절</button>
              <a href={`/shop/${report.reviewId.shop}`}>신고한 가게</a>
            </div>
          </Report>
        ))}
      </ReportContainer>
    </AdminReviewReportBlock>
  );
}

export default withRouter(AdminReviewReport);
