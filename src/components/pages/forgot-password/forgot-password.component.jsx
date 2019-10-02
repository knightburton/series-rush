import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import LockIcon from '@material-ui/icons/LockOutlined';

import Header from '../../commons/header/header.component';
import useForm from '../../../hooks/useForm';

import useStyles from './forgot-password.styles';
import { stateSchema, validationSchema } from './forgot-password.constants';

const ForgotPassword = ({ inProgress, sendPasswordResetEmail }) => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: ({ email }) => sendPasswordResetEmail(email),
  });
  const { email } = state;

  return (
    <Container maxWidth="xs">
      <Header
        icon={LockIcon}
        title="Forgot Password"
        inProgress={inProgress}
        gutter
      />

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="dense"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send password reset email
        </Button>
      </form>

      <Box className={classes.buttonContainer}>
        <Button
          variant="text"
          color="primary"
          size="small"
          className={classes.signInButton}
          component={Link}
          to="/sign-in"
          disabled={inProgress}
        >
          Already have an account? Sign In
        </Button>
      </Box>
    </Container>
  );
};

ForgotPassword.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  sendPasswordResetEmail: PropTypes.func.isRequired,
};

export default ForgotPassword;
