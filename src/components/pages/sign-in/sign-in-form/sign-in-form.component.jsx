import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useForm from '../../../../hooks/useForm';

import useStyles from './sign-in-form.styles';
import { stateSchema, validationSchema } from './sign-in-form.constants';

const SignInForm = ({ inProgress, signIn }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: signIn,
  });
  const { email, password } = state;

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="dense"
        required
        fullWidth
        id="email"
        label={t('common:email')}
        name="email"
        autoComplete="email"
        value={email.value}
        helperText={t(...email.error)}
        error={!!email.error}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="dense"
        required
        fullWidth
        name="password"
        label={t('common:password')}
        type="password"
        id="password"
        autoComplete="current-password"
        value={password.value}
        helperText={t(...password.error)}
        error={!!password.error}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={inProgress}
      >
        {t('button:signIn')}
      </Button>
    </form>
  );
};

SignInForm.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default SignInForm;
