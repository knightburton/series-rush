import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import Form from '../../commons/form';
import FormHeader from '../../commons/form-header';
import FormText from '../../commons/form-text';
import FormButtonContainer from '../../commons/form-button-container';
import FormButton from '../../commons/form-button';

import {
  getInProgress,
  sendPasswordResetEmail,
} from '../../../store/auth';
import useForm from '../../../hooks/useForm';
import { APP_PATHS } from '../../../constants/paths';
import { stateSchema, validationSchema } from './constants';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const inProgress = useSelector(getInProgress);
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: ({ email }) => dispatch(sendPasswordResetEmail(email)),
  });
  const { email } = state;

  const handleAlreadyHaveClick = useCallback(() => {
    push(APP_PATHS.SIGN_IN.path);
  }, [push]);

  return (
    <Container maxWidth="xs">
      <FormHeader
        icon={LockTwoToneIcon}
        title={t('page.forgotPassword.title')}
        inProgress={inProgress}
        gutter
      />

      <Form onSubmit={handleSubmit}>
        <FormText
          id="email"
          label={t('common::email')}
          autoComplete="email"
          type="email"
          value={email.value}
          error={email.error}
          onChange={handleChange}
          disabled={inProgress}
        />
        <FormButtonContainer>
          <FormButton
            fullWidth
            submit
            color="secondary"
            disabled={inProgress}
            label={t('common::signIn')}
          />
        </FormButtonContainer>
      </Form>

      <FormButtonContainer>
        <FormButton
          color="primary"
          size="small"
          variant="text"
          disabled={inProgress}
          label={t('common::alreadyHaveAccount')}
          onClick={handleAlreadyHaveClick}
        />
      </FormButtonContainer>
    </Container>
  );
};

export default ForgotPassword;
