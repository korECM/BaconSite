import React from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { ShopsInterface } from 'api/getShops';
import { ReviewInterface } from 'api/review';
import { MyReportResponse } from 'api/report';

const AllViewerBlock = styled.div``;

interface AllViewerProps {
  shops?: ShopsInterface[];
  reviews?: ReviewInterface[];
  reports?: MyReportResponse[];
}

function AllViewer({ reports, reviews, shops }: AllViewerProps) {
  if (shops) {
  } else if (reports) {
  } else if (reviews) {
  } else {
    return null;
  }
  return <AllViewerBlock></AllViewerBlock>;
}

export default AllViewer;
