import axios from 'axios';
import { apiLink } from '../lib/getAPILink';

export interface KakaoInterface {
  id: string;
  status: number;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

export async function getKakaoCallback(code: string) {
  const response = await axios.get<KakaoInterface>(apiLink() + `/auth/signIn/kakao/callback?code=${code}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function setName(id: string, name: string) {
  const response = await axios.post(
    apiLink() + `/auth/kakao/name`,
    {
      id,
      name,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function check() {
  const response = await axios.get<UserInterface>(apiLink() + `/auth/check`, {
    withCredentials: true,
  });
  return response.data;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export async function register(data: RegisterInterface) {
  const response = await axios.post(
    apiLink() + `/auth/signUp`,
    { ...data, provider: 'local' },
    {
      withCredentials: true,
    },
  );
  return response.data;
}
