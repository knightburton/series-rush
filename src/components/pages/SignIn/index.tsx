import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '@knightburton/react-use-form';
import Container from '@mui/material/Container';
import { SignInCredentials } from 'interfaces';
import Button from 'components/core/Button';
import ButtonContainer from 'components/core/ButtonContainer';
import Form from 'components/core/Form';
import FormText from 'components/core/FormText';
import Title from 'components/core/Title';
import { getIsLoading, signIn } from 'store/auth';
import { useDispatch, useSelector } from 'hooks/redux';
import { EMAIL, TEXT_MIN, TEXT_MAX } from 'constants/validation';

type OnSubmitCallback = (credentials: SignInCredentials) => void;

const SignIn = (): JSX.Element => {
  const { t } = useTranslation(['common', 'alert', 'core']);
  const dispatch = useDispatch();
  const isLoading = useSelector<boolean>(getIsLoading);
  const onSubmit = useCallback<OnSubmitCallback>(credentials => dispatch(signIn(credentials)), [dispatch]);
  const { fields, handleChange, handleSubmit } = useForm<SignInCredentials>({
    schema: [
      { field: 'email', value: '', required: true, validators: [{ rule: EMAIL, error: t('alert:email') }] },
      {
        field: 'password',
        value: '',
        required: true,
        validators: [
          { rule: TEXT_MIN(6), error: t('alert:textMin', { min: 6 }) },
          { rule: TEXT_MAX(255), error: t('alert:textMax', { max: 255 }) },
        ],
      },
    ],
    onSubmit,
  });

  return (
    <Container maxWidth="xs">
      <Title>{t('core:signIn.title')}</Title>
      <Form onSubmit={handleSubmit}>
        <FormText
          id="email"
          label={t('common:email')}
          onChange={handleChange}
          value={fields.email.value}
          error={fields.email.error}
          autoComplete="email"
          disabled={isLoading}
        />
        <FormText
          id="password"
          label={t('common:password')}
          onChange={handleChange}
          value={fields.password.value}
          error={fields.password.error}
          type="password"
          autoComplete="password"
          disabled={isLoading}
        />
        <ButtonContainer align="flex-end">
          <Button type="submit" variant="contained" loading={isLoading}>
            {t('core:signIn.title')}
          </Button>
          <Button color="secondary" disabled={isLoading}>
            {t('core:forgotPassword.title')}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignIn;
