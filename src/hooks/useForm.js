import { useState, useCallback } from 'react';
import { VALIDATORS, ERRORS } from '../constants/form';

/**
 * Creates a nested object from the initial state schema,
 * which will contains the value and error properties.
 *
 * @param {object} stateSchema The initial state values with keys and values.
 */
const getInitialState = stateSchema => Object.keys(stateSchema).reduce((o, key) => ({
  ...o,
  [key]: { value: stateSchema[key], error: '' },
}), {});

/**
 * Return an array that contains the error key for the i18n and the possible interpolation values.
 *
 * @param {object} error The error object that contains the error message and the interpolation props
 * @param {string} error.message The error message itself
 * @param {object} error.props The error props for the i18n interpolation
 */
export const getErrorArguments = error => {
  const message = (error && error.message) || null;
  const props = (error && error.props) || {};

  return [
    message,
    props,
  ];
};

/**
 * Return the invalid validator index from the validation schema.
 *
 * @param {(string|number)} value Actual value that should be validated.
 * @param {array} validationSchema.validators The validators of the state item.
 */
const getInvalidValidatorIndex = (value = null, validators = []) => {
  const invalidIndex = validators.findIndex(validator => {
    if (typeof validator === 'function') return !validator(value);
    if (validator instanceof RegExp) return !validator.test(value);
    return false;
  });

  return invalidIndex !== -1 ? invalidIndex : null;
};

/**
 * Return empty string if the given value is valid,
 * error message if the value is required and empty, or otherwise.
 *
 * @param {(string|number)} value Actual value that should be validated.
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {boolean} validationSchema.required The required value of the state item.
 * @param {string} validationSchema.match The match key of the state item.
 * @param {string} validationSchema.matchError The match error message in case of mismatch.
 * @param {array} validationSchema.validators The validators of the state item.
 * @param {array} validationSchema.errors The error messages of the state item.
 * @param {object} state The actual state of the form.
 */
const getValidationError = (value = null, { required, match, matchError, validators, errors } = {}, state = {}) => {
  if (required && !VALIDATORS.REQUIRED.test(value)) return [ERRORS.REQUIRED.message];
  if (match && state[match] && state[match].value !== value) return [matchError.message];
  if (validators) {
    const invalidIndex = getInvalidValidatorIndex(value, validators, state);
    return invalidIndex !== null ? getErrorArguments(errors[invalidIndex]) : '';
  }
  return '';
};

/**
 * Return true if the state each values are valid,
 * false otherwise.
 *
 * @param {object} stateSchema The initial state.
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {object} state The actual updated state.
 */
const getIsStateValid = (validationSchema = {}, state = {}) => Object.keys(state).every(key => {
  const { value } = state[key];
  return getValidationError(value, validationSchema[key], state) === '';
});

/**
 * Return a new state object which is updated with the proper error messages.
 *
 * @param {object} stateSchema The initial state
 * @param {object} validationSchema The schema that contains the validation props.
 * @param {object} state The actual updated state.
 */
const validateState = (stateSchema, validationSchema = {}, state = {}) => Object.keys(stateSchema).reduce((o, key) => ({
  ...o,
  [key]: {
    ...state[key],
    error: validationSchema[key] ? getValidationError(state[key].value, validationSchema[key], state) : '',
  },
}), {});

/**
 * Custom hooks to validate and handle a form.
 *
 * @param {object} stateSchema Model your initial state.
 * @param {object} validationSchema Model your state validation.
 * @param {function} callback Function to be execute during form submission.
 * @param {boolean} resetState Should reset the actual state after a successfull submit or not.
 */
const useForm = ({ stateSchema, validationSchema, callback, resetState = false }) => {
  const [state, setState] = useState(() => getInitialState(stateSchema));

  const handleChange = useCallback(event => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: {
        value,
        error: '',
      },
    }));
  }, []);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    const isStateValid = getIsStateValid(validationSchema, state);

    if (isStateValid) {
      if (callback) callback(Object.keys(state).reduce((o, key) => ({ ...o, [key]: state[key].value }), {}));
      if (resetState) setState(stateSchema);
      return;
    }
    setState(validateState(stateSchema, validationSchema, state));
  }, [state, stateSchema, validationSchema, callback, resetState]);

  return {
    state,
    handleChange,
    handleSubmit,
    resetState,
  };
};

export default useForm;
