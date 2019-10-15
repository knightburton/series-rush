import invoke from './axios';
import { TMDB_API_ENDPOINT } from '../constants/config';

const api = {
  get: invoke(TMDB_API_ENDPOINT, 'GET', { api_key: process.env.REACT_APP_TMDB_API_KEY }),
};

// TV Show related
export const searchTV = query => api.get('/search/tv', { query: { query, page: 1 } });

// Movie related
export const searchMovie = query => api.get('/search/movie', { query: { query, page: 1 } });

// Other
export const searchWithType = (query, type = 'tv') => api.get(`/search/${type}`, { query: { query, page: 1 } });

export default {
  searchTV,
  searchMovie,
  searchWithType,
};
