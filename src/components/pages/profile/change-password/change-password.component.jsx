import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Section from '../../../commons/section/section.component';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import useForm from '../../../../hooks/useForm';

import useStyles from './change-password.styles';
import { stateSchema, validationSchema } from './change-password.constants';

const ChangePassword = ({ inProgress, sendPasswordResetEmail, changePassword }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: changePassword,
    resetState: true,
  });
  const { currentPassword, newPassword, confirmPassword } = state;

  return (
    <Section
      title={t('page.profile.changePassword.title')}
      subtitle={t('page.profile.changePassword.subtitle')}
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
            label={t('common:currentPassword')}
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
            title={t('page.profile.changePassword.resetRequest')}
            description={t('page.profile.changePassword.resetDescription')}
            onAgree={() => sendPasswordResetEmail(null, true)}
            toggle={show => (
              <Button
                color="primary"
                size="small"
                className={classes.forgot}
                onClick={show}
              >
                {t('button:forgotPassword')}
              </Button>
            )}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="newPassword"
            label={t('common:newPassword')}
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
            label={t('common:confirmPassword')}
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
            {t('button:changePassword')}
          </Button>
        </form>
      </Container>
    </Section>
  );
};

ChangePassword.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  sendPasswordResetEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default ChangePassword;
