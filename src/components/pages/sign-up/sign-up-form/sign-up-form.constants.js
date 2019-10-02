import { VALIDATORS, ERRORS } from '../../../../constants/form';

export const STATE_SCHEMA = {
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' },
  email: { value: '', error: '' },
  password: { value: '', error: '' },
  confirmPassword: { value: '', error: '' },
};

export const VALIDATION_SCHEMA = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  email: {
    required: true,
    validators: [VALIDATORS.EMAIL],
    errors: [ERRORS.EMAIL],
  },
  password: {
    required: true,
    validators: [VALIDATORS.TEXT_BETWEEN(6, 24)],
    errors: [ERRORS.TEXT_BETWEEN(6, 24)],
  },
  confirmPassword: {
    required: true,
    match: 'password',
    matchError: ERRORS.MATCH('Password', 'Confirm password'),
  },
};
