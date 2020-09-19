import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getShopReportAPI, ShopReportResponse } from 'api/report';
import { dateToString } from 'lib/date';
import palette from 'styles/palette';
import { apiLink } from 'lib/getAPILink';
import { shopReportStateToString } from 'lib/report';
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

interface ReportBlockInterface {
  report: ShopReportResponse;
  request: () => void;
}

function ReportBlock({ report, request }: ReportBlockInterface) {
  const setConfirm = async () => {
    try {
      await axios.put(
        apiLink() + `/report/shop/${report._id}`,
        {
          state: 'confirm',
        },
        { withCredentials: true },
      );
      request();
    } catch (error) {
      console.error(error);
    }
  };
  const setDone = async () => {
    try {
      await axios.put(
        apiLink() + `/report/shop/${report._id}`,
        {
          state: 'done',
        },
        { withCredentials: true },
      );
      request();
    } catch (error) {
      console.error(error);
    }
  };
  const setRejected = async () => {
    try {
      await axios.put(
        apiLink() + `/report/shop/${report._id}`,
        {
          state: 'rejected',
        },
        { withCredentials: true },
      );
      request();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Report>
      <div>
        가게 이름 : {report.shopId.name} <a href={`/admin/shop/${report.shopId._id}/data`}>가게 수정</a>
      </div>
      <div>신고 타입</div>
      <div>신고 사유 : {report.comment}</div>
      <div>상태 : {shopReportStateToString(report.state)}</div>
      <div>신고일 : {dateToString(report.registerDate)}</div>

      <div>{report.state === 'issued' && <button onClick={() => setConfirm()}>확인 처리</button>}</div>
      <div>
        {report.state === 'confirmed' && (
          <>
            <button onClick={() => setDone()}>처리 완료</button>
            <button onClick={() => setRejected()}>신고 거절</button>
          </>
        )}
      </div>
    </Report>
  );
}

function AdminReviewReport() {
  const [report, setReport] = useState<ShopReportResponse[]>([]);

  const request = async () => {
    const response = await getShopReportAPI();
    setReport(response);
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <AdminReviewReportBlock>
      <ReportContainer>
        <div>처리 중</div>
        {report.filter((report) => report.state === 'confirmed').length > 0
          ? report
              .filter((report) => report.state === 'confirmed')
              .map((report) => <ReportBlock report={report} key={`${report.registerDate}`} request={request} />)
          : '없음'}
        <div>접수됨</div>
        {report.filter((report) => report.state !== 'confirmed').length > 0
          ? report
              .filter((report) => report.state !== 'confirmed')
              .map((report) => <ReportBlock report={report} key={`${report.registerDate}`} request={request} />)
          : '없음'}
      </ReportContainer>
    </AdminReviewReportBlock>
  );
}

export default withRouter(AdminReviewReport);
