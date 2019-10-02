import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Section from '../../../commons/section/section.component';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import useForm from '../../../../hooks/useForm';

import useStyles from './change-password.styles';
import { STATE_SCHEMA, VALIDATION_SCHEMA } from './change-password.constants';

const ChangePassword = ({ inProgress, sendPasswordResetEmail }) => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(STATE_SCHEMA, VALIDATION_SCHEMA, () => {});
  const { currentPassword, newPassword, confirmPassword } = state;

  return (
    <Section
      title="Change Password"
      subtitle="change or reset your account password"
      inProgress={inProgress}
    >
      <Container maxWidth="xs">
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
            autoComplete="currentPassword"
            value={currentPassword.value}
            helperText={currentPassword.error}
            error={!!currentPassword.error}
            onChange={handleChange}
          />
          <Confirmation
            id="profile-forgot-password"
            title="Request Password reset?"
            description="You will receive an email that contains every information that you need to do in order to create a new password."
            onAgree={() => sendPasswordResetEmail(null, true)}
            toggle={show => (
              <Button
                color="primary"
                size="small"
                className={classes.forgot}
                onClick={show}
              >
                Forgot password?
              </Button>
            )}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            id="newPassword"
            type="password"
            autoComplete="newPassword"
            value={newPassword.value}
            helperText={newPassword.error}
            error={!!newPassword.error}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirmPassword"
            value={confirmPassword.value}
            helperText={confirmPassword.error}
            error={!!confirmPassword.error}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </form>
      </Container>
    </Section>
  );
};

ChangePassword.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  sendPasswordResetEmail: PropTypes.func.isRequired,
};

export default ChangePassword;
