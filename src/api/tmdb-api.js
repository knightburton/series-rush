import invoke from './axios';
import { TMDB_API_ENDPOINT } from '../constants/config';

const api = {
  get: invoke(TMDB_API_ENDPOINT, 'GET', { api_key: process.env.REACT_APP_TMDB_API_KEY }),
};

// TV Show related
export const quickSearchTVShow = query => api.get('/search/tv', { query: { query, page: 1 } });

// Movie related
export const quickSearchMovie = query => api.get('/search/movie', { query: { query, page: 1 } });

export default {
  quickSearchTVShow,
  quickSearchMovie,
};
