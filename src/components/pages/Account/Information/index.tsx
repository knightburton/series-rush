import Grid from '@mui/material/Grid';
import PhotoForm from './PhotoForm';
import PersonalForm from './PersonalForm';

const Information = (): JSX.Element => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <PhotoForm />
    </Grid>
    <Grid item xs={12} md={8}>
      <PersonalForm />
    </Grid>
  </Grid>
);

export default Information;
