import invoke from './axios';
import { TV_MAZE_API_ENDPOINT } from '../constants/config';

const api = {
  get: invoke(TV_MAZE_API_ENDPOINT, 'GET'),
};

export const searchShow = show => api.get('/search/shows', { query: { q: show } });
export const searchSingleShow = show => api.get('/singlesearch/shows', { query: { q: show } });

export default {
  searchShow,
  searchSingleShow,
};
