import Grid from '@mui/material/Grid';
import ChangePasswordForm from './ChangePasswordForm';
import EmalVerificationForm from './EmalVerificationForm';
import PrivacyForm from './PrivacyForm';

const Security = (): JSX.Element => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <EmalVerificationForm />
      <ChangePasswordForm />
    </Grid>
    <Grid item xs={12} md={8}>
      <PrivacyForm />
    </Grid>
  </Grid>
);

export default Security;
