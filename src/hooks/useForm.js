import { useState, useCallback } from 'react';

const validateValue = (validator, value) => {
  if (typeof validator === 'function') return validator(value);
  if (validator instanceof RegExp) return validator.test(value);
  return true;
};

const getIsValueValid = (value, { required, validator }) => {
  if (required && !value) return false;
  if (validator) return validateValue(validator, value);
  return true;
};

const getIsStateValid = (stateSchema, validationSchema, state) => Object.keys(stateSchema).every(key => {
  const { value } = state[key];
  return getIsValueValid(value, validationSchema[key]);
});

const getError = (value, { required, validator, error }) => {
  if (required && !value) return 'This field is required.';
  if (validator) return !validateValue(validator, value) && error ? error : '';
  return '';
};

const validateState = (stateSchema, validationSchema, state) => Object.keys(stateSchema).reduce((o, key) => ({
  ...o,
  [key]: {
    ...state[key],
    error: validationSchema[key] ? getError(state[key].value, validationSchema[key]) : '',
  },
}), {});

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
