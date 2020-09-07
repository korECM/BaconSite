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
  isAdmin: boolean;
}

export interface KakaoNameInterface {
  user: any | null;
  error: string | null;
}

export async function getKakaoCallback(code: string) {
  const response = await axios.get<KakaoInterface>(apiLink() + `/auth/signIn/kakao/callback?code=${code}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function setName(id: string, name: string, gender: string) {
  const response = await axios.post<KakaoNameInterface>(
    apiLink() + `/auth/kakao/name`,
    {
      id,
      name,
      gender,
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

export async function logout() {
  const response = await axios.get(apiLink() + `/auth/logout`, {
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

export interface LoginInterface {
  email: string;
  password: string;
}

export async function login(data: LoginInterface) {
  const response = await axios.post(apiLink() + `/auth/signIn`, data, {
    withCredentials: true,
  });
  return response.data;
}
