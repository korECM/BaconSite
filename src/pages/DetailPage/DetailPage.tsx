import React, { useEffect, useRef, useCallback } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useDetail from '../../hooks/useDetail';
import { MdFavorite, MdFavoriteBorder, MdAddAPhoto, MdEdit } from 'react-icons/md';
import { ClockLoader } from 'react-spinners';
import RoundContainer from '../../components/common/RoundContainer';
import palette from '../../styles/palette';
import Flag from '../../components/common/Flag';
import Loader from '../../components/common/Loader';
import ShopInformation from './ShopInformation';
import Radar from './Radar';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 20px;
`;

interface ShopImageProps {
  imageLink: string;
}

const ShopImageContainer = styled.div`
  position: relative;

  height: 60vw;
  max-height: 400px;
  width: 100%;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

const ShopImage = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}
`;

const ShopActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

const ShopAction = styled.button`
  outline: none;
  border: none;
  background-color: transparent;

  color: inherit;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  svg {
    font-size: 1.8rem;
    stroke-width: 0.1%;
    vector-effect: non-scaling-stroke;
  }

  span {
    margin-top: 5px;
  }
`;

const Divider = styled.div`
  border-bottom: 0.1px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

const CommentContainer = styled.div``;

const Comment = styled(RoundContainer)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  padding-left: 20px;

  div:nth-child(1) {
    font-size: 12px;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    font-size: 10px;
  }
`;

interface DetailPageProps extends RouteComponentProps {}

function DetailPage({ match, history }: DetailPageProps) {
  const shopId: string = (match.params as any).shopId;

  const { onShopRequest, onReviewRequest, onImageUploadRequest, shop, reviews, images } = useDetail(shopId);

  const fileRef = useRef<HTMLInputElement>(null);

  const onWriteReviewButtonClick = useCallback(() => {
    history.push(`comment/${(match.params as any).shopId}`);
  }, [history, match.params]);

  const onImageUploadButtonClick = () => {
    fileRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = fileRef.current?.files;
    if (files?.length) {
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index);
        if (file && file.size > 5 * 1024 * 1024) {
          alert('사진의 크기가 5MB보다 큽니다');
          fileRef.current!.value = '';
          return;
        }
      }
      onImageUploadRequest(files!);
      fileRef.current!.value = '';
    }
  };

  useEffect(() => {
    onShopRequest();
    onReviewRequest();
  }, [onShopRequest, onReviewRequest]);

  if (shop.loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (!shop.data || shop.error === 400) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>존재하지 않는 가게에요</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  if (shop.error === 404) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>{shop.data.name}</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={shop.data.image.length > 0 ? shop.data.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <ShopTitle>{shop.data.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage imageLink={shop.data.image.length > 0 ? shop.data.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        <Flag titleColor={palette.white} descColor={palette.white} titleText={'A+'} descText={`${shop.data.scoreAverage}학점`} flagColor={palette.mainRed} />
      </ShopImageContainer>
      <ShopActionContainer>
        <ShopAction>
          {shop.data.didLike ? <MdFavorite /> : <MdFavoriteBorder />}
          <span>{shop.data.likerCount}</span>
        </ShopAction>
        <ShopAction onClick={onImageUploadButtonClick}>
          <input type="file" accept="image/*" name="imgFile" multiple style={{ display: 'none' }} ref={fileRef} onChange={onFileChange} />
          {images.loading ? <ClockLoader color={palette.mainRed} size={27} /> : <MdAddAPhoto />}
          <span>{images.loading ? '사진 올리는 중' : '사진 올리기'}</span>
        </ShopAction>
        <ShopAction onClick={onWriteReviewButtonClick}>
          <MdEdit />
          <span>리뷰 작성</span>
        </ShopAction>
      </ShopActionContainer>
      <Divider />
      <ShopInformation shop={shop.data} />
      <Radar shop={shop.data} />
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review) => (
            <Comment theme="gray">
              <div>{review.user.name}</div>
              <div>{review.comment}</div>
            </Comment>
          ))}
      </CommentContainer>
    </Container>
  );
}

export default DetailPage;
