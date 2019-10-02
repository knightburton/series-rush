import invoke from './axios';
import { TV_MAZE_API_URL } from '../constants';

const api = {
  get: invoke(TV_MAZE_API_URL, 'GET'),
};

export const searchShow = show => api.get('/search/shows', { query: { q: show } });
export const searchSingleShow = show => api.get('/singlesearch/shows', { query: { q: show } });

export default {
  searchShow,
  searchSingleShow,
};
