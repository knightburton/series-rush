import Grid from '@mui/material/Grid';
import ChangePasswordForm from './ChangePasswordForm';
import EmalVerificationForm from './EmalVerificationForm';

const Security = (): JSX.Element => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <EmalVerificationForm />
    </Grid>
    <Grid item xs={12} md={8}>
      <ChangePasswordForm />
    </Grid>
  </Grid>
);

export default Security;
