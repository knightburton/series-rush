import { VALIDATORS, ERRORS } from '../../../constants/form';

export const stateSchema = {
  email: { value: '', error: '' },
};

export const validationSchema = {
  email: {
    required: true,
    validators: [VALIDATORS.EMAIL],
    errors: [ERRORS.EMAIL],
  },
};
