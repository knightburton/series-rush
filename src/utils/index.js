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

const parseTVShow = show => {
  const { id, name, first_air_date, overview } = show;

  return {
    id,
    name,
    premiere: first_air_date,
    overview,
  };
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
    numberOfPage: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results,
  };
};
