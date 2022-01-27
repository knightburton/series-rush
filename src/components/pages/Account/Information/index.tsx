import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Paper from '../../../core/Paper';
import Title from '../../../core/Title';
import PhotoForm from './PhotoForm';
import PersonalForm from './PersonalForm';

const Information = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper>
          <Title variant="secondary">{t('account.image')}</Title>
          <PhotoForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper>
          <Title variant="secondary">{t('account.personal')}</Title>
          <PersonalForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Information;
