import React, { useEffect } from 'react'
import KakaoShareButton from '../../components/common/KakaoShareButton';

const KakaoShareLayout = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    script.async = true
    document.body.appendChild(script)
    console.log("ㅜㅃ")
    console.log(window.kakao)
    if(window.kakao){
        console.log("호출함?")
    }
    return () => {
      document.body.removeChild(script)
    }
    
  }, [])
  return (
    <div className="layout">
      <KakaoShareButton />
    </div>
  )
}
export default KakaoShareLayout