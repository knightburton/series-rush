import invoke from './axios';
import { TMDB_API_ENDPOINT } from '../constants/config';

const api = {
  get: invoke(TMDB_API_ENDPOINT, 'GET', { api_key: process.env.REACT_APP_TMDB_API_KEY }),
};

// TV Show related
export const searchTV = (query, page = 1) => api.get('/search/tv', { query: { query, page } });

// Movie related
export const searchMovie = (query, page = 1) => api.get('/search/movie', { query: { query, page } });

// Other
export const searchWithType = (query, type, page = 1) => api.get(`/search/${type}`, { query: { query, page } });

export default {
  searchTV,
  searchMovie,
  searchWithType,
};
