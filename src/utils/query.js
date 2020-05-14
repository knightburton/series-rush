import QueryString from 'query-string';

export const getSearchFromQueryString = (search, options) => QueryString.parse(search, options);
export const createSearchQueryString = object => QueryString.stringify(object);
