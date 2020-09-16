import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { ShopUIInterface } from '../../modules/detail';
import Button from '../../components/common/Button';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import { Image } from '../../api/getShop';
import { AdminElementInterface } from './AdminDetail';
import palette, { hexToRGB } from '../../styles/palette';
import ButtonGroup from 'components/common/ButtonGroup';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const AdminShopImageBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  background-color: ${hexToRGB(palette.middleLightGray, 0.5)};
  border-radius: 15px;
  padding: 10px;
  overflow-x: scroll;
  align-items: center;
  .imageContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    height: 100%;
    a {
      margin: auto 0;
      cursor: pointer;
      img {
        width: 45vw;
        max-height: 120px;
      }
    }
    button {
      padding: 5px 10px;
      border-radius: 10px;
      font-size: 12px;
    }
  }
`;

interface AdminImageProps extends AdminElementInterface, RouteComponentProps {
  images: Image[];
  type: 'shop' | 'menu';
}

function AdminImage({ images, reload, type, confirmAlert, match }: AdminImageProps) {
  const shopId: string = (match.params as any).shopId;

  const onDelete = useCallback(
    (imageId: string) => {
      const request = async () => {
        await axios.delete(`${apiLink()}/shop/${type}Image/${imageId}`, {
          withCredentials: true,
        });
        await reload();
      };
      if (confirmAlert()) request();
    },
    [reload, type, confirmAlert],
  );

  const setMainImage = useCallback(
    (imageLink: string) => {
      const request = async () => {
        await axios.post(
          `${apiLink()}/shop/mainImage/${shopId}`,
          {
            imageLink,
          },
          {
            withCredentials: true,
          },
        );
        await reload();
      };
      if (confirmAlert()) request();
    },
    [reload, confirmAlert, shopId],
  );

  return (
    <AdminShopImageBlock>
      {images.map((image) => (
        <div key={image._id} className="imageContainer">
          <a href={image.imageLink}>
            <img src={image.imageLink} alt="가게 관련 사진" />
          </a>
          <ButtonGroup direction="column" gap="5px">
            {type === 'shop' && (
              <Button theme="red" onClick={() => setMainImage(image.imageLink)}>
                가게 사진 설정
              </Button>
            )}
            <Button theme="red" onClick={() => onDelete(image._id)}>
              삭제
            </Button>
          </ButtonGroup>
        </div>
      ))}
    </AdminShopImageBlock>
  );
}

export default withRouter(AdminImage);
