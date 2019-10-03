import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        title={t('page.forgotPassword.title')}
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
          label={t('common:email')}
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
          {t('button:sendResetEmail')}
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
          {t('button:alreadyHaveAccount')}
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
