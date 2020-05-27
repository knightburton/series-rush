import { VALIDATORS, ERRORS } from '../../../../../../hooks/useForm';

export const stateSchema = {
  label: '',
  color: '',
};

export const validationSchema = {
  label: {
    required: true,
    validators: [
      VALIDATORS.TEXT_MIN(3),
      VALIDATORS.TEXT_MAX(32),
    ],
    errors: [
      ERRORS.TEXT_MIN(3),
      ERRORS.TEXT_MAX(32),
    ],
  },
  color: {
    required: true,
  },
};
