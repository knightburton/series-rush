import invoke from './axios';
import { TMDB_API_ENDPOINT } from '../constants/config';

const api = {
  get: invoke(TMDB_API_ENDPOINT, 'GET', { api_key: process.env.REACT_APP_TMDB_API_KEY }),
};

// Configuration
export const getConfiguration = () => api.get('/configuration');

// Search: TV Show related
export const searchTV = (query, page = 1) => api.get('/search/tv', { query: { query, page } });

// Search: Movie related
export const searchMovie = (query, page = 1) => api.get('/search/movie', { query: { query, page } });

// Search: Other
export const searchWithType = (query, type, page = 1) => api.get(`/search/${type}`, { query: { query, page } });

// Details: TV
export const getTVDetails = id => api.get(`/tv/${id}`);

// Details: Movie
export const getMovieDetails = id => api.get(`/movie/${id}`);

// Details: dynamic
export const getDetails = (type, id) => api.get(`/${type}/${id}`);

export default {
  getConfiguration,
  searchTV,
  searchMovie,
  searchWithType,
  getTVDetails,
  getMovieDetails,
  getDetails,
};
