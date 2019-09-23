import { FORM_VALIDATORS, FORM_ERRORS } from '../../../../constants';

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
    validators: [FORM_VALIDATORS.EMAIL],
    errors: [FORM_ERRORS.EMAIL],
  },
  password: {
    required: true,
    validators: [FORM_VALIDATORS.TEXT_BETWEEN(6, 24)],
    errors: [FORM_ERRORS.TEXT_BETWEEN(6, 24)],
  },
  confirmPassword: {
    required: true,
    match: 'password',
    matchError: FORM_ERRORS.MATCH('Password', 'Confirm password'),
  },
};
