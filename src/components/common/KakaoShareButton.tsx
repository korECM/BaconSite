import React, { useEffect } from 'react'

interface KakaoMapProps {
    latitude: number;
    longitude: number;
  }
  
declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoShareButton = () => {
  useEffect(() => {
    createKakaoButton()
  }, [])
  const createKakaoButton = () => {
    console.log('카카오 초기화...한거...?')
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.kakao) {
      const kakao = window.kakao
      console.log('카카오 초기화...한거...?')
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY)
        console.log(process.env.REACT_APP_KAKAO_KEY)
        console.log('카카오 초기화...한거...?')
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '타이틀',
          description: '#리액트 #카카오 #공유버튼',
          imageUrl: 'IMAGE_URL', // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    }
  }
  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <button id="kakao-link-btn">
        <img src="../../assets/kakao.png" alt="kakao-share-icon" />
      </button>
    </div>
  )
}
export default KakaoShareButton