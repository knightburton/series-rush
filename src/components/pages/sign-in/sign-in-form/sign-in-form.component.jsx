import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useForm from '../../../../hooks/useForm';

import useStyles from './sign-in-form.styles';

const stateSchema = {
  email: { value: '', error: '' },
  password: { value: '', error: '' },
};

const validationSchema = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};

const SignInForm = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(stateSchema, validationSchema);

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
        value={state.email.value}
        helperText={state.email.error}
        error={!!state.email.error}
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
        value={state.password.value}
        helperText={state.password.error}
        error={!!state.password.error}
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
