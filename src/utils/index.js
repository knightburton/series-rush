import { SEARCH_TYPES } from '../constants/config';

// Time utils
export const getTimestamp = () => new Date().getTime();
export const getTimestampFromDate = date => new Date(date).getTime();

// TMDB utils
const parseTVShow = show => {
  const { name } = show;
  return name;
};
const parseMovie = movie => {
  const { title } = movie;
  return title;
};

const parseResult = (data, type) => {
  if (type === SEARCH_TYPES.TV) return parseTVShow(data);
  if (type === SEARCH_TYPES.MOVIE) return parseMovie(data);
  return null;
};

export const parseSearchData = (data, type) => {
  const results = data.results.map(result => parseResult(result, result.media_type || type));

  return {
    page: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results,
  };
};
