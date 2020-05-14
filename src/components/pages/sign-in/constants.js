import { VALIDATORS, ERRORS } from '../../../hooks/useForm';

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
