import React, { useEffect, useRef, useCallback, useState } from 'react';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useDetail from '../../hooks/useDetail';
import { MdFavorite, MdFavoriteBorder, MdAddAPhoto, MdEdit, MdInfoOutline, MdKeyboardArrowRight, MdRestaurantMenu } from 'react-icons/md';
import BounceLoader from 'react-spinners/BounceLoader';
import palette, { hexToRGB } from '../../styles/palette';
import Flag from '../../components/common/Flag';
import Loader from '../../components/common/Loader';
import ShopInformation from './ShopInformation';
import Radar from './Radar';
import useCheck from '../../hooks/useCheck';
import Dialog from '../../components/common/Dialog';
import KakaoMap from '../../components/common/KakaoMap';
import Button from '../../components/common/Button';
import { getScore } from '../../lib/scoreUtil';
import Comment from './Comment';
import { MdPhotoLibrary } from 'react-icons/md';
import Title from 'lib/meta';
import ButtonGroup from 'components/common/ButtonGroup';
import ProcessModal, { AlertModal } from 'components/common/ProcessModal';
import GrayFooding from 'assets/fooding_gray.svg';
import imageCompression from 'browser-image-compression';
import Cat500 from 'assets/Cat500.svg';
import Cat404 from 'assets/Cat404.svg';
import { useScrollTop } from 'components/common/ScrollToTopController';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 20px;
`;

interface ShopImageProps {
  imageLink: string;
  isImageNotExisted?: boolean;
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
    props.isImageNotExisted &&
    css`
      background-size: 50%;
      background-repeat: no-repeat;
      background-color: ${palette.middleLightGray};
    `}
  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}


  svg {
    color: white;
    margin: 10px;
  }
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
    height: 30vw;
    max-height: 200px;
    overflow-x: auto;
    white-space: nowrap;
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

const SlimButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;
`;

const NoResultComment = styled.h1`
  font-size: 17px;
  font-family: 'Nanum Gothic';
  font-weight: 900;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: ${palette.mainRed};
`;

const SimpleImage = styled.img`
  width: 80%;
  max-height: 500px;
  height: auto;
  min-height: 250px;
  object-fit: contain;
`;

const SimpleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 30px;
`;

const TopDivider = styled.div`
  margin-bottom: 60px;
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
    checkTodayReviewDispatch,
    deleteReviewReportDispatch,
    shop,
    reviews,
    shopImage,
    menuImage,
    mapAddress,
    form,
    shopReport,
    reviewReport,
    checkReview,
    deleteReview,
  } = useDetail(shopId);

  const { user } = useCheck();

  const [likeOffset, setLikeOffset] = useState(0);
  const [commentLikeOffset, setCommentLikeOffset] = useState<number[]>([]);

  const shopFileRef = useRef<HTMLInputElement>(null);
  const menuFileRef = useRef<HTMLInputElement>(null);

  const [loginAlert, setLoginAlert] = useState(false);

  const [shopReportAlert, setShopReportAlert] = useState(false);
  const [reviewReportAlert, setReviewReportAlert] = useState(false);

  const [reviewReportDone, setReviewReportDone] = useState(false);

  const [shopReportDone, setShopReportDone] = useState(false);

  const [reviewDeleteAlert, setReviewDeleteAlert] = useState(false);

  const [reviewDeleteDone, setReviewDeleteDone] = useState(false);

  const [shopImageUploadShow, setShopImageUploadShow] = useState(false);
  const [menuImageUploadShow, setMenuImageUploadShow] = useState(false);

  const [shopImageUploadDone, setShopImageUploadDone] = useState(false);
  const [menuImageUploadDone, setMenuImageUploadDone] = useState(false);

  const [reviewReportNumber, setReviewReportNumber] = useState('');

  const [reviewDeleteNumber, setReviewDeleteNumber] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const [checkReviewLoading, setCheckReviewLoading] = useState(false);

  const [checkReviewModalShow, setCheckReviewModalShow] = useState(false);

  const [imageSizeToBigShow, setImageSizeToBigShow] = useState(false);
  const [imageCountToBigShow, setImageCountToBigShow] = useState(false);

  const simpleDialogAlert = useCallback(
    (message: string) => {
      if (!user) {
        setLoginMessage(message);
        setLoginAlert(true);
        return false;
      }
      return true;
    },
    [user],
  );

  const onWriteReviewButtonClick = useCallback(() => {
    if (!simpleDialogAlert('리뷰를 남기려면 로그인을 해야합니다')) return;
    checkTodayReviewDispatch();
    setCheckReviewLoading(true);
    setCheckReviewModalShow(true);
  }, [simpleDialogAlert, checkTodayReviewDispatch, setCheckReviewModalShow]);

  useEffect(() => {
    if (!checkReviewLoading) return;
    if (checkReview.loading) return;
    console.log('check response', checkReview.data);
    if (checkReview.data) {
      history.push(`comment/${(match.params as any).shopId}`);
    } else {
      console.log('오늘 댓글 더 못달아요ㅎㅋ');
    }
    setCheckReviewLoading(false);
  }, [checkReview, history, match.params, checkReviewLoading]);

  const onShopImageUploadButtonClick = () => {
    if (!simpleDialogAlert('이미지를 올리려면 로그인을 해야합니다')) return;
    shopFileRef.current?.click();
  };

  const onMenuImageUploadButtonClick = () => {
    if (!simpleDialogAlert('이미지를 올리려면 로그인을 해야합니다')) return;
    menuFileRef.current?.click();
  };

  // const fileSizeAlert = (fileRef: React.RefObject<HTMLInputElement>) => {
  //   const files = fileRef.current?.files;
  //   if (files?.length) {
  //     if (files.length > 10) {
  //       setImageCountToBigShow(true);
  //       fileRef.current!.value = '';
  //       return false;
  //     }
  //     for (let index = 0; index < files.length; index++) {
  //       const file = files.item(index);
  //       if (file && file.size > 5 * 1024 * 1024) {
  //         setImageSizeToBigShow(true);
  //         // alert('사진의 크기가 5MB보다 큽니다');
  //         fileRef.current!.value = '';
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  //   return false;
  // };

  const onShopFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = shopFileRef.current?.files;
    let resizedFile: File[] = [];
    if (files?.length) {
      setShopImageUploadShow(true);
      for (const imageFile of Array.from(files)) {
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        let options = {
          maxSizeMB: 0.5,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          resizedFile.push(new File([compressedFile], (compressedFile as any).name));
        } catch (error) {
          console.error(error);
        }
      }
    }
    onShopImageUploadRequest(resizedFile);
    shopFileRef.current!.value = '';
  };

  const onMenuFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = menuFileRef.current?.files;
    let resizedFile: File[] = [];
    if (files?.length) {
      setMenuImageUploadShow(true);
      for (const imageFile of Array.from(files)) {
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        let options = {
          maxSizeMB: 0.5,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          resizedFile.push(new File([compressedFile], (compressedFile as any).name));
        } catch (error) {
          console.error(error);
        }
      }
    }
    onMenuImageUploadRequest(resizedFile);
    menuFileRef.current!.value = '';
  };

  const onLikeButton = () => {
    if (!simpleDialogAlert('좋아요를 누르려면 로그인을 해야합니다')) return;
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
      if (!simpleDialogAlert('댓글 좋아요를 누르려면 로그인을 해야합니다')) return;
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
    [simpleDialogAlert, reviews.data, commentLikeOffset, onLikeComment, onUnlikeComment],
  );

  const onShopReportCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShopReportCommentDispatch(event.target.value);
  };

  const onReviewReportCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewReportCommentDispatch(event.target.value);
  };

  const postShopReport = useCallback(() => {
    if (shopReport.loading) return;
    postShopReportDispatch();
  }, [shopReport, postShopReportDispatch]);

  const postReviewReport = useCallback(
    (reviewId: string) => {
      if (reviewReport.loading) return;
      postReviewReportDispatch(reviewId);
    },
    [reviewReport, postReviewReportDispatch],
  );

  const openReviewReport = useCallback((reviewId: string) => {
    setReviewReportAlert(true);
    setReviewReportNumber(reviewId);
  }, []);

  const openReviewDelete = useCallback((reviewId: string) => {
    setReviewDeleteAlert(true);
    setReviewDeleteNumber(reviewId);
  }, []);

  const onShopImageClick = useCallback(() => {
    if (!shop.data) return;
    if (shop.data.shopImage.length < 1) return;
    history.push(`/shop/image/${shop.data._id}`);
  }, [shop.data, history]);

  const onMenuImageClick = useCallback(() => {
    if (!shop.data) return;
    if (shop.data.menuImage.length <= 1) return;
    history.push(`/shop/menuImage/${shop.data._id}`);
  }, [shop.data, history]);

  useScrollTop();

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

  useEffect(() => {
    if (reviewReport.data) {
      setReviewReportDone(true);
    }
  }, [reviewReport.data]);

  useEffect(() => {
    if (deleteReview.data) {
      setReviewDeleteDone(true);
    }
  }, [deleteReview.data]);

  useEffect(() => {
    if (shopReport.data) {
      setShopReportDone(true);
    }
  }, [shopReport.data]);

  useEffect(() => {
    if (shopImage.data?.locations) {
      setShopImageUploadDone(true);
    }
  }, [shopImage.data]);

  useEffect(() => {
    if (menuImage.data?.locations) {
      setMenuImageUploadDone(true);
    }
  }, [menuImage.data]);

  if (shop.loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (shop.error === 406 || shop.error === 400) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <TopDivider></TopDivider>
        <NoResultComment>앗, 존재하지 않는 가게에요!</NoResultComment>
        <TopDivider></TopDivider>
        <SimpleImageContainer>
          <SimpleImage src={Cat404} />
        </SimpleImageContainer>
        <NoResultComment>주소가 맞는지</NoResultComment>
        <NoResultComment>다시 한번 확인해주세요</NoResultComment>
      </Container>
    );
  }

  if (!shop.data) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <TopDivider></TopDivider>
        <NoResultComment>앗, 결과를 받아올 수 없었어요!</NoResultComment>
        <TopDivider></TopDivider>
        <SimpleImageContainer>
          <SimpleImage src={Cat500} />
        </SimpleImageContainer>
        <NoResultComment>잠시 후에</NoResultComment>
        <NoResultComment>다시 시도해주세요</NoResultComment>
      </Container>
    );
  }

  return (
    <Container color="white" notFullHeight>
      <Header category="modal" headerColor="white" />
      <Title
        title={() => {
          if (shop.loading) return '로딩중';
          if (shop.error === 406) return '존재하지 않는 가게';
          if (!shop.data) return '서버가 이상해요';
          return `${shop.data.name} - 푸딩`;
        }}
      />
      <ShopTitle>{shop.data.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage
          imageLink={shop.data.mainImage ? shop.data.mainImage : shop.data.shopImage.length ? shop.data.shopImage[0].imageLink : GrayFooding}
          onClick={onShopImageClick}
          style={{ cursor: shop.data.shopImage.length > 0 ? 'pointer' : 'normal' }}
          isImageNotExisted={!shop.data.mainImage && shop.data.shopImage.length === 0}
        >
          {shop.data.shopImage.length > 0 && <MdPhotoLibrary />}
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
          <MdAddAPhoto />
          <span>사진 올리기</span>
        </ShopAction>
        <ShopAction onClick={onMenuImageUploadButtonClick}>
          <input type="file" accept="image/*" name="imgFile" multiple style={{ display: 'none' }} ref={menuFileRef} onChange={onMenuFileChange} />
          <MdAddAPhoto />
          <span>메뉴판 올리기</span>
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
      {(shop.data.menus.length !== 0 || shop.data.menuImage.length !== 0) && (
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
          {shop.data.menuImage.length > 0 && (
            <>
              <div className="menuImages">
                {shop.data.menuImage.slice(0, 10).map((menu) => (
                  <img src={menu.imageLink} className="menuImage" alt="메뉴판 사진" key={menu._id} />
                ))}
              </div>
              <ButtonGroup gap="0" direction="row" rightAlign>
                <SlimButton theme="red" onClick={onMenuImageClick}>
                  메뉴 더보기
                </SlimButton>
              </ButtonGroup>
            </>
          )}
        </MenuBlock>
      )}
      <Radar shop={shop.data} />
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review, index) => (
            <Comment
              review={review}
              index={index}
              commentLikeOffset={commentLikeOffset}
              openReviewReport={openReviewReport}
              openDeleteReport={openReviewDelete}
              likeComment={likeComment}
              key={review._id}
              userId={user?._id}
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
      <ProcessModal
        onCancel={() => setShopReportAlert(false)}
        visible={shopReportAlert}
        done={shopReportDone}
        setDone={setShopReportDone}
        doneMessage="신고가 정상적으로 접수되었습니다"
        error={shopReport.error}
        loading={shopReport.loading}
      >
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
      </ProcessModal>
      <ProcessModal
        onCancel={() => setReviewReportAlert(false)}
        visible={reviewReportAlert}
        done={reviewReportDone}
        setDone={setReviewReportDone}
        doneMessage="신고가 정상적으로 접수되었습니다"
        error={reviewReport.error}
        loading={reviewReport.loading}
      >
        <ReviewReport>
          <textarea placeholder="어떤 점이 불편하셨나요?&#13;&#10;(ex. 부적절한 표현을 사용했어요.)" rows={8} onChange={onReviewReportCommentChange}>
            {form.reviewReport.comment}
          </textarea>
          <Button theme="red" fullWidth onClick={() => postReviewReport(reviewReportNumber)} disabled={form.reviewReport.comment.length === 0}>
            제출하기
          </Button>
        </ReviewReport>
      </ProcessModal>
      <ProcessModal
        onCancel={() => setReviewDeleteAlert(false)}
        visible={reviewDeleteAlert}
        done={reviewDeleteDone}
        setDone={setReviewDeleteDone}
        doneMessage="댓글이 정상적으로 삭제되었습니다"
        afterDone={() => window.location.reload(false)}
        error={deleteReview.error}
        loading={deleteReview.loading}
      >
        <ReviewReport>
          <h1 style={{ marginTop: '20px', marginBottom: '40px', textAlign: 'center' }}>정말로 댓글을 삭제하시겠습니까?</h1>
          <ButtonGroup direction="row" gap="10px" rightAlign>
            <Button theme="text" onClick={() => setReviewDeleteAlert(false)}>
              닫기
            </Button>
            <Button theme="red" onClick={() => deleteReviewReportDispatch(reviewDeleteNumber)}>
              삭제하기
            </Button>
          </ButtonGroup>
        </ReviewReport>
      </ProcessModal>
      <ProcessModal
        onCancel={() => setShopImageUploadShow(false)}
        visible={shopImageUploadShow}
        done={shopImageUploadDone}
        setDone={setShopImageUploadDone}
        doneMessage="사진이 정상적으로 업로드되었습니다"
        error={shopImage.error}
        loading={true && shopImageUploadDone === false}
      />
      <ProcessModal
        onCancel={() => setMenuImageUploadShow(false)}
        visible={menuImageUploadShow}
        done={menuImageUploadDone}
        setDone={setMenuImageUploadDone}
        doneMessage="사진이 정상적으로 업로드되었습니다"
        error={menuImage.error}
        loading={true && menuImageUploadDone === false}
      />
      <ProcessModal
        onCancel={() => setCheckReviewModalShow(false)}
        visible={checkReviewModalShow}
        done={false}
        setDone={(temp: boolean) => {}}
        doneMessage=""
        errorMessageBlock={
          <div>
            <span>리뷰는 한 식당에 대해</span>
            <br />
            <span style={{ marginTop: '5px', display: 'block' }}>하루 한 번만 작성 가능합니다</span>
          </div>
        }
        error={checkReview.error}
        loading={checkReview.loading}
      />
      <AlertModal
        onCancel={() => setImageSizeToBigShow(false)}
        visible={imageSizeToBigShow}
        messageBlock={
          <div>
            <span>올리려는 사진의 크기가</span>
            <br />
            <span style={{ marginTop: '5px', display: 'block' }}>커서 올릴 수 없습니다</span>
          </div>
        }
      />
      <AlertModal
        onCancel={() => setImageCountToBigShow(false)}
        visible={imageCountToBigShow}
        messageBlock={
          <div>
            <span>사진은 한 번에</span>
            <br />
            <span style={{ marginTop: '5px', display: 'block' }}>10개 씩 올릴 수 있습니다</span>
          </div>
        }
      />
    </Container>
  );
}

export default DetailPage;
