import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Section from '../../../commons/section/section.component';
import Form from '../../../commons/form';
import FormText from '../../../commons/form-text';
import FormButtonContainer from '../../../commons/form-button-container';
import FormButton from '../../../commons/form-button';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import {
  getPasswordInProgress,
  sendPasswordResetEmail,
  changePassword,
} from '../../../../store/auth';
import useForm from '../../../../hooks/useForm';

import { stateSchema, validationSchema } from './constants';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const inProgress = useSelector(getPasswordInProgress);
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: values => dispatch(changePassword(values)),
    resetState: true,
  });
  const { currentPassword, newPassword, confirmPassword } = state;

  const handlePasswordResetClick = useCallback(() => {
    dispatch(sendPasswordResetEmail(null, true));
  }, [dispatch]);

  return (
    <Section
      title={t('page.profile.changePassword.title')}
      subtitle={t('page.profile.changePassword.subtitle')}
      inProgress={inProgress}
    >
      <Container maxWidth="xs">
        <Form onSubmit={handleSubmit}>
          <FormText
            id="currentPassword"
            label={t('common::currentPassword')}
            autoComplete="currentPassword"
            type="password"
            value={currentPassword.value}
            error={currentPassword.error}
            onChange={handleChange}
            disabled={inProgress}
            required
          />
          <Confirmation
            id="profile-forgot-password"
            title={t('page.profile.changePassword.resetRequest')}
            description={t('page.profile.changePassword.resetDescription')}
            onAgree={handlePasswordResetClick}
            toggle={show => (
              <Box mb={2}>
                <FormButton
                  size="small"
                  variant="text"
                  color="primary"
                  disabled={inProgress}
                  label={t('page.profile.changePassword.resetRequest')}
                  onClick={show}
                />
              </Box>
            )}
          />
          <FormText
            id="newPassword"
            label={t('common::newPassword')}
            autoComplete="newPassword"
            type="password"
            value={newPassword.value}
            error={newPassword.error}
            onChange={handleChange}
            disabled={inProgress}
            required
          />
          <FormText
            id="confirmPassword"
            label={t('common::confirmPassword')}
            autoComplete="confirmPassword"
            type="password"
            value={confirmPassword.value}
            error={confirmPassword.error}
            onChange={handleChange}
            disabled={inProgress}
            required
          />
          <FormButtonContainer>
            <FormButton
              fullWidth
              submit
              variant="contained"
              color="primary"
              disabled={inProgress}
              label={t('page.profile.changePassword.title')}
            />
          </FormButtonContainer>
        </Form>
      </Container>
    </Section>
  );
};

export default ChangePassword;
