export const VALIDATORS = {
  REQUIRED: /\S/,
  ONLY_NUMBER: /^\d+$/,
  ONLY_ALPHANUMERIC: /^[A-Za-z]+$/,
  TEXT_MIN: min => value => value && value.length >= min,
  TEXT_MAX: max => value => value && value.length <= max,
  TEXT_BETWEEN: (min, max) => value => value && value.length >= min && value.length <= max,
  NUMBER_MIN: min => value => value >= min,
  NUMBER_MAX: max => value => value <= max,
  NUMBER_BETWEEN: (min, max) => value => value >= min && value <= max,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  FILE_MAX_SIZE: size => list => list && list.length && list[0].size <= size,
  FILE_IMAGE_TYPE: list => list && list.length && ['image/jpeg', 'image/png'].includes(list[0].type),
};

export const ERRORS = {
  REQUIRED: { message: 'alert::form/required' },
  ONLY_NUMBER: { message: 'alert::form/onlyNumber' },
  ONLY_ALPHANUMERIC: { message: 'alert::form/onlyAlphanumeric' },
  TEXT_MIN: min => ({ message: 'alert::form/textMin', props: { min } }),
  TEXT_MAX: max => ({ message: 'alert::form/textMax', props: { max } }),
  TEXT_BETWEEN: (min, max) => ({ message: 'alert::form/textBetween', props: { min, max } }),
  NUMBER_MIN: min => ({ message: 'alert::form/numberMin', props: { min } }),
  NUMBER_MAX: max => ({ message: 'alert::form/numberMax', props: { max } }),
  NUMBER_BETWEEN: (min, max) => ({ message: 'alert::form/numberBetween', props: { min, max } }),
  EMAIL: { message: 'alert::form/email' },
  FILE_MAX_SIZE: size => ({ message: 'alert::form/fileMaxSize', props: { size: size / 1000000 } }),
  FILE_IMAGE_TYPE: { message: 'alert::form/fileImageType' },
  // Errors without validator constant
  MATCH: (a, b) => ({ message: 'alert::form/match', props: { a, b } }),
};

export default {
  VALIDATORS,
  ERRORS,
};
