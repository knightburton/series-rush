export const TV_MAZE_API_ENDPOINT = 'https://api.tvmaze.com';
export const TMDB_API_ENDPOINT = 'https://api.themoviedb.org/3';

export const DRAWER_WIDTH = 240;

export const ITEM_TYPES = {
  TV: 'tv',
  MOVIE: 'movie',
  MULTI: 'multi',
};

export const PARSABLE_ITEM_TYPES = [
  ITEM_TYPES.TV,
  ITEM_TYPES.MOVIE,
];

export const ELLIPSIS_LENGTHS = {
  XS: 80,
  SM: 140,
  MD: 180,
  LG: 220,
};

export const MAXIMUM_NUMBER_OF_GROUPS = 6;

export default {
  API_URLS: {
    TV_MAZE_API_ENDPOINT,
    TMDB_API_ENDPOINT,
  },
  DRAWER_WIDTH,
  ITEM_TYPES,
};
