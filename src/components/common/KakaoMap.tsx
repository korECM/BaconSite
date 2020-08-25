import React, { useEffect } from 'react';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_REST_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
          level: 2, //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container!, options); //지도 생성 및 객체 리턴

        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: '100%', height: '250px' }} />;
}

export default KakaoMap;
