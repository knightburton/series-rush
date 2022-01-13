import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useForm, { Schema } from '@knightburton/react-use-form';
import Form from '../../../../core/Form';
import FormText from '../../../../core/FormText';
import ButtonContainer from '../../../../core/ButtonContainer';
import Button from '../../../../core/Button';
import Confirmation from '../../../../core/Confirmation';
import { TEXT_MIN, TEXT_MAX, EMAIL } from '../../../../../constants/validation';

export interface InformationForm {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = (t: (key: string, options?: object) => string): Schema<InformationForm> => [
  {
    field: 'firstName',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [
      { rule: TEXT_MIN(3), error: t('error:textMin', { min: 3 }) },
      { rule: TEXT_MAX(255), error: t('error:textMax', { max: 255 }) },
    ],
  },
  {
    field: 'lastName',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [
      { rule: TEXT_MIN(3), error: t('error:textMin', { min: 3 }) },
      { rule: TEXT_MAX(255), error: t('error:textMax', { max: 255 }) },
    ],
  },
  {
    field: 'email',
    value: '',
    required: true,
    requiredError: t('error:required'),
    validators: [{ rule: EMAIL, error: t('error:email') }],
  },
];

const PersonalForm = () => {
  const { t } = useTranslation(['common', 'translation', 'error']);
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = useCallback<() => void>(() => setOpen(true), []);
  const handleAgree = useCallback<() => void>(() => setOpen(false), []);
  const handleDisagree = useCallback<() => void>(() => setOpen(false), []);
  const { fields, handleSubmit, handleChange } = useForm<InformationForm>({
    schema: schema(t),
    onSubmit,
  });

  return (
    <>
      <Form>
        <FormText
          id="firstName"
          label={t('common:firstName')}
          onChange={handleChange}
          value={fields.email.value}
          error={fields.email.error}
          autoComplete="firstName"
        />
        <FormText id="lastName" label={t('common:lastName')} onChange={handleChange} value={fields.email.value} error={fields.email.error} autoComplete="lastName" />
        <FormText id="email" label={t('common:email')} onChange={handleChange} value={fields.email.value} error={fields.email.error} autoComplete="email" />
        <ButtonContainer align="flex-end">
          <Button onClick={() => handleSubmit()} variant="contained">
            {t('translation:account.save')}
          </Button>
        </ButtonContainer>
      </Form>
      <Confirmation
        id="update-account"
        title={t('translation:account.updateInformation')}
        description={t('translation:account.updateInformationDescription')}
        onAgree={handleAgree}
        onDisagree={handleDisagree}
        open={open}
      />
    </>
  );
};

export default PersonalForm;
