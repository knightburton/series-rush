import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useForm from '../../../../hooks/useForm';

import useStyles from './sign-up-form.styles';
import { stateSchema, validationSchema } from './sign-up-form.constants';

const SignUpForm = ({ createProfile, inProgress }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: createProfile,
  });
  const { firstName, lastName, email, password, confirmPassword } = state;

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="firstName"
            label={t('common:firstName')}
            name="firstName"
            autoComplete="firstName"
            value={firstName.value}
            helperText={t(...firstName.error)}
            error={!!firstName.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="lastName"
            label={t('common:lastName')}
            type="lastName"
            id="lastName"
            autoComplete="lastName"
            value={lastName.value}
            helperText={t(...lastName.error)}
            error={!!lastName.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="email"
            label={t('common:email')}
            type="email"
            id="email"
            autoComplete="email"
            value={email.value}
            helperText={t(...email.error)}
            error={!!email.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="confirmPassword"
            label={t('common:confirmPassword')}
            type="password"
            id="confirmPassword"
            autoComplete="off"
            value={confirmPassword.value}
            helperText={t(...confirmPassword.error)}
            error={!!confirmPassword.error}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={inProgress}
      >
        {t('common:signUp')}
      </Button>
    </form>
  );
};

SignUpForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default SignUpForm;
