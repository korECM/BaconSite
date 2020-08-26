import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { ShopUIInterface } from '../../modules/detail';
import Button from '../../components/common/Button';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import { Image } from '../../api/getShop';
import { AdminElementInterface } from './AdminDetail';

const AdminShopImageBlock = styled.div`
  display: flex;
  width: 100%;
  height: 140px;
  overflow-x: scroll;
  align-items: center;
  .imageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    height: 100%;
    a {
      margin: auto 0;
      cursor: pointer;
      img {
        width: 35vw;
        max-height: 100px;
      }
    }
    button {
      margin-top: auto;
      margin-bottom: 0;
    }
  }
`;

interface AdminImageProps extends AdminElementInterface {
  images: Image[];
  type: 'shop' | 'menu';
}

function AdminImage({ images, reload, type, confirmAlert }: AdminImageProps) {
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

  return (
    <AdminShopImageBlock>
      {images.map((image) => (
        <div key={image._id} className="imageContainer">
          <a href={image.imageLink}>
            <img src={image.imageLink} alt="가게 관련 사진" />
          </a>
          <Button theme="red" onClick={() => onDelete(image._id)}>
            삭제
          </Button>
        </div>
      ))}
    </AdminShopImageBlock>
  );
}

export default AdminImage;
