import React, { useEffect, useRef, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import palette, { hexToRGB } from '../../styles/palette';
import Flag from '../../components/common/Flag';
import { ShopsInterface } from '../../api/getShops';
import { getScore } from '../../lib/scoreUtil';
import { locationToString } from '../../lib/shopUtil';
import BlankImage from './blank.png';
import { useSpring, animated } from 'react-spring';

const RestaurantCardBlock = styled(animated.button)`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 12.5px;

  font-family: inherit;

  -webkit-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);

  .image {
    margin: 20px 10px;
    width: 89px;
    height: 91px;
    border-radius: 10px;

    background-size: cover;
    background-position: center;
    @media only screen and (max-width: 330px) {
      /* width: 53.4px;
      height: 54.6px; */
    }
  }

  .content {
    flex: 1;
    align-items: center;
    text-align: left;
    margin: 0 10px;

    .name {
      font-size: 15px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    .loc {
      font-size: 10px;
      font-weight: normal;
      margin-bottom: 15px;
    }
    .tags {
      display: flex;
      font-size: 10px;
      font-weight: normal;
      align-items: center;
      .tag {
        /* border: 1px solid ${hexToRGB(palette.middleGray, 1)}; */
        border-radius: 10px;
        /* padding: 2.5px 7.5px; */
        color: ${palette.middleGray};
      }
      .tag + .tag {
        margin-left: 5px;
      }
    }
  }
  .flagContainer {
    margin-left: auto;
    align-self: flex-start;
  }
`;

interface RestaurantCardProps {
  shop: ShopsInterface;
  delay: number;
}

function RestaurantCard({ shop, delay }: RestaurantCardProps) {
  const appear = useSpring({
    from: {
      transform: `translateY(50px) scale(0.9)`,
      opacity: 0,
    },
    to: {
      transform: `translateY(0px) scale(1)`,
      opacity: 1,
    },
    config: {
      tension: 350,
      friction: 25,
    },
    delay: delay || 0,
  });

  return (
    <RestaurantCardBlock style={appear}>
      <div
        style={{
          backgroundImage: `url(${
            shop.shopImage.length
              ? 'https://bacon-shop-origin.s3.ap-northeast-2.amazonaws.com/images/a81978d0-3911-469b-8285-8bc30c1b1baf1597997778312.jpeg'
              : BlankImage
          })`,
        }}
        className="image"
      />
      <div className="content">
        <div className="name">{shop.name}</div>
        <div className="loc">{locationToString(shop.location)}</div>
        <div className="tags">
          <div className="tag">#가성비</div>
          <div className="tag">#혼밥</div>
        </div>
      </div>
      <div className="flagContainer">
        <Flag
          descColor={palette.darkGray}
          descText={shop.scoreAverage ? `${shop.scoreAverage.toPrecision(3)}학점` : '0.0학점'}
          flagBackColor="gray"
          titleColor={shop.scoreAverage ? palette.mainRed : 'black'}
          titleText={getScore(shop.scoreAverage)}
          marginRight="10px"
        />
      </div>
    </RestaurantCardBlock>
  );
}

export default RestaurantCard;
