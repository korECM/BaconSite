import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useDetail from 'hooks/useDetail';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import Title from 'lib/meta';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ButtonGroup from 'components/common/ButtonGroup';
import Button from 'components/common/Button';
import imageCompression from 'browser-image-compression';
import palette, { hexToRGB } from 'styles/palette';
import ProcessModal from 'components/common/ProcessModal';
import Loader from 'components/common/Loader';
import Cat500 from 'assets/Cat500.svg';
import Cat404 from 'assets/Cat404.svg';
import useCheck from 'hooks/useCheck';
import { MdCameraAlt } from 'react-icons/md';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 20px;
  color: black; 
`;

const ButtonMiddle = styled.div`
  display: flex;
  justify-content: center;
`;

const PreviewImageHolder = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;

  height: calc(30vw + 45px);

  @media only screen and (min-width: 1000px) {
    height: calc(20vw + 45px);
  }

  @media only screen and (min-width: 1600px) {
    height: calc(10vw + 45px);
  }
`;

const PreviewImageContainer = styled.div`
  /* margin: 5%; */
  margin: 10px;
  /* background: ${hexToRGB(palette.mainRed, 0.1)}; */
  border: none;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: inherit;

  /* border: 1px solid #d0dbe4; */
  position: relative;

  height: calc(30vw + 15px);

  @media only screen and (min-width: 1000px) {
    height: calc(20vw + 15px);
  }

  @media only screen and (min-width: 1600px) {
    height: calc(10vw + 15px);
  }
`;

const PreviewImageDelete = styled.div`
  position: absolute;
  top: 5px;
  right: -10px;
  background: ${palette.mainRed};
  color: ${palette.white};
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  font-size: 10px;
  font-weight: 700;
  line-height: 25px;
  width: 25px;
  height: 25px;
`;

const PreviewImage = styled.img`
  height: 30vw;
  width: 30vw;
  @media only screen and (min-width: 768px) {
    height: 30vw;
    width: 30vw;
  }
  @media only screen and (min-width: 1000px) {
    height: 20vw;
    width: 20vw;
  }

  @media only screen and (min-width: 1600px) {
    height: 10vw;
    width: 10vw;
  }
  object-fit: cover;
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

const ButtonCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 40px;

  margin-bottom: 10px;

  button {
    border: none;
    outline: none;
    background-color: ${palette.white};
    color: ${palette.darkGray};
    padding: 10px 20px;
    flex: 1;
    max-width: 175px;
    font-size: 12.5px;
  }

  button:nth-child(1) {
    border-radius: 12.5px 0 0 12.5px;
  }
  button:nth-child(2) {
    border-radius: 0 12.5px 12.5px 0;
  }

  button.active {
    background-color: ${palette.mainRed};
    color: ${palette.white};
  }
`;

const ButtonSubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 140px;
    padding: 8.5px;
    &:nth-child(1) {
      border: 1px ${palette.mainRed} solid;
      &:disabled {
        border: none;
      }
    }
  }
  /* margin: 20px 0; */
`;

const EmptyImageContainer = styled.div`
  background-color: white;
  position: relative;

  height: calc(30vw + 15px);
  width: 100%;

  @media only screen and (min-width: 1000px) {
    height: calc(20vw + 15px);
  }

  @media only screen and (min-width: 1600px) {
    height: calc(10vw + 15px);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 22.5%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #ffffff;
    border-bottom: 0;
    margin-left: -15px;
    margin-bottom: -15px;
  }

  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: ${palette.middleGray};

    svg {
      font-size: 2.75rem;
    }

    span {
      margin-top: 10px;
      font-size: 14px;

      &.small {
        font-size: 11px;
      }
    }
  }
`;

interface CustomFileList {
  file: File;
  previewImage: string;
}

type Category = 'shop' | 'menu';

const MAX_UPLOAD_NUM = 10;

function UploadPage({ match, history }: RouteComponentProps) {
  const shopId = (match.params as any).shopId;

  const { shop, shopImage, menuImage, onShopImageUploadRequest, onMenuImageUploadRequest, onShopRequest } = useDetail(shopId);

  const { user } = useCheck();

  const [fileList, setFileList] = useState<CustomFileList[]>([]);

  const [resizedFile, setResizedFile] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const [percent, setPercent] = useState<number>(0);

  const [category, setCategory] = useState<Category>('shop');

  const [shopImageUploadShow, setShopImageUploadShow] = useState(false);
  const [menuImageUploadShow, setMenuImageUploadShow] = useState(false);

  const [shopImageUploadDone, setShopImageUploadDone] = useState(false);
  const [menuImageUploadDone, setMenuImageUploadDone] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const goLogin = useCallback(() => {
    try {
      localStorage.setItem('redir', match.url);
    } catch (error) {
      console.error('LocalStorage 사용 불가');
    }
    history.push('/auth/login');
  }, [history, match]);

  useEffect(() => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }, []);

  useEffect(() => {
    if (!user) {
      goLogin();
    }
    onShopRequest();
  }, [onShopRequest, user, goLogin]);

  const resetUpload = useCallback(() => {
    setUploading(false);
    setResizedFile([]);
    setFileList([]);
  }, []);

  useEffect(() => {
    if (shopImage.data?.locations) {
      setShopImageUploadDone(true);
      resetUpload();
    } else if (shopImage.error) {
      setShopImageUploadDone(true);
      resetUpload();
    }
  }, [shopImage, resetUpload]);

  useEffect(() => {
    if (menuImage.data?.locations) {
      setMenuImageUploadDone(true);
      resetUpload();
    } else if (menuImage.error) {
      setMenuImageUploadDone(true);
      resetUpload();
    }
  }, [menuImage, resetUpload]);

  const onShopFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = fileRef.current?.files;
    if (files?.length) {
      for (const imageFile of Array.from(files).slice(0, MAX_UPLOAD_NUM)) {
        let reader = new FileReader();
        reader.onloadend = () => {
          setFileList((image) =>
            image.concat({
              file: imageFile,
              previewImage: reader.result as string,
            }),
          );
        };
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const onUploadButtonClick = async () => {
    let files = fileRef.current?.files;
    if (files?.length) {
      setUploading(true);
      for (const imageFile of Array.from(files).slice(0, MAX_UPLOAD_NUM)) {
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        let options = {
          maxSizeMB: 0.5,
          onProgress: (percent: number) => {
            setPercent(percent);
          },
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          setResizedFile((myFiles) => myFiles.concat(new File([compressedFile], (compressedFile as any).name)));
        } catch (error) {
          console.error(error);
        }
      }
    }

    fileRef.current!.value = '';
  };

  useEffect(() => {
    if (fileList.length === 0 || resizedFile.length === 0) return;
    if (resizedFile.length === fileList.slice(0, MAX_UPLOAD_NUM).length) {
      if (category === 'shop') {
        setShopImageUploadShow(true);
        onShopImageUploadRequest(resizedFile);
      } else {
        setMenuImageUploadShow(true);
        onMenuImageUploadRequest(resizedFile);
      }
    }
  }, [resizedFile, fileList, category, onShopImageUploadRequest, onMenuImageUploadRequest]);

  const imageSelectClicked = useCallback(() => {
    if (uploading) return;
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, [uploading]);

  const previewImageDelete = useCallback(
    (index: number) => {
      if (!uploading) {
        setFileList((images) => images.filter((file, _index) => _index !== index));
      }
    },
    [uploading],
  );

  const imageUploadMessage = useCallback(() => {
    if (uploading) {
      if (fileList) {
        if (resizedFile.length < fileList.length) {
          return `이미지 변환 중 ${Math.min(parseInt((percent / fileList.length + (resizedFile.length * 100) / fileList.length).toFixed(0)), 100)}%`;
        } else {
          return '업로드 중';
        }
      }
    } else {
      return '업로드 >>';
    }
  }, [resizedFile, fileList, uploading, percent]);

  const setCategoryButton = useCallback(
    (category: Category) => {
      if (uploading) return;
      setCategory(category);
    },
    [uploading],
  );

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
    <Container color="white">
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
      <input type="file" accept="image/*" name="imgFile" multiple style={{ display: 'none' }} ref={fileRef} onChange={onShopFileChange} />
      <ButtonCategoryContainer>
        <button onClick={() => setCategoryButton('shop')} className={category === 'shop' ? 'active' : ''}>
          가게 사진
        </button>

        <button onClick={() => setCategoryButton('menu')} className={category === 'menu' ? 'active' : ''}>
          메뉴판 사진
        </button>
      </ButtonCategoryContainer>
      <PreviewImageHolder>
        {fileList && fileList.length > 0 ? (
          fileList.map((file, index) => (
            <PreviewImageContainer key={file.previewImage.length}>
              <PreviewImageDelete onClick={() => previewImageDelete(index)}>X</PreviewImageDelete>
              <PreviewImage src={file.previewImage} alt="업로드 사진" />
            </PreviewImageContainer>
          ))
        ) : (
          <EmptyImageContainer onClick={imageSelectClicked}>
            <div>
              <MdCameraAlt />
              <span>사진을 선택해주세요</span>
              <span className="small">한 번에 10장까지 업로드 할 수 있습니다</span>
            </div>
          </EmptyImageContainer>
        )}
      </PreviewImageHolder>
      <ButtonSubmitContainer>
        <Button theme="white" onClick={imageSelectClicked} disabled={uploading}>
          사진 고르기
        </Button>
        <Button theme="red" fullWidth onClick={onUploadButtonClick} disabled={fileList.length === 0 || uploading}>
          {imageUploadMessage()}
        </Button>
      </ButtonSubmitContainer>
      <ButtonMiddle></ButtonMiddle>
      <ProcessModal
        onCancel={() => setMenuImageUploadShow(false)}
        visible={menuImageUploadShow}
        done={menuImageUploadDone}
        setDone={setMenuImageUploadDone}
        doneMessage="사진이 정상적으로 업로드되었습니다"
        error={menuImage.error}
        loading={menuImageUploadDone === false}
        key="menu"
      />
      <ProcessModal
        onCancel={() => setShopImageUploadShow(false)}
        visible={shopImageUploadShow}
        done={shopImageUploadDone}
        setDone={setShopImageUploadDone}
        doneMessage="사진이 정상적으로 업로드되었습니다"
        error={shopImage.error}
        loading={shopImageUploadDone === false}
        key="shop"
      />
    </Container>
  );
}

export default withRouter(UploadPage);
