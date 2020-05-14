import { getLocalizedDate } from './time';
import { COLLECTION_TYPE } from '../constants/config';

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

const parseTVShow = (show, configuration) => ({
  id: show.id,
  type: COLLECTION_TYPE.TV,
  name: show.name,
  premiere: getLocalizedDate(show.first_air_date),
  overview: show.overview,
  vote: show.vote_average,
  ...getImagePaths(show.poster_path, show.backdrop_path, configuration),
});

const parseMovie = (movie, configuration) => ({
  id: movie.id,
  type: COLLECTION_TYPE.MOVIE,
  name: movie.title,
  premiere: getLocalizedDate(movie.release_date),
  overview: movie.overview,
  vote: movie.vote_average,
  ...getImagePaths(movie.poster_path, movie.backdrop_path, configuration),
});

const parseResult = (data, type, configuration) => {
  if (type === COLLECTION_TYPE.TV) return parseTVShow(data, configuration);
  if (type === COLLECTION_TYPE.MOVIE) return parseMovie(data, configuration);
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
