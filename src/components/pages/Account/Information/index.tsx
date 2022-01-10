import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import useForm, { Schema } from '@knightburton/react-use-form';
import Paper from '../../../core/Paper';
import Form from '../../../core/Form';
import FormText from '../../../core/FormText';
import ButtonContainer from '../../../core/ButtonContainer';
import Button from '../../../core/Button';
import Confirmation from '../../../core/Confirmation';
import { TEXT_MIN, TEXT_MAX, EMAIL } from '../../../../constants/validation';

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

const Information = (): JSX.Element => {
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper>
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Box
                  sx={({ spacing }) => ({
                    my: 1,
                    p: 0.5,
                    width: spacing(16),
                    height: spacing(16),
                    border: 1,
                    borderRadius: '50%',
                    borderStyle: 'dashed',
                    borderColor: 'text.secondary',
                  })}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'action.disabled',
                      borderRadius: '50%',
                    }}
                  >
                    <NoPhotographyOutlinedIcon color="disabled" />
                    <Typography variant="caption" color="text.secondary">
                      {t('translation:account.imageMissing')}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {t('translation:account.imageTypes')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('translation:account.imageSize')}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              <FormText
                id="firstName"
                label={t('common:firstName')}
                onChange={handleChange}
                value={fields.email.value}
                error={fields.email.error}
                autoComplete="firstName"
              />
              <FormText
                id="lastName"
                label={t('common:lastName')}
                onChange={handleChange}
                value={fields.email.value}
                error={fields.email.error}
                autoComplete="lastName"
              />
              <FormText id="email" label={t('common:email')} onChange={handleChange} value={fields.email.value} error={fields.email.error} autoComplete="email" />
              <ButtonContainer align="flex-end">
                <Button onClick={() => handleSubmit()} variant="contained">
                  {t('translation:account.save')}
                </Button>
              </ButtonContainer>
            </Paper>
          </Grid>
        </Grid>
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

export default Information;
