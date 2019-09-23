import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useForm from '../../../../hooks/useForm';

import useStyles from './sign-in-form.styles';
import { STATE_SCHEMA, VALIDATION_SCHEMA } from './sign-in-form.constants';

const SignInForm = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(STATE_SCHEMA, VALIDATION_SCHEMA);
  const { email, password } = state;

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email.value}
        helperText={email.error}
        error={!!email.error}
        onChange={handleChange}
      />
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
