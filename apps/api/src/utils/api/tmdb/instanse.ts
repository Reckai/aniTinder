import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY || 'YOUR_API_KEY_HERE'}`,
  },
});
