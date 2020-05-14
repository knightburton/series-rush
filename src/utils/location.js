import { matchPath } from 'react-router';
import { APP_PATHS } from '../constants/paths';

export const getPathnameFromPaths = (pathname, paths, defaultValue) => (
  paths.includes(pathname)
    ? pathname
    : defaultValue
);

export const getHelmetTitle = pathname => {
  const appKey = Object.keys(APP_PATHS).reverse().find(key => matchPath(pathname, APP_PATHS[key]));
  if (appKey) return APP_PATHS[appKey]?.title || '';
  return '';
};
