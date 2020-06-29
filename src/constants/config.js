export const TV_MAZE_API_ENDPOINT = 'https://api.tvmaze.com';
export const TMDB_API_ENDPOINT = 'https://api.themoviedb.org/3';

export const DRAWER_WIDTH = 240;

export const ITEM_TYPES = {
  TV: 'tv',
  MOVIE: 'movie',
  MULTI: 'multi',
};

export const ELLIPSIS_LENGTHS = {
  XS: 80,
  SM: 140,
  MD: 180,
  LG: 220,
};

export const GROUP_COLORS = [
  { id: 'red', label: 'colors.red' },
  { id: 'pink', label: 'colors.pink' },
  { id: 'purple', label: 'colors.purple' },
  { id: 'blue', label: 'colors.blue' },
  { id: 'cyan', label: 'colors.cyan' },
  { id: 'green', label: 'colors.green' },
  { id: 'yellow', label: 'colors.yellow' },
  { id: 'orange', label: 'colors.orange' },
];

export const MAXIMUM_NUMBER_OF_GROUPS = 6;

export default {
  API_URLS: {
    TV_MAZE_API_ENDPOINT,
    TMDB_API_ENDPOINT,
  },
  DRAWER_WIDTH,
  ITEM_TYPES,
};
