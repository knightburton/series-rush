const set = <T>(key: string, value: T): void => window.localStorage.setItem(key, JSON.stringify(value));

const get = <T>(key: string, defaultValue?: T): T => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

const remove = (key: string): void => window.localStorage.removeItem(key);

const clear = (): void => window.localStorage.clear();

const key = (index: number): string | null => window.localStorage.key(index);

export default {
  set,
  get,
  remove,
  clear,
  key,
};
