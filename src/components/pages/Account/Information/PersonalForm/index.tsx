import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useForm, { Schema } from '@knightburton/react-use-form';
import Stack from '@mui/material/Stack';
import Paper from '../../../../core/Paper';
import Title from '../../../../core/Title';
import Form from '../../../../core/Form';
import FormText from '../../../../core/FormText';
import Button from '../../../../core/Button';
import Confirmation from '../../../../core/Confirmation';
import { useSelector, useDispatch } from '../../../../../hooks/redux';
import { getUser, getInProgressByType, updateProfileBase, User, ProgressTypes } from '../../../../../store/auth';
import { TEXT_MIN, TEXT_MAX, EMAIL } from '../../../../../constants/validation';

export interface InformationForm {
  displayName: string;
  email: string;
}

const schema = (t: (key: string, options?: object) => string, user: User | null): Schema<InformationForm> => [
  {
    field: 'displayName',
    value: user?.displayName || '',
    required: true,
    requiredError: t('error:required'),
    validators: [
      { rule: TEXT_MIN(3), error: t('error:textMin', { min: 3 }) },
      { rule: TEXT_MAX(255), error: t('error:textMax', { max: 255 }) },
    ],
  },
  {
    field: 'email',
    value: user?.email || '',
    required: true,
    requiredError: t('error:required'),
    validators: [{ rule: EMAIL, error: t('error:email') }],
  },
];

const PersonalForm = () => {
  const { t } = useTranslation(['common', 'translation', 'error']);
  const [open, setOpen] = useState<boolean>(false);
  const [formHasChnaged, setFormHasChanged] = useState<boolean>(false);
  const [data, setData] = useState<InformationForm>({ displayName: '', email: '' });
  const dispatch = useDispatch();
  const user = useSelector<User | null>(getUser);
  const inProgress = useSelector<boolean>(getInProgressByType(ProgressTypes.BaseUpdate));

  const onSubmit = useCallback<(validatedData: InformationForm) => void>(validatedData => {
    setData(validatedData);
    setOpen(true);
  }, []);
  const handleAgree = useCallback<() => void>(() => {
    setOpen(false);
    dispatch(updateProfileBase(data));
    setData({ displayName: '', email: '' });
  }, [data, dispatch]);
  const handleDisagree = useCallback<() => void>(() => setOpen(false), []);
  const { fields, handleSubmit, handleChange, updateSchema } = useForm<InformationForm>({
    schema: schema(t, user),
    onSubmit,
  });
  const handleCancelClick = useCallback(() => {
    updateSchema(schema(t, user));
  }, [updateSchema, t, user]);

  useEffect(() => {
    setFormHasChanged(fields.displayName.value !== user?.displayName || fields.email.value !== user?.email);
  }, [fields, user]);

  return (
    <Paper>
      <Title variant="secondary">{t('translation:account.personal')}</Title>
      <Form onSubmit={handleSubmit}>
        <FormText
          id="displayName"
          label={t('common:displayName')}
          onChange={handleChange}
          value={fields.displayName.value}
          error={fields.displayName.error}
          autoComplete="displayName"
          disabled={inProgress}
        />
        <FormText
          id="email"
          label={t('common:email')}
          onChange={handleChange}
          value={fields.email.value}
          error={fields.email.error}
          autoComplete="email"
          disabled={inProgress}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
          {formHasChnaged && (
            <Button onClick={handleCancelClick} variant="contained" color="warning" disabled={inProgress}>
              {t('translation:account.cancelEdit')}
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={!formHasChnaged} loading={inProgress}>
            {t('translation:account.save')}
          </Button>
        </Stack>
      </Form>
      <Confirmation
        id="update-account"
        title={t('translation:account.updateInformation')}
        description={t('translation:account.updateInformationDescription')}
        onAgree={handleAgree}
        onDisagree={handleDisagree}
        open={open}
      />
    </Paper>
  );
};

export default PersonalForm;
