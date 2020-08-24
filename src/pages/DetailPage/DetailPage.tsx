import React, { useEffect, useRef, useCallback, useState } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps, Link } from 'react-router-dom';
import useDetail from '../../hooks/useDetail';
import { MdFavorite, MdFavoriteBorder, MdAddAPhoto, MdEdit, MdInfoOutline, MdKeyboardArrowRight, MdRestaurantMenu } from 'react-icons/md';
import { ClockLoader } from 'react-spinners';
import RoundContainer from '../../components/common/RoundContainer';
import palette, { hexToRGB } from '../../styles/palette';
import Flag from '../../components/common/Flag';
import Loader from '../../components/common/Loader';
import ShopInformation from './ShopInformation';
import Radar from './Radar';
import useCheck from '../../hooks/useCheck';
import Dialog from '../../components/common/Dialog';
import KakaoMap from '../../components/common/KakaoMap';
import { BounceLoader } from 'react-spinners';
import Button from '../../components/common/Button';
import { Helmet } from 'react-helmet-async';
import { getScore } from '../../lib/scoreUtil';
import Comment from './Comment';

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

  height: 265px;

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

const ReportBlock = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  border-top: 1px solid ${hexToRGB(palette.middleGray, 0.5)};
  border-bottom: 1px solid ${hexToRGB(palette.middleGray, 0.5)};
  padding: 20px 10px;
  margin: 0;
  width: 100%;
  color: ${palette.darkGray};
  font-size: 12.5px;
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
  }

  svg.right {
    margin-left: auto;
    font-size: 1.5rem;
  }
`;

const MenuBlock = styled.div`
  color: ${palette.middleGray};

  padding-bottom: 30px;
  margin: 30px 0;

  border-bottom: 1px solid ${hexToRGB(palette.middleGray, 0.5)};

  .menuHeader {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    svg {
      margin-right: 10px;
    }
  }

  div.menus {
    font-size: 14px;
    .noMenu {
      margin-left: 25px;
    }
    .menu {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      .title {
        margin-left: 25px;
      }
      .horizontal {
        flex: 1;
        border-bottom: 1px solid ${hexToRGB(palette.middleGray, 0.3)};
        margin: 0 15px;
      }
      .price {
        margin-right: 15px;
      }
    }
  }
  .menuImages {
    margin-top: 30px;
    .menuImage {
      width: 30%;
      height: 30vw;
      max-width: 200px;
      max-height: 200px;
    }
    .menuImage + .menuImage {
      margin-left: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonWithNoMargin = styled(Button)`
  flex: 1;
  margin: 0 10px;
  margin-top: 10px;
`;

const CommentContainer = styled.div``;

const ShopReport = styled.div`
  .buttonGroup {
    div {
      display: flex;
      justify-content: space-between;
      button {
        flex: 1;
        font-size: 10px;
        padding: 8.5px 0;
        margin: 10px 5px;
      }
    }
  }
  textarea {
    resize: none;
    margin: 10px 0;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;

    border: 1px solid ${palette.middleGray};
  }
`;

const ReviewReport = styled.div`
  textarea {
    resize: none;
    margin: 10px 0;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 25px;

    border: 1px solid ${palette.middleGray};
  }
`;

interface DetailPageProps extends RouteComponentProps {}

function DetailPage({ match, history, location }: DetailPageProps) {
  const shopId: string = (match.params as any).shopId;

  const {
    onShopRequest,
    onReviewRequest,
    onShopImageUploadRequest,
    onMenuImageUploadRequest,
    resetDataAction,
    onLikeShop,
    onUnlikeShop,
    onLikeComment,
    onUnlikeComment,
    getLocation,
    setShopReportCommentDispatch,
    toggleShopReportButtonDispatch,
    setReviewReportCommentDispatch,
    postShopReportDispatch,
    postReviewReportDispatch,
    shop,
    reviews,
    shopImage,
    menuImage,
    mapAddress,
    form,
    shopReport,
    reviewReport,
  } = useDetail(shopId);

  const { user } = useCheck();

  const [likeOffset, setLikeOffset] = useState(0);
  const [commentLikeOffset, setCommentLikeOffset] = useState<number[]>([]);

  const shopFileRef = useRef<HTMLInputElement>(null);
  const menuFileRef = useRef<HTMLInputElement>(null);

  const [loginAlert, setLoginAlert] = useState(false);

  const [shopReportAlert, setShopReportAlert] = useState(false);
  const [reviewReportAlert, setReviewReportAlert] = useState(false);

  const [reviewReportNumber, setReviewReportNumber] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const onWriteReviewButtonClick = useCallback(() => {
    if (!user) {
      setLoginMessage('리뷰를 남기려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
    history.push(`comment/${(match.params as any).shopId}`);
  }, [history, match.params, user]);

  const onShopImageUploadButtonClick = () => {
    if (!user) {
      setLoginMessage('이미지를 올리려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
    shopFileRef.current?.click();
  };

  const onMenuImageUploadButtonClick = () => {
    if (!user) {
      setLoginMessage('이미지를 올리려면 로그인을 해야합니다');
      setLoginAlert(true);
      return;
    }
    menuFileRef.current?.click();
  };

  const onShopFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = shopFileRef.current?.files;
    if (files?.length) {
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index);
        if (file && file.size > 5 * 1024 * 1024) {
          alert('사진의 크기가 5MB보다 큽니다');
          shopFileRef.current!.value = '';
          return;
        }
      }
      onShopImageUploadRequest(files!);
      shopFileRef.current!.value = '';
    }
  };

  const onMenuFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = menuFileRef.current?.files;
    if (files?.length) {
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index);
        if (file && file.size > 5 * 1024 * 1024) {
          alert('사진의 크기가 5MB보다 큽니다');
          menuFileRef.current!.value = '';
          return;
        }
      }
      onMenuImageUploadRequest(files!);
      menuFileRef.current!.value = '';
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
          onUnlikeShop();
          setLikeOffset(-1);
        } else {
          onLikeShop();
          setLikeOffset(1);
        }
      } else {
        if (likeOffset === 1) {
          onUnlikeShop();
          setLikeOffset(0);
        } else {
          onLikeShop();
          setLikeOffset(0);
        }
      }
    }
  };

  const goLogin = useCallback(() => {
    try {
      localStorage.setItem('redir', match.url);
    } catch (error) {
      console.error('LocalStorage 사용 불가');
    }
    history.push('/auth/login');
  }, [history, match]);

  const likeComment = useCallback(
    (commentId: number) => {
      if (!user) {
        setLoginMessage('댓글 좋아요를 누르려면 로그인을 해야합니다');
        setLoginAlert(true);
        return;
      }
      if (!reviews.data) return;
      if (commentLikeOffset[commentId] === 0) {
        if (reviews.data[commentId].didLike) {
          onUnlikeComment(reviews.data[commentId]._id);
          setCommentLikeOffset(commentLikeOffset.map((comment, index) => (index === commentId ? -1 : comment)));
        } else {
          onLikeComment(reviews.data[commentId]._id);
          setCommentLikeOffset(commentLikeOffset.map((comment, index) => (index === commentId ? 1 : comment)));
        }
      } else if (commentLikeOffset[commentId] === 1) {
        onUnlikeComment(reviews.data[commentId]._id);
        setCommentLikeOffset(commentLikeOffset.map((comment, index) => (index === commentId ? 0 : comment)));
      } else if (commentLikeOffset[commentId] === -1) {
        onLikeComment(reviews.data[commentId]._id);
        setCommentLikeOffset(commentLikeOffset.map((comment, index) => (index === commentId ? 0 : comment)));
      }
    },
    [user, reviews.data, commentLikeOffset, onLikeComment, onUnlikeComment],
  );

  const onShopReportCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShopReportCommentDispatch(event.target.value);
  };

  const onReviewReportCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewReportCommentDispatch(event.target.value);
  };

  const postShopReport = useCallback(() => {
    setShopReportAlert(false);
    if (shopReport.loading) return;
    postShopReportDispatch();
  }, [shopReport, postShopReportDispatch]);

  const postReviewReport = useCallback(
    (reviewId: string) => {
      setReviewReportAlert(false);
      if (reviewReport.loading) return;
      postReviewReportDispatch(reviewId);
    },
    [reviewReport, postReviewReportDispatch],
  );

  const openReviewReport = useCallback((reviewId: string) => {
    setReviewReportAlert(true);
    setReviewReportNumber(reviewId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    if (shop.data && shop.data.address) {
      if (shop.data.latitude && shop.data.longitude) return;
      getLocation(shop.data.address);
    }
  }, [shop.data, getLocation]);

  useEffect(() => {
    setCommentLikeOffset(Array.from(Array(reviews.data ? reviews.data.length : 0)).map(() => 0));
  }, [reviews.data]);

  if (shop.loading) {
    return (
      <Container color="white">
        <Helmet>
          <title>로딩 중</title>
        </Helmet>
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (shop.error === 406) {
    return (
      <Container color="white">
        <Helmet>
          <title>존재하지 않는 가게</title>
        </Helmet>
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
        <Helmet>
          <title>서버가 이상해요</title>
        </Helmet>
        <Header category="modal" headerColor="white" />
        <ShopTitle>서버로부터 데이터를 받아오는데 실패했어요</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  return (
    <Container color="white" notFullHeight>
      <Helmet>
        <title>{shop.data.name} - 푸딩</title>
      </Helmet>
      <Header category="modal" headerColor="white" />
      <ShopTitle>{shop.data.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage
          imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
        >
          <Flag
            titleColor={shop.data.scoreAverage ? palette.white : 'black'}
            descColor={palette.white}
            titleText={getScore(shop.data.scoreAverage)}
            descText={shop.data.scoreAverage ? `${shop.data.scoreAverage.toPrecision(3)}학점` : '0.0학점'}
            flagBackColor="red"
          />
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
        <ShopAction onClick={onShopImageUploadButtonClick}>
          <input type="file" accept="image/*" name="imgFile" multiple style={{ display: 'none' }} ref={shopFileRef} onChange={onShopFileChange} />
          {shopImage.loading ? <ClockLoader color={palette.mainRed} size={27} /> : <MdAddAPhoto />}
          <span>{shopImage.loading ? '사진 올리는 중' : '사진 올리기'}</span>
        </ShopAction>
        <ShopAction onClick={onMenuImageUploadButtonClick}>
          <input type="file" accept="image/*" name="imgFile" multiple style={{ display: 'none' }} ref={menuFileRef} onChange={onMenuFileChange} />
          {menuImage.loading ? <ClockLoader color={palette.mainRed} size={27} /> : <MdAddAPhoto />}
          <span>{menuImage.loading ? '사진 올리는 중' : '메뉴판 올리기'}</span>
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
        ) : shop.data.latitude && shop.data.longitude ? (
          <>
            <KakaoMap latitude={shop.data.latitude} longitude={shop.data.longitude} />
            <ButtonContainer>
              <ButtonWithNoMargin theme="border" onClick={() => (window.location.href = `kakaomap://look?p=${shop.data?.latitude},${shop.data?.longitude}`)}>
                카카오 맵
              </ButtonWithNoMargin>
              <ButtonWithNoMargin
                theme="border"
                onClick={() =>
                  (window.location.href = `nmap://place?lat=${shop.data?.latitude}&lng=${shop.data?.longitude}&name=${shop.data?.name}&appname=bacon`)
                }
              >
                네이버 맵
              </ButtonWithNoMargin>
            </ButtonContainer>
          </>
        ) : mapAddress.data ? (
          <>
            <KakaoMap latitude={mapAddress.data.y} longitude={mapAddress.data.x} />
            <ButtonContainer>
              <ButtonWithNoMargin theme="border" onClick={() => (window.location.href = `kakaomap://look?p=${mapAddress.data?.y},${mapAddress.data?.x}`)}>
                카카오 맵
              </ButtonWithNoMargin>
              <ButtonWithNoMargin
                theme="border"
                onClick={() =>
                  (window.location.href = `nmap://place?lat=${mapAddress.data?.y}&lng=${mapAddress.data?.x}&name=${shop.data?.name}&appname=bacon`)
                }
              >
                네이버 맵
              </ButtonWithNoMargin>
            </ButtonContainer>
          </>
        ) : (
          <p>식당 주소로 지도에서 찾을 수 없어요ㅠ</p>
        )}
      </KakaoMapBlock>
      <ShopInformation shop={shop.data} />
      <ReportBlock onClick={() => setShopReportAlert(true)}>
        <MdInfoOutline />
        <p>잘못된 정보가 있나요? 푸딩에게 알려주세요!</p>
        <MdKeyboardArrowRight className="right" />
      </ReportBlock>
      <MenuBlock>
        <div className="menus">
          <div className="menuHeader">
            <MdRestaurantMenu />
            <p>대표 메뉴</p>
          </div>
          {shop.data.menus.length === 0 ? (
            <div className="noMenu">메뉴가 아직 등록되지 않았어요!</div>
          ) : (
            shop.data.menus.map((menu) => (
              <div className="menu" key={menu._id}>
                <p className="title">{menu.title}</p>
                <p className="horizontal" />
                <p className="price">{menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
              </div>
            ))
          )}
        </div>
        <div className="menuImages">
          {shop.data.menuImage.map((menu) => (
            <img src={menu.imageLink} className="menuImage" alt="메뉴판 사진" key={menu._id} />
          ))}
        </div>
      </MenuBlock>
      <Radar shop={shop.data} />
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review, index) => (
            <Comment
              review={review}
              index={index}
              commentLikeOffset={commentLikeOffset}
              openReviewReport={openReviewReport}
              likeComment={likeComment}
              key={review._id}
            />
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
      <Dialog mode="custom" customPadding="1rem" onCancel={() => setShopReportAlert(false)} visible={shopReportAlert}>
        <ShopReport>
          <div className="buttonGroup">
            <div>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(0)} selected={form.shopReport.type[0]}>
                폐업했어요
              </Button>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(1)} selected={form.shopReport.type[1]}>
                주소가 틀려요
              </Button>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(2)} selected={form.shopReport.type[2]}>
                가격이 틀려요
              </Button>
            </div>
            <div>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(3)} selected={form.shopReport.type[3]}>
                메뉴가 틀려요
              </Button>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(4)} selected={form.shopReport.type[4]}>
                영업일 틀려요
              </Button>
              <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(5)} selected={form.shopReport.type[5]}>
                전화번호 틀려요
              </Button>
            </div>
          </div>
          <textarea placeholder="그 외 잘못된 정보를 입력해주세요." rows={5} onChange={onShopReportCommentChange}>
            {form.shopReport.comment}
          </textarea>
          <Button
            theme="red"
            fullWidth
            onClick={postShopReport}
            disabled={form.shopReport.type.every((t) => t === false) && form.shopReport.comment.length === 0}
          >
            제출하기
          </Button>
        </ShopReport>
      </Dialog>
      <Dialog mode="custom" customPadding="1rem" onCancel={() => setReviewReportAlert(false)} visible={reviewReportAlert}>
        <ReviewReport>
          <textarea placeholder="그 외 잘못된 정보를 입력해주세요." rows={8} onChange={onReviewReportCommentChange}>
            {form.reviewReport.comment}
          </textarea>
          <Button theme="red" fullWidth onClick={() => postReviewReport(reviewReportNumber)} disabled={form.reviewReport.comment.length === 0}>
            제출하기
          </Button>
        </ReviewReport>
      </Dialog>
    </Container>
  );
}

export default DetailPage;
