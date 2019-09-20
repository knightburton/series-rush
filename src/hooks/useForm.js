import { useState, useCallback } from 'react';
import { FORM_ERRORS } from '../constants';

/**
 * Returns true if the given value is valid or the validator is not correct,
 * false otherwise.
 *
 * @param {(function|RegExp)} validator Value validator function or regular expression.
 * @param {string|number} value The value that should be validated.
 */
const validateValue = (validator, value) => {
  if (typeof validator === 'function') return validator(value);
  if (validator instanceof RegExp) return validator.test(value);
  return true;
};

/**
 * Return true if the given value is valid,
 * false if the value is required and empty, or otherwise.
 *
 * @param {(string|number)} value Actual value that should be validated.
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {boolean} validationSchema.required The required value of the state item.
 * @param {boolean} validationSchema.validator The validator of the state item.
 */
const getIsValueValid = (value, { required, validator }) => {
  if (required && !value) return false;
  if (validator) return validateValue(validator, value);
  return true;
};

/**
 * Return true if the state each values are valid,
 * false otherwise.
 *
 * @param {object} stateSchema The initial state.
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {object} state The actual updated state.
 */
const getIsStateValid = (stateSchema, validationSchema, state) => Object.keys(stateSchema).every(key => {
  const { value } = state[key];
  return getIsValueValid(value, validationSchema[key]);
});

/**
 * Return the error message in case of invalid value,
 * empty string otherwise.
 *
 * @param {(string|number)} value Actual value that is the base of the error lookup.
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {boolean} validationSchema.required The required value of the state item.
 * @param {boolean} validationSchema.validator The validator of the state item.
 * @param {boolean} validationSchema.error The error message in case of invalid value.
 */
const getError = (value, { required, validator, error }) => {
  if (required && !value) return FORM_ERRORS.REQUIRED;
  if (validator) return !validateValue(validator, value) && error ? error : '';
  return '';
};

/**
 * Return a new state object which is updated with the proper error messages.
 *
 * @param {object} stateSchema The initial state
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {object} state The actual updated state.
 */
const validateState = (stateSchema, validationSchema, state) => Object.keys(stateSchema).reduce((o, key) => ({
  ...o,
  [key]: {
    ...state[key],
    error: validationSchema[key] ? getError(state[key].value, validationSchema[key]) : '',
  },
}), {});

/**
 * Custom hooks to validate and handle a form.
 *
 * @param {object} stateSchema Model your initial state.
 * @param {object} validationSchema Model your state validation.
 * @param {function} callback Function to be execute during form submission.
 */
const useForm = (stateSchema = {}, validationSchema = {}, callback = () => {}) => {
  const [state, setState] = useState(stateSchema);

  const handleChange = event => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: {
        value,
        error: '',
      },
    }));
  };

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    const isStateValid = getIsStateValid(stateSchema, validationSchema, state);

    if (isStateValid) return callback(Object.keys(state).reduce((o, key) => ({ ...o, [key]: state[key].value }), {}));
    return setState(validateState(stateSchema, validationSchema, state));
  }, [state, stateSchema, validationSchema, callback]);

  return {
    state,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
