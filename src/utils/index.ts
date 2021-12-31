import { getTime } from 'date-fns';

const filterObject = (object: object, filter: (key: string) => boolean): object =>
  Object.fromEntries(Object.entries(object).filter(([key]) => filter(key.toLowerCase())));

export const selectObject = (object: object, keys: string[]): object => {
  const lowProps = keys.map(key => key.toLowerCase());
  return filterObject(object, key => lowProps.includes(key));
};

export const omitObject = (object: object, keys: string[]): object => {
  const lowProps = keys.map(key => key.toLowerCase());
  return filterObject(object, key => !lowProps.includes(key));
};

export const getCurrentTimestamp = (): number => getTime(new Date());
