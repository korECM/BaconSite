import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { getShopReportAPI, ShopReportResponse, ShopReportState } from 'api/report';
import palette from 'styles/palette';
import { reportTypeToString, shopReportStateToString } from 'lib/report';
import { apiLink } from 'lib/getAPILink';
import { dateToString } from 'lib/date';

const AdminShopReportBlock = styled.div``;

const ReportContainer = styled.div``;

const Report = styled.div`
  margin: 10px;

  padding: 10px;

  border: 1px solid ${palette.middleGray};

  div {
    margin: 10px 0;

    display: flex;

    a {
      margin-left: auto;
      color: ${palette.mainRed};
    }
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

interface ReportBlockProps {
  report: ShopReportResponse;
  request: () => void;
}

function ReportBlock({ report, request }: ReportBlockProps) {
  const setReportState = async (mode: 'confirm' | 'done' | 'reject') => {
    try {
      await axios.put(
        apiLink() + `/report/shop/${report._id}`,
        {
          state: mode,
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

  return (
    <Report>
      <ReportContainer>
        가게 이름 : {report.shopId.name} <a href={`/admin/shop/${report.shopId._id}/data`}>가게 수정</a>
      </ReportContainer>
      <div>신고 사유 : {report.type && report.type.map((type) => reportTypeToString(type)).join(', ')}</div>
      <div>코멘트 : {report.comment}</div>
      <div>신고일 : {dateToString(report.registerDate)}</div>
      <div>상태 : {shopReportStateToString(report.state)}</div>
      {report.state === ShopReportState.Issued && <button onClick={() => setReportState('confirm')}>확인 중으로 변경</button>}
      {report.state === ShopReportState.Confirmed && (
        <>
          <button onClick={() => setReportState('done')}>처리 완료</button>
          <button onClick={() => setReportState('reject')}>거절</button>
        </>
      )}
    </Report>
  );
}

function AdminShopReport() {
  const [report, setReport] = useState<ShopReportResponse[]>([]);

  const request = async () => {
    const response = await getShopReportAPI();
    setReport(response);
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <AdminShopReportBlock>
      확인중
      <ReportContainer>
        {report
          .filter((report) => report.state === ShopReportState.Confirmed)
          .map((report) => (
            <ReportBlock report={report} key={`${report.registerDate}`} request={request} />
          ))}
      </ReportContainer>
      접수됨
      <ReportContainer>
        {report
          .filter((report) => report.state !== ShopReportState.Confirmed)
          .map((report) => (
            <ReportBlock report={report} key={`${report.registerDate}`} request={request} />
          ))}
      </ReportContainer>
    </AdminShopReportBlock>
  );
}

export default AdminShopReport;
