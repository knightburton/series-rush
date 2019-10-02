import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Section from '../../../commons/section/section.component';

import useForm from '../../../../hooks/useForm';

import useStyles from './change-password.styles';
import { STATE_SCHEMA, VALIDATION_SCHEMA } from './change-password.constants';

const ChangePassword = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(STATE_SCHEMA, VALIDATION_SCHEMA, () => {});
  const { currentPassword, newPassword, confirmPassword } = state;

  return (
    <Section
      title="Change Password"
      subtitle="change your account password"
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

export default ChangePassword;
