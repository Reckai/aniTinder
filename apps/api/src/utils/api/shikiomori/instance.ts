import axios from 'axios';

export const shikiomoriApi = axios.create({
  baseURL: 'https://shikimori.one',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: 'https://shikimori.one',
  },
});
