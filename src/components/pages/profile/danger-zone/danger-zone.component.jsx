import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Section from '../../../commons/section/section.component';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../../contexts/profile';

const DangerZone = ({ requestEmailVerification, deleteProfile }) => {
  const { t } = useTranslation();
  const { emailVerified } = useContext(ProfileContext);

  return (
    <Section
      title={t('page.profile.dangerZone.title')}
      subtitle={t('page.profile.dangerZone.subtitle')}
    >
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Button
            color="secondary"
            disabled={emailVerified}
            onClick={requestEmailVerification}
          >
            {t('page.profile.dangerZone.verificationRequest')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography>
            {t('page.profile.dangerZone.verificationDescription')}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Confirmation
            id="delete-profile"
            title={t('page.profile.dangerZone.deleteConfirmationTitle')}
            description={t('page.profile.dangerZone.deleteConfirmationDescription')}
            onAgree={deleteProfile}
            toggle={show => (
              <Button color="secondary" onClick={show}>
                {t('page.profile.dangerZone.deleteProfile')}
              </Button>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography>
            {t('page.profile.dangerZone.deleteDescription')}
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
