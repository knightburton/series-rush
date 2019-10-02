import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useForm from '../../../../hooks/useForm';

import useStyles from './sign-up-form.styles';
import { stateSchema, validationSchema } from './sign-up-form.constants';

const SignUpForm = ({ createProfile, inProgress }) => {
  const classes = useStyles();
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
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            value={firstName.value}
            helperText={firstName.error}
            error={!!firstName.error}
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
            value={lastName.value}
            helperText={lastName.error}
            error={!!lastName.error}
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
            value={email.value}
            helperText={email.error}
            error={!!email.error}
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
            value={password.value}
            helperText={password.error}
            error={!!password.error}
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
            value={confirmPassword.value}
            helperText={confirmPassword.error}
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
        Sign Up
      </Button>
    </form>
  );
};

SignUpForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default SignUpForm;
