import { useTranslation } from 'react-i18next';
import useForm, { Schema } from '@knightburton/react-use-form';
import Paper from '../../../core/Paper';
import Form from '../../../core/Form';
import FormText from '../../../core/FormText';
import ButtonContainer from '../../../core/ButtonContainer';
import Button from '../../../core/Button';
import { TEXT_MIN, TEXT_MAX } from '../../../../constants/validation';

export interface SecurityPasswordChangeForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = (t: (key: string, options?: object) => string): Schema<SecurityPasswordChangeForm> => [
  {
    field: 'oldPassword',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [
      { rule: TEXT_MIN(6), error: t('error:textMin', { min: 6 }) },
      { rule: TEXT_MAX(255), error: t('error:textMax', { max: 255 }) },
    ],
  },
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

const Security = (): JSX.Element => {
  const { t } = useTranslation(['common', 'translation', 'error']);

  const { fields, handleSubmit, handleChange } = useForm<SecurityPasswordChangeForm>({
    schema: schema(t),
    onSubmit: data => console.log(data),
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Paper>
        <FormText
          id="oldPassword"
          label={t('translation:account.oldPassword')}
          onChange={handleChange}
          value={fields.oldPassword.value}
          error={fields.oldPassword.error}
        />
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
      </Paper>
    </Form>
  );
};

export default Security;
