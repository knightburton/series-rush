import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import FormHeader from '../../commons/form-header';
import Form from '../../commons/form';
import FormText from '../../commons/form-text';
import FormButtonContainer from '../../commons/form-button-container';
import FormButton from '../../commons/form-button';

import {
  getInProgress,
  signIn,
} from '../../../store/auth';
import useForm from '../../../hooks/useForm';
import { stateSchema, validationSchema } from './constants';

const SignIn = () => {
  const dispatch = useDispatch();
  const inProgress = useSelector(getInProgress);
  const { push } = useHistory();
  const { t } = useTranslation();
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: credentials => dispatch(signIn(credentials)),
  });
  const { email, password } = state;

  const handleForgotPasswordClick = useCallback(() => {
    push('/forgot-password');
  }, [push]);

  const handleSignUpClick = useCallback(() => {
    push('/sign-up');
  }, [push]);

  return (
    <Container maxWidth="xs">

      <FormHeader
        icon={LockTwoToneIcon}
        title={t('page.signIn.title')}
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
        <FormText
          id="password"
          label={t('common::password')}
          autoComplete="current-password"
          type="password"
          value={password.value}
          error={password.error}
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

      <FormButtonContainer variant="horizontal" align="space">
        <FormButton
          color="primary"
          disabled={inProgress}
          label={t('common::forgotPassword')}
          size="small"
          variant="text"
          onClick={handleForgotPasswordClick}
        />
        <FormButton
          color="primary"
          disabled={inProgress}
          label={t('common::dontHaveAccount')}
          size="small"
          variant="text"
          onClick={handleSignUpClick}
        />
      </FormButtonContainer>

    </Container>
  );
};

export default SignIn;
