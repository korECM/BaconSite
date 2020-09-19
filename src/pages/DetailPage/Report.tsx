import React from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import RoundContainer from '../../components/common/RoundContainer';
import palette from '../../styles/palette';
import { ReviewInterface } from '../../api/review';
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
    .state {
      margin-left: 10px;
      color: ${palette.mainRed};
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
  title: string;
  text: string;
  date: Date | string;
  state: string;
}

function Report({ date, state, text, title }: CommentProps) {
  return (
    <CommentBlock theme="gray">
      <div className="contentContainer">
        <div className="name">{title}</div>
        <div className="content">{text}</div>
        <div className="detail">
          {[new Date(date)].map((date) => (
            <div key={date.toString()}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</div>
          ))}
          <div className="state">{state}</div>
        </div>
      </div>
    </CommentBlock>
  );
}

export default Report;
