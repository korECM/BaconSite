import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getImageReportAPI, getReviewReportAPI, ImageReportResponse, ReviewReportResponse } from 'api/report';
import { dateToString } from 'lib/date';
import palette from 'styles/palette';
import { deleteReviewAPI } from 'api/review';
import { apiLink } from 'lib/getAPILink';
import { imageReportStateToString, reviewReportStateToString } from 'lib/report';
import { withRouter } from 'react-router-dom';

const AdminImageReportBlock = styled.div``;

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

  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    object-position: center;
  }
`;

function AdminImageReport() {
  const [report, setReport] = useState<ImageReportResponse[]>([]);

  const request = async () => {
    const response = await getImageReportAPI();
    setReport(response);
  };

  const deleteImage = async (report: ImageReportResponse) => {
    try {
      await axios.delete(apiLink() + `/shop/${report.imageId.type}Image/${report.imageId._id}`, {
        withCredentials: true,
      });

      await axios.put(
        apiLink() + `/report/image/${report._id}`,
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

  const rejectReport = async (report: ImageReportResponse) => {
    try {
      await axios.put(
        apiLink() + `/report/image/${report._id}`,
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
    <AdminImageReportBlock>
      <ReportContainer>
        {report.map((report) => (
          <Report key={`${report.registerDate}`}>
            <div>
              <img src={report.imageId.imageLink} alt="사진" />
            </div>
            <div>가게 이름 : {report.imageId.shopId.name}</div>
            <div>신고일 : {dateToString(report.registerDate)}</div>
            <div>상태 : {imageReportStateToString(report.state)}</div>
            <div>
              <button onClick={() => deleteImage(report)}>사진 삭제</button>
              <button onClick={() => rejectReport(report)}>신고 거절</button>
              <a href={`/shop/${report.imageId.shopId._id}`}>신고한 가게</a>
            </div>
          </Report>
        ))}
      </ReportContainer>
    </AdminImageReportBlock>
  );
}

export default withRouter(AdminImageReport);
