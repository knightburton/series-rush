import { useState, useCallback } from 'react';
import { FORM_VALIDATORS, FORM_ERRORS } from '../constants';

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
const getIsValueValid = (value = null, { required, match, matchError, validators, errors } = {}, state = {}) => {
  if (required && !FORM_VALIDATORS.REQUIRED.test(value)) return FORM_ERRORS.REQUIRED;
  if (match && state[match] && state[match].value !== value) return matchError;
  if (validators) {
    const invalidIndex = getInvalidValidatorIndex(value, validators, state);
    return invalidIndex !== null ? errors[invalidIndex] : '';
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
  return getIsValueValid(value, validationSchema[key], state) === '';
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
    error: validationSchema[key] ? getIsValueValid(state[key].value, validationSchema[key], state) : '',
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

    const isStateValid = getIsStateValid(validationSchema, state);

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
