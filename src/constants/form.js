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
  REQUIRED: 'This field is required',
  ONLY_NUMBER: 'This field can only contain numbers',
  ONLY_ALPHANUMERIC: 'This field can only contain alphanumeric characters',
  TEXT_MIN: min => `This field must be ${min} characters long at least`,
  TEXT_MAX: max => `This field must be ${max} characters long maximum`,
  TEXT_BETWEEN: (min, max) => `This field must be between ${min} and ${max} characters long`,
  NUMBER_MIN: min => `This field must be greater or qeual than ${min}`,
  NUMBER_MAX: max => `This field must be smaller or qeual than ${max}`,
  NUMBER_BETWEEN: (min, max) => `This field must be between ${min} and ${max}`,
  EMAIL: 'This field must be a valid email address',
  FILE_MAX_SIZE: size => `The selected file must be ${size / 1000000}MB maximum`,
  FILE_IMAGE_TYPE: 'The selected file must be a jpeg or a png image',
  // Errors without validator constant
  MATCH: (a, b) => `${a} and ${b} fields do not match`,
};

export default {
  VALIDATORS,
  ERRORS,
};
