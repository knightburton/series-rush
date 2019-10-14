import axios from 'axios';

const invoke = (baseURL, method, defaultQuery = {}) => async (path, { headers = {}, query = {}, body } = {}) => {
  try {
    const response = await axios({
      method,
      url: path,
      baseURL,
      headers,
      params: {
        ...defaultQuery,
        ...query,
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Something went wrong');
  }
};

export default invoke;
