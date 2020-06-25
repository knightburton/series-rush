const functions = require('firebase-functions');

const invoke = require('./request');
const { TMDB_API_ENDPOINT } = require('../constants');

const api = {
  get: invoke({
    baseURL: TMDB_API_ENDPOINT,
    method: 'GET',
    defaultQuery: {
      api_key: functions.config().seriesrush.tmdb_api_key,
    },
  }),
};

const getDetailsByTypeAndId = (type, id) => api.get(`/${type}/${id}`, {
  query: {
    append_to_response: 'external_ids',
  },
});

module.exports = {
  getDetailsByTypeAndId,
};
