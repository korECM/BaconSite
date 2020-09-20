import axios from 'axios';

export interface LocationInterface {
  meta: Meta;
  documents: Document[];
}

export interface Document {
  address_name: string;
  y: string;
  x: string;
  address_type: string;
  address: { [key: string]: string };
  road_address: { [key: string]: string };
}

export interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export async function getLocation(keyword: string) {
  const response = await axios.get<LocationInterface>(`https://dapi.kakao.com/v2/local/search/address.json?query=${keyword}`, {
    headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}` },
  });
  return response.data;
}
