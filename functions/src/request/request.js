const request = require('request');

const invoke = ({ baseURL, method, defaultQuery = {} }) => (path, { headers = {}, query = {}, body } = {}) => new Promise((resolve, reject) => {
  const requestOptions = {
    method,
    baseURL,
    url: path,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body || null,
    params: {
      ...defaultQuery,
      ...query,
    },
    json: true,
  };

  request(requestOptions, (error, response) => {
    if (error || response.statusCode >= 300) {
      console.log('[Request error]', error, response);
      return reject(error || response);
    }

    try {
      const result = JSON.parse(response.body || '{}');
      return resolve(result);
    } catch (jsonError) {
      console.log('[Request jsonError]', jsonError);
      return resolve(response.body);
    }
  });
});

module.exports = invoke;
