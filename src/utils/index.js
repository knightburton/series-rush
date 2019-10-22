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

// Text utils
export const getEllipsisText = (text, length) => `${text.substring(0, length).split(/\s/).slice(0, -1).join(' ')}...`;

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
