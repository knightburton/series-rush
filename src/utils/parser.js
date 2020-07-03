/* eslint-disable camelcase */
import { getLocalizedDate } from './date';
import {
  ITEM_TYPES,
  PARSABLE_ITEM_TYPES,
} from '../constants/config';

export const parseTmdbConfiguration = data => {
  if (data && data.images) {
    return {
      imageBaseURL: data.images.secure_base_url,
      backdropSizes: data.images.backdrop_sizes,
      posterSizes: data.images.poster_sizes,
      logoSizes: data.images.logo_sizes,
    };
  }

  return {};
};

const getItemName = (item, type) => {
  if (type === ITEM_TYPES.TV) return item?.name || '';
  if (type === ITEM_TYPES.MOVIE) return item?.title || '';
  return '';
};

const getItemPremiere = (item, type) => {
  if (type === ITEM_TYPES.TV) return getLocalizedDate(item?.first_air_date);
  if (type === ITEM_TYPES.MOVIE) return getLocalizedDate(item?.release_date);
  return '';
};

const getLogoPath = (logo, configuration) => (configuration && logo && configuration?.logoSizes?.includes('w92')
  ? `${configuration.imageBaseURL}w92${logo}`
  : '/no-logo.jpg');

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

const getTypeBasedAttributes = (item, type, configuration) => {
  // Attributes that are available only on tv shows.
  if (type === ITEM_TYPES.TV) {
    return {
      createdBy: item?.created_by?.map(creator => creator?.name || '') || [],
      episodeRunTimes: item?.episode_run_time || [],
      inProduction: item?.in_producation,
      showType: item?.type || '',
      lastEpisode: {
        date: getLocalizedDate(item?.last_episode_to_air?.air_date),
        seasonNumber: item?.last_episode_to_air?.season_number,
        episodeNumber: item?.last_episode_to_air?.episode_number,
        name: item?.last_episode_to_air?.name,
        overview: item?.last_episode_to_air?.overview,
      },
      networks: item?.networks?.map(network => ({
        name: network?.name || '',
        logo: getLogoPath(network?.logo_path, configuration),
      })),
      nextEpisode: {
        date: getLocalizedDate(item?.next_episode_to_air?.air_date),
        seasonNumber: item?.next_episode_to_air?.season_number,
        episodeNumber: item?.next_episode_to_air?.episode_number,
        name: item?.next_episode_to_air?.name,
        overview: item?.next_episode_to_air?.overview,
      },
      numberOfEpisodes: item?.number_of_episodes,
      numberOfSeasons: item?.number_of_seasons,
      seasons: item?.seasons?.map(season => ({
        date: getLocalizedDate(season?.air_date),
        numberOfEpisodes: season?.episode_count || 0,
        name: season?.name,
        overview: season?.overview,
        index: season?.season_number,
      })),
    };
  }

  // Attributes that are available only on movies.
  if (type === ITEM_TYPES.MOVIE) {
    return {
      directedBy: item?.credits?.crew?.filter(member => member?.job === 'Director')?.map(director => director?.name || '') || [],
      productionCountries: item?.production_countries?.map(country => country?.name || ''),
      runtime: item?.runtime,
      spokenLanguages: item?.spoken_languages?.map(lanugage => lanugage?.name || ''),
    };
  }

  // Return an empty string since we do not support any other type.
  return {};
};

const parseItemSummary = (item, type, configuration) => ({
  id: item.id,
  type,
  name: getItemName(item, type),
  premiere: getItemPremiere(item, type),
  overview: item?.overview,
  vote: item?.vote_average,
  ...getImagePaths(item?.poster_path, item?.backdrop_path, configuration),
});

const parseItemDetails = (item, type, configuration) => ({
  genres: item?.genres?.map(genre => genre?.name || ''),
  homepage: item?.homepage || '',
  productionCompanies: item?.production_companies?.map(company => ({
    name: company?.name || '',
    logo: getLogoPath(company?.logo_path, configuration),
  })),
  status: item?.status || '',
  ...getTypeBasedAttributes(item, type, configuration),
});

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
