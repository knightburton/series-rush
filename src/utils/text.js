export const getEllipsisText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length).split(/\s/).slice(0, -1).join(' ')}...`;
};

export const getFirstLetter = (string, defaultValue = '') => (string && typeof string === 'string' && string.charAt(0)) || defaultValue;
