import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface KakaoInterface {
  id: string;
  status: number;
}

export async function getKakaoCallback(code: string) {
  const response = await axios.get<KakaoInterface>(apiLink() + `/auth/signIn/kakao/callback?code=${code}`);
  return response.data;
}

export async function setName(id: string, name: string) {
  const response = await axios.post(apiLink() + `/auth/kakao/name`, {
    id,
    name,
  });
  return response.data;
}
