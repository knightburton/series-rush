import { matchPath } from 'react-router-dom';
import { APP_PATHS } from '../constants/paths';

export const getPathnameFromPaths = (pathname, paths, defaultValue) => (
  paths.includes(pathname)
    ? pathname
    : defaultValue
);

export const getHelmetTitle = pathname => {
  const appKey = Object.keys(APP_PATHS).reverse().find(key => matchPath(APP_PATHS[key].to, pathname));
  if (appKey) return APP_PATHS[appKey]?.title || '';
  return '';
};
