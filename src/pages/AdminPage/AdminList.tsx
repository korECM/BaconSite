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
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
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
          shops.data.map((data) => (
            <ShopBlock key={data.name}>
              <h1>{data.name}</h1>
              <div>
                <a href={`/admin/shop/${data._id}`}>가게 정보 수정</a>
                <a href={`/shop/${data._id}`}>가게 페이지</a>
              </div>
            </ShopBlock>
          ))}
      </ShopBlockContainer>
    </AdminListBlock>
  );
}

export default AdminList;
