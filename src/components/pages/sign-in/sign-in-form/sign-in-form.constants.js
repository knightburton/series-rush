import { VALIDATORS, ERRORS } from '../../../../constants/form';

export const stateSchema = {
  email: '',
  password: '',
};

export const validationSchema = {
  email: {
    required: true,
    validators: [VALIDATORS.EMAIL],
    errors: [ERRORS.EMAIL],
  },
  password: {
    required: true,
  },
};
