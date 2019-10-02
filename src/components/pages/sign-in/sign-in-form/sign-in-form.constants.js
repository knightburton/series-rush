import { VALIDATORS, ERRORS } from '../../../../constants/form';

export const STATE_SCHEMA = {
  email: { value: '', error: '' },
  password: { value: '', error: '' },
};

export const VALIDATION_SCHEMA = {
  email: {
    required: true,
    validators: [VALIDATORS.EMAIL],
    errors: [ERRORS.EMAIL],
  },
  password: {
    required: true,
  },
};
