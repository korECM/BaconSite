import axios from 'axios';
import { apiLink } from 'lib/getAPILink';

export interface MainPostInterface {
  title: string;
  link: string;
  image: string;
  registerDate: Date;
}

export async function getMainPostAPI() {
  const response = await axios.get<MainPostInterface[]>(apiLink() + `/mainPost`, {
    withCredentials: true,
  });
  return response.data;
}
