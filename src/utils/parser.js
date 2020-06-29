import { getLocalizedDate } from './date';
import { PARSABLE_ITEM_TYPES } from '../constants/config';

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

const parseItemSummary = (item, type, configuration) => ({
  id: item.id,
  type,
  name: item.name,
  premiere: getLocalizedDate(item.first_air_date),
  overview: item.overview,
  vote: item.vote_average,
  ...getImagePaths(item.poster_path, item.backdrop_path, configuration),
});

const parseItemDetails = () => ({});

export const parseSearchItems = (data, type, configuration) => {
  // Collect those items that are accepted for us.
  const items = data.results.reduce((a, item) => {
    // Makse sure there is a type on each item.
    const guardedType = item.media_type || type;
    // Parse the item if the type is fine for us.
    // Otherwise, skip this item.
    if (PARSABLE_ITEM_TYPES.includes(guardedType)) {
      const parsedItem = parseItemSummary(item, guardedType, configuration);
      return [...a, parsedItem];
    }
    return a;
  }, []);

  // Define the final result to store.
  return {
    numberOfPage: data.page,
    numberOfPages: data.total_pages,
    numberOfResults: data.total_results,
    results: items,
  };
};

export const parseSearchItemDetails = (item, type, configuration) => {
  const guardedType = item.media_type || type;

  // Parse the item if the type is fine for us.
  // Otherwise, return null and handle this in the thunk.
  if (!PARSABLE_ITEM_TYPES.includes(guardedType)) return null;

  // Collect the summary and detailed props as well.
  const summary = parseItemSummary(item, guardedType, configuration);
  const details = parseItemDetails(item, guardedType, configuration);

  return {
    ...summary,
    ...details,
  };
};
