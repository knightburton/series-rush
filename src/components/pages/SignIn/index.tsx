import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '@knightburton/react-use-form';
import Container from '@mui/material/Container';
import { SignInCredentials } from '../../../interfaces';
import Button from '../../core/Button';
import ButtonContainer from '../../core/ButtonContainer';
import Form from '../../core/Form';
import FormText from '../../core/FormText';
import Title from '../../core/Title';
import { signIn } from '../../../store/auth';
import { useDispatch } from '../../../hooks/redux';
import { EMAIL, TEXT_MIN, TEXT_MAX } from '../../../constants/validation';

type OnSubmitCallback = (credentials: SignInCredentials) => void;

const SignIn = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onSubmit = useCallback<OnSubmitCallback>(credentials => dispatch(signIn(credentials)), [dispatch]);
  const { fields, handleChange, handleSubmit } = useForm<SignInCredentials>({
    schema: [
      { field: 'email', value: '', required: true, validators: [{ rule: EMAIL, error: t('error::email') }] },
      {
        field: 'password',
        value: '',
        required: true,
        validators: [
          { rule: TEXT_MIN(6), error: t('error::textMin', { min: 6 }) },
          { rule: TEXT_MAX(255), error: t('error::textMax', { max: 255 }) },
        ],
      },
    ],
    onSubmit,
  });

  return (
    <Container maxWidth="xs">
      <Title>{t('signIn.title')}</Title>
      <Form onSubmit={handleSubmit}>
        <FormText id="email" label={t('common::email')} onChange={handleChange} value={fields.email.value} error={fields.email.error} />
        <FormText id="password" label={t('common::password')} onChange={handleChange} value={fields.password.value} error={fields.password.error} type="password" />
        <ButtonContainer align="flex-end">
          <Button type="submit" variant="contained">
            {t('signIn.title')}
          </Button>
          <Button color="secondary">{t('forgotPassword.title')}</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignIn;
