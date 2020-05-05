import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';

import FormHeader from '../../commons/form-header';
import Form from '../../commons/form';
import FormText from '../../commons/form-text';
import FormButtonContainer from '../../commons/form-button-container';
import FormButton from '../../commons/form-button';

import {
  getInProgress,
  createProfile,
} from '../../../store/auth';
import useForm from '../../../hooks/useForm';
import {
  stateSchema,
  validationSchema,
} from './constants';

const SignUp = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const inProgress = useSelector(getInProgress);
  const { state, handleChange, handleSubmit } = useForm({
    stateSchema,
    validationSchema,
    callback: form => dispatch(createProfile(form)),
  });
  const { firstName, lastName, email, password, confirmPassword } = state;

  const handleAlreadyHaveClick = useCallback(() => {
    push('sign-in');
  }, [push]);

  return (
    <Container maxWidth="xs">
      <FormHeader
        icon={ThumbUpTwoToneIcon}
        title={t('page.signUp.title')}
        inProgress={inProgress}
        gutter
      />

      <Form onSubmit={handleSubmit}>
        <FormText
          id="firstName"
          label={t('common::firstName')}
          autoComplete="firstName"
          value={firstName.value}
          error={firstName.error}
          onChange={handleChange}
          disabled={inProgress}
          required
        />
        <FormText
          id="lastName"
          label={t('common::lastName')}
          autoComplete="lastName"
          value={lastName.value}
          error={lastName.error}
          onChange={handleChange}
          disabled={inProgress}
          required
        />
        <FormText
          id="email"
          label={t('common::email')}
          autoComplete="email"
          type="email"
          value={email.value}
          error={email.error}
          onChange={handleChange}
          disabled={inProgress}
          required
        />
        <FormText
          id="password"
          label={t('common::password')}
          autoComplete="password"
          type="password"
          value={password.value}
          error={password.error}
          onChange={handleChange}
          disabled={inProgress}
          required
        />
        <FormText
          id="confirmPassword"
          label={t('common::confirmPassword')}
          autoComplete="confirmPassword"
          type="confirmPassword"
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
            color="secondary"
            disabled={inProgress}
            label={t('page.signUp.title')}
          />
        </FormButtonContainer>
      </Form>

      <FormButtonContainer variant="horizontal">
        <FormButton
          color="primary"
          disabled={inProgress}
          label={t('common::alreadyHaveAccount')}
          size="small"
          variant="text"
          onClick={handleAlreadyHaveClick}
        />
      </FormButtonContainer>
    </Container>
  );
};

export default SignUp;
