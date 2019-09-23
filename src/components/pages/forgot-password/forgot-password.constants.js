import { FORM_VALIDATORS, FORM_ERRORS } from '../../../constants';

export const STATE_SCHEMA = {
  email: { value: '', error: '' },
};

export const VALIDATION_SCHEMA = {
  email: {
    required: true,
    validators: [FORM_VALIDATORS.EMAIL],
    errors: [FORM_ERRORS.EMAIL],
  },
};
