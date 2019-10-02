import axios from 'axios';

const invoke = (baseURL, method) => async (path, { headers = {}, query = {}, body } = {}) => {
  try {
    const response = await axios({
      method,
      url: path,
      baseURL,
      headers,
      params: query,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Something went wrong');
  }
};

export default invoke;
