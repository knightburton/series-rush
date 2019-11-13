/* eslint-disable camelcase */
import QueryString from 'query-string';
import { getTime, differenceInDays, format } from 'date-fns';
import { SEARCH_TYPES } from '../constants/config';

// Query utils
export const getSearchFromQueryString = (search, options) => QueryString.parse(search, options);
export const createSearchQueryString = object => QueryString.stringify(object);

// Time utils
export const getTimestamp = () => getTime(new Date());
export const getTimestampFromDate = date => getTime(new Date(date));
export const getDayDifferenceGreaterThan = (date, numberOfDays) => differenceInDays(new Date(), new Date(date)) > numberOfDays;
export const getDayDifferenceLessThan = (date, numberOfDays) => differenceInDays(new Date(), new Date(date)) < numberOfDays;
export const getLocalizedDate = date => format(new Date(date), 'PPP');

// Text utils
export const getEllipsisText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length).split(/\s/).slice(0, -1).join(' ')}...`;
};
export const getFirstLetter = (string, defaultValue = '') => (string && typeof string === 'string' && string.charAt(0)) || defaultValue;

// Location utils
export const getValidatedPathnameFromPaths = (pathname, paths, defaultValue) => (
  paths.includes(pathname)
    ? pathname
    : defaultValue
);

// TMDb utils
export const parseTmdbConfiguration = data => {
  if (data && data.images) {
    const { secure_base_url, backdrop_sizes, poster_sizes } = data.images;

    return {
      imageBaseURL: secure_base_url,
      backdropSizes: backdrop_sizes,
      posterSizes: poster_sizes,
    };
  }

  return {};
};

const getImagePaths = (poster, backdrop, configuration) => {
  const posterPath = configuration && poster && configuration.posterSizes.includes('w185')
    ? `${configuration.imageBaseURL}w185${poster}`
    : '/p-no-poster.jpg';
  const backdropPath = configuration && backdrop && configuration.backdropSizes.includes('w780')
    ? `${configuration.imageBaseURL}w780${backdrop}`
    : '/l-no-poster.jpg';

  return {
    posterPath,
    backdropPath,
  };
};

const parseTVShow = (show, configuration) => {
  const { id, name, first_air_date, overview, poster_path, backdrop_path, vote_average } = show;

  return {
    id,
    type: SEARCH_TYPES.TV,
    name,
    premiere: getLocalizedDate(first_air_date),
    overview,
    vote: vote_average,
    ...getImagePaths(poster_path, backdrop_path, configuration),
  };
};

const parseMovie = (movie, configuration) => {
  const { id, title, release_date, overview, poster_path, backdrop_path, vote_average } = movie;

  return {
    id,
    type: SEARCH_TYPES.MOVIE,
    name: title,
    premiere: getLocalizedDate(release_date),
    overview,
    vote: vote_average,
    ...getImagePaths(poster_path, backdrop_path, configuration),
  };
};

const parseResult = (data, type, configuration) => {
  if (type === SEARCH_TYPES.TV) return parseTVShow(data, configuration);
  if (type === SEARCH_TYPES.MOVIE) return parseMovie(data, configuration);
  return null;
};

export const parseSearchData = (data, type, configuration) => {
  const results = data.results.reduce((a, result) => {
    const parsedResult = parseResult(result, result.media_type || type, configuration);
    if (parsedResult) return [...a, parsedResult];
    return a;
  }, []);

  return {
    numberOfPage: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results,
  };
};
