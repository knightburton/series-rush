import { getLocalizedDate } from './date';
import { ITEM_TYPES } from '../constants/config';

export const parseTmdbConfiguration = data => {
  if (data && data.images) {
    return {
      imageBaseURL: data.images.secure_base_url,
      backdropSizes: data.images.backdrop_sizes,
      posterSizes: data.images.poster_sizes,
    };
  }

  return {};
};

const getImagePaths = (poster, backdrop, configuration) => {
  const posterPath = configuration && poster && configuration?.posterSizes?.includes('w185')
    ? `${configuration.imageBaseURL}w185${poster}`
    : '/p-no-poster.jpg';
  const backdropPath = configuration && backdrop && configuration?.backdropSizes?.includes('w780')
    ? `${configuration.imageBaseURL}w780${backdrop}`
    : '/l-no-poster.jpg';

  return {
    posterPath,
    backdropPath,
  };
};

const parseTVShowSummary = (show, configuration) => ({
  id: show.id,
  type: ITEM_TYPES.TV,
  name: show.name,
  premiere: getLocalizedDate(show.first_air_date),
  overview: show.overview,
  vote: show.vote_average,
  ...getImagePaths(show.poster_path, show.backdrop_path, configuration),
});

const parseTVShowDetails = () => ({});

const parseMovieSummary = (movie, configuration) => ({
  id: movie.id,
  type: ITEM_TYPES.MOVIE,
  name: movie.title,
  premiere: getLocalizedDate(movie.release_date),
  overview: movie.overview,
  vote: movie.vote_average,
  ...getImagePaths(movie.poster_path, movie.backdrop_path, configuration),
});

const parseMovieDetails = () => ({});

const parseItemSummary = (data, type, configuration) => {
  if (type === ITEM_TYPES.TV) return parseTVShowSummary(data, configuration);
  if (type === ITEM_TYPES.MOVIE) return parseMovieSummary(data, configuration);
  return {};
};

const parseItemDetails = (data, type, configuration) => {
  if (type === ITEM_TYPES.TV) return parseTVShowDetails(data, configuration);
  if (type === ITEM_TYPES.MOVIE) return parseMovieDetails(data, configuration);
  return {};
};

export const parseSearchItems = (data, type, configuration) => {
  const results = data.results.reduce((a, result) => {
    const parsedResult = parseItemSummary(result, result.media_type || type, configuration);
    if (parsedResult?.id) return [...a, parsedResult];
    return a;
  }, []);

  return {
    numberOfPage: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results,
  };
};

export const parseSearchItemDetails = (data, type, configuration) => {
  const summary = parseItemSummary(data, data.media_type || type, configuration);
  const details = parseItemDetails(data, data.media_type || type, configuration);

  return {
    ...summary,
    ...details,
  };
};
