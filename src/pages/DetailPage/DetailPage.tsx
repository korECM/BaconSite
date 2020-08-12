import React, { useEffect, useRef, useCallback, useState } from 'react';
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
import useCheck from '../../hooks/useCheck';
import Dialog from '../../components/common/Dialog';
import KakaoMap from '../../components/common/KakaoMap';
import { BounceLoader } from 'react-spinners';

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
  height: 60vw;
  max-height: 400px;
  width: 100%;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

const ShopImage = styled.div`
  display: flex;

  height: 100%;

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

const KakaoMapBlock = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin: 30px 0;

  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  p {
    margin-top: 20px;
  }

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
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

  const { onShopRequest, onReviewRequest, onImageUploadRequest, resetDataAction, onLike, onUnlike, getLocation, shop, reviews, images, mapAddress } = useDetail(
    shopId,
  );

  const { user } = useCheck();

  const [likeOffset, setLikeOffset] = useState(0);

  const fileRef = useRef<HTMLInputElement>(null);

  const [loginAlert, setLoginAlert] = useState(false);

  const [loginMessage, setLoginMessage] = useState('');

  const onWriteReviewButtonClick = useCallback(() => {
    if (!user) {
      setLoginMessage('리뷰를 남기려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
    history.push(`comment/${(match.params as any).shopId}`);
  }, [history, match.params, user]);

  const onImageUploadButtonClick = () => {
    if (!user) {
      setLoginMessage('이미지를 올리려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
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

  const onLikeButton = () => {
    if (!user) {
      setLoginMessage('좋아요를 누르려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
    if (shop.data) {
      if (likeOffset === 0) {
        if (shop.data.didLike) {
          onUnlike();
          setLikeOffset(-1);
        } else {
          onLike();
          setLikeOffset(1);
        }
      } else {
        if (likeOffset === 1) {
          onUnlike();
          setLikeOffset(0);
        } else {
          onLike();
          setLikeOffset(0);
        }
      }
    }
  };

  const goLogin = useCallback(() => {
    history.push('/auth/login');
  }, [history]);

  useEffect(() => {
    return () => {
      setLikeOffset(0);
      resetDataAction();
    };
  }, [resetDataAction]);

  useEffect(() => {
    onShopRequest();
    onReviewRequest();
    setLikeOffset(0);
  }, [onShopRequest, onReviewRequest]);

  useEffect(() => {
    if (shop.data && shop.data.address) getLocation(shop.data.address);
  }, [shop.data, getLocation]);

  if (shop.loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (shop.error === 406) {
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

  if (!shop.data) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>서버로부터 데이터를 받아오는데 실패했어요</ShopTitle>
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
    <Container color="white" notFullHeight>
      <Header category="modal" headerColor="white" />
      <ShopTitle>{shop.data.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage imageLink={shop.data.image.length > 0 ? shop.data.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}>
          <Flag titleColor={palette.white} descColor={palette.white} titleText={'A+'} descText={`${shop.data.scoreAverage}학점`} flagColor={palette.mainRed} />
        </ShopImage>
      </ShopImageContainer>
      <ShopActionContainer>
        {likeOffset === 0 ? (
          <ShopAction onClick={onLikeButton}>
            {shop.data.didLike ? <MdFavorite /> : <MdFavoriteBorder />}
            <span>{shop.data.likerCount}</span>
          </ShopAction>
        ) : (
          <ShopAction onClick={onLikeButton}>
            {likeOffset === 1 ? <MdFavorite /> : <MdFavoriteBorder />}
            <span>{shop.data.likerCount + likeOffset}</span>
          </ShopAction>
        )}
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
      <KakaoMapBlock>
        {mapAddress.loading ? (
          <>
            <BounceLoader color={palette.mainRed} size="30" />
            <p>지도 로딩중</p>
          </>
        ) : mapAddress.data ? (
          <KakaoMap latitude={mapAddress.data.y} longitude={mapAddress.data.x} />
        ) : (
          <p>식당 주소로 지도에서 찾을 수 없어요ㅠ</p>
        )}
      </KakaoMapBlock>
      <ShopInformation shop={shop.data} />
      <Radar shop={shop.data} />
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review, index) => (
            <Comment theme="gray" key={review._id} delay={index * 150}>
              <div>{review.user.name}</div>
              <div>{review.comment}</div>
            </Comment>
          ))}
      </CommentContainer>
      <Dialog
        cancelText="닫기"
        confirmText="로그인 하러 가기"
        desc={loginMessage}
        title="로그인"
        mode="cancel"
        onCancel={() => setLoginAlert(false)}
        onConfirm={() => goLogin()}
        visible={loginAlert}
      />
    </Container>
  );
}

export default DetailPage;
