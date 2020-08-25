import React, { useEffect } from 'react';
import styled from 'styled-components';
import useShops from '../../hooks/useShops';
import palette, { hexToRGB } from '../../styles/palette';

const AdminListBlock = styled.div``;

const ShopBlockContainer = styled.div``;

const ShopBlock = styled.div`
  background-color: ${hexToRGB(palette.mainRed, 0.5)};
  margin: 20px;
  padding: 10px;
  color: white;
  border-radius: 10px;
  font-size: 12.5px;
  .shopHeader {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: 5px;
    }
  }
  .info {
    display: flex;
    margin-bottom: 15px;
    padding-left: 5px;
    div {
      margin-right: 10px;
    }
  }
  .href {
    padding-left: 5px;
    padding-bottom: 10px;
    a {
      border: 1px solid white;
      border-radius: 10px;
      padding: 5px 10px;
      margin-right: 10px;
    }
  }
`;

function AdminList() {
  const { onGetShops, shops } = useShops();

  useEffect(() => {
    onGetShops({});
  }, [onGetShops]);

  return (
    <AdminListBlock>
      <ShopBlockContainer>
        {shops.data &&
          shops.data.map((shop) => (
            <ShopBlock key={shop.name}>
              <div className="shopHeader">
                <h1>{shop.name}</h1>
              </div>
              <div className="info">
                <div>Like : {shop.likerCount}</div>
                <div>Review : {shop.reviewCount}</div>
              </div>
              <div className="href">
                <a href={`/admin/shop/${shop._id}`}>가게 정보 수정</a>
                <a href={`/shop/${shop._id}`}>가게 페이지</a>
              </div>
            </ShopBlock>
          ))}
      </ShopBlockContainer>
    </AdminListBlock>
  );
}

export default AdminList;
