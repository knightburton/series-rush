import { VALIDATORS, ERRORS } from '../../../../constants/form';

export const stateSchema = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const validationSchema = {
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
    matchError: ERRORS.MATCH('commonn::newPassword', 'commonn::confirmPassword'),
  },
};
