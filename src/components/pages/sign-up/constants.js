import { VALIDATORS, ERRORS } from '../../../constants/form';

export const stateSchema = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const validationSchema = {
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
    match: {
      field: 'password',
      error: ERRORS.MATCH('common::password', 'common::confirmPassword'),
    },
  },
};
