import { VALIDATORS, ERRORS } from '../../../../constants/form';

export const STATE_SCHEMA = {
  currentPassword: { value: '', error: '' },
  newPassword: { value: '', error: '' },
  confirmPassword: { value: '', error: '' },
};

export const VALIDATION_SCHEMA = {
  currentPassword: {
    required: true,
  },
  newPassword: {
    required: true,
    validators: [VALIDATORS.TEXT_BETWEEN(6, 24)],
    errors: [ERRORS.TEXT_BETWEEN(6, 24)],
  },
  confirmPassword: {
    required: true,
    match: 'newPassword',
    matchError: ERRORS.MATCH('New passwrod', 'Confirm password'),
  },
};
