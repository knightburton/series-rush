import { getTime, differenceInDays, format } from 'date-fns';

export const getTimestamp = () => getTime(new Date());
export const getTimestampFromDate = date => (date ? getTime(new Date(date)) : '');
export const getDayDifferenceGreaterThan = (date, numberOfDays) => differenceInDays(new Date(), new Date(date)) > numberOfDays;
export const getDayDifferenceLessThan = (date, numberOfDays) => differenceInDays(new Date(), new Date(date)) < numberOfDays;
export const getLocalizedDate = date => (date ? format(new Date(date), 'PPP') : '');
