/* eslint-disable camelcase */
import QueryString from 'query-string';
import moment from 'moment';
import { SEARCH_TYPES } from '../constants/config';

// Query utils
export const getSearchFromQueryString = (search, options) => QueryString.parse(search, options);
export const createSearchQueryString = object => QueryString.stringify(object);

// Time utils
export const getTimestamp = () => moment().valueOf();
export const getTimestampFromDate = date => moment(date).valueOf();
export const getDayDifferenceGreaterThan = (date, numberOfDays) => moment().diff(date, 'days') > numberOfDays;
export const getDayDifferenceLessThan = (date, numberOfDays) => moment().diff(date, 'days') < numberOfDays;
export const getLocalizedDate = date => moment(date).format('LL');

// TMDB utils
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

const getPosterPath = (path, configuration) => {
  if (configuration && path) {
    const { imageBaseURL, posterSizes } = configuration;
    const posterSize = posterSizes.includes('w185') ? 'w185' : 'original';

    return `${imageBaseURL}${posterSize}${path}`;
  }

  return '/no-poster.jpg';
};

const parseTVShow = (show, configuration) => {
  const { id, name, first_air_date, overview, poster_path, vote_average } = show;

  return {
    id,
    type: SEARCH_TYPES.TV,
    name,
    premiere: getLocalizedDate(first_air_date),
    poster: getPosterPath(poster_path, configuration),
    overview,
    vote: vote_average,
  };
};

const parseMovie = movie => {
  const { title } = movie;
  return title;
};

const parseResult = (data, type, configuration) => {
  if (type === SEARCH_TYPES.TV) return parseTVShow(data, configuration);
  if (type === SEARCH_TYPES.MOVIE) return parseMovie(data, configuration);
  return null;
};

export const parseSearchData = (data, type, configuration) => {
  const results = data.results.map(result => parseResult(result, result.media_type || type, configuration));

  return {
    numberOfPage: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results,
  };
};
