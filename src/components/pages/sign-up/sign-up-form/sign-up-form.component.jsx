import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useForm from '../../../../hooks/useForm';
import { FORM_VALIDATORS, FORM_ERRORS } from '../../../../constants';

import useStyles from './sign-up-form.styles';

const stateSchema = {
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' },
  email: { value: '', error: '' },
  password: { value: '', error: '' },
  confirmPassword: { value: '', error: '' },
};

const validationSchema = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  email: {
    required: true,
    validator: FORM_VALIDATORS.EMAIL,
    error: FORM_ERRORS.EMAIL,
  },
  password: {
    required: true,
    validator: FORM_VALIDATORS.TEXT_BETWEEN(6, 24),
    error: FORM_ERRORS.TEXT_BETWEEN(6, 24),
  },
  confirmPassword: {
    required: true,
    validator: FORM_VALIDATORS.TEXT_BETWEEN(6, 24),
    error: FORM_ERRORS.TEXT_BETWEEN(6, 24),
  },
};

const SignUpForm = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(stateSchema, validationSchema);

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            value={state.firstName.value}
            helperText={state.firstName.error}
            error={!!state.firstName.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            autoComplete="lastName"
            value={state.lastName.value}
            helperText={state.lastName.error}
            error={!!state.lastName.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={state.email.value}
            helperText={state.email.error}
            error={!!state.email.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password.value}
            helperText={state.password.error}
            error={!!state.password.error}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="off"
            value={state.confirmPassword.value}
            helperText={state.confirmPassword.error}
            error={!!state.confirmPassword.error}
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
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
