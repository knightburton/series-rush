import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Section from '../../../commons/section/section.component';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../../contexts/profile';

const DangerZone = ({ requestEmailVerification, deleteProfile }) => {
  const { emailVerified } = useContext(ProfileContext);

  return (
    <Section
      title="Danger Zone"
      subtitle="manage your account existence"
    >
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Button
            color="secondary"
            disabled={emailVerified}
            onClick={requestEmailVerification}
          >
            Request Email verification
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography>
            Request a new verification to be able to use the site properly,
            if you have changed your email address recently
            or missed your previous verification email.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Confirmation
            id="delete-profile"
            title="Delete profile?"
            description="Your profile and all of your data will be removed. After this you cannot login into the application."
            onAgree={deleteProfile}
            toggle={show => (
              <Button color="secondary" onClick={show}>
                Delete Profile
              </Button>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography>
            Remove every data that is stored about you or your activity on this site,
            and permanently delete your sign in credentials as well.
          </Typography>
        </Grid>

      </Grid>
    </Section>
  );
};

DangerZone.propTypes = {
  requestEmailVerification: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

export default DangerZone;
