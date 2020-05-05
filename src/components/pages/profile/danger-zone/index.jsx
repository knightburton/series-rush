import React, { useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Section from '../../../commons/section/section.component';
import Confirmation from '../../../widgets/confirmation';

import ProfileContext from '../../../../contexts/profile';
import {
  requestEmailVerification,
  deleteProfile,
} from '../../../../store/auth';

const DangerZone = () => {
  const { t } = useTranslation();
  const { emailVerified } = useContext(ProfileContext);
  const dispatch = useDispatch();

  const handleRequestVerificationClick = useCallback(() => {
    dispatch(requestEmailVerification());
  }, [dispatch]);

  const handleDeleteClick = useCallback(() => {
    dispatch(deleteProfile());
  }, [dispatch]);

  return (
    <Section
      title={t('page.profile.dangerZone.title')}
      subtitle={t('page.profile.dangerZone.subtitle')}
    >
      <Grid container spacing={2}>

        <Grid item xs={12} sm={5}>
          <Button
            color="secondary"
            disabled={emailVerified}
            onClick={handleRequestVerificationClick}
          >
            {t('page.profile.dangerZone.verificationRequest')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography>
            {t('page.profile.dangerZone.verificationDescription')}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Confirmation
            id="delete-profile"
            title={t('page.profile.dangerZone.deleteConfirmationTitle')}
            description={t('page.profile.dangerZone.deleteConfirmationDescription')}
            onAgree={handleDeleteClick}
            toggle={show => (
              <Button color="secondary" onClick={show}>
                {t('page.profile.dangerZone.deleteProfile')}
              </Button>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography>
            {t('page.profile.dangerZone.deleteDescription')}
          </Typography>
        </Grid>

      </Grid>
    </Section>
  );
};

export default DangerZone;
