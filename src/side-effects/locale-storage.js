const set = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

const get = key => JSON.parse(window.localStorage.getItem(key));

const remove = key => window.localStorage.removeItem(key);

const clear = () => window.localStorage.clear();

const key = index => window.localStorage.key(index);

export default {
  set,
  get,
  remove,
  clear,
  key,
};
