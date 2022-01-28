import { useTranslation } from 'react-i18next';
import useForm, { Schema } from '@knightburton/react-use-form';
import Paper from '../../../../core/Paper';
import Form from '../../../../core/Form';
import FormText from '../../../../core/FormText';
import ButtonContainer from '../../../../core/ButtonContainer';
import Button from '../../../../core/Button';
import Title from '../../../../core/Title';
import { useDispatch } from '../../../../../hooks/redux';
import { changePassword } from '../../../../../store/auth';
import { TEXT_MIN, TEXT_MAX } from '../../../../../constants/validation';

export interface ChangePasswordFormInterface {
  newPassword: string;
  confirmPassword: string;
}

const schema = (t: (key: string, options?: object) => string): Schema<ChangePasswordFormInterface> => [
  {
    field: 'newPassword',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [
      { rule: TEXT_MIN(6), error: t('error:textMin', { min: 6 }) },
      { rule: TEXT_MAX(255), error: t('error:textMax', { max: 255 }) },
    ],
  },
  {
    field: 'confirmPassword',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [{ rule: (value, state) => value === state.newPassword, error: t('error:confirmPassword') }],
  },
];

const ChangePasswordForm = (): JSX.Element => {
  const { t } = useTranslation(['common', 'translation', 'error']);
  const dispatch = useDispatch();

  const { fields, handleSubmit, handleChange } = useForm<ChangePasswordFormInterface>({
    schema: schema(t),
    onSubmit: data => dispatch(changePassword(data)),
  });

  return (
    <Paper>
      <Title variant="secondary">{t('translation:account.changePassword')}</Title>
      <Form onSubmit={handleSubmit}>
        <FormText
          id="newPassword"
          type="password"
          label={t('translation:account.newPassword')}
          onChange={handleChange}
          value={fields.newPassword.value}
          error={fields.newPassword.error}
        />
        <FormText
          id="confirmPassword"
          type="password"
          label={t('translation:account.confirmPassword')}
          onChange={handleChange}
          value={fields.confirmPassword.value}
          error={fields.confirmPassword.error}
        />
        <ButtonContainer align="flex-end">
          <Button onClick={() => handleSubmit()} variant="contained">
            {t('translation:account.changePassword')}
          </Button>
        </ButtonContainer>
      </Form>
    </Paper>
  );
};

export default ChangePasswordForm;
