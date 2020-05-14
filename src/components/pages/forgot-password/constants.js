import { VALIDATORS, ERRORS } from '../../../hooks/useForm';

export const stateSchema = {
  email: '',
};

export const validationSchema = {
  email: {
    required: true,
    validators: [VALIDATORS.EMAIL],
    errors: [ERRORS.EMAIL],
  },
};
