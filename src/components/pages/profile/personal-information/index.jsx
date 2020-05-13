import React, { useContext, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import Section from '../../../commons/section';
import ProfilePhoto from '../../../commons/profile-photo';
import Edit from '../../../commons/edit/edit.component';
import Tooltip from '../../../commons/tooltip';
import Confirmation from '../../../widgets/confirmation';

import ProfileContext from '../../../../contexts/profile';
import {
  getUpdateInProgress,
  updateName,
  updateEmail,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from '../../../../store/auth';

const PersonalInformation = () => {
  const { t } = useTranslation();
  const { displayName, firstName, lastName, email, emailVerified, photoName } = useContext(ProfileContext);
  const dispatch = useDispatch();
  const updateInProgress = useSelector(getUpdateInProgress);

  const emailLabel = useMemo(() => (
    `${t('common::email')} (${emailVerified
      ? t('common::verified')
      : t('common::notVerified')})`
  ), [emailVerified, t]);

  const handleUpdateName = useCallback(key => value => {
    dispatch(updateName(key, value));
  }, [dispatch]);

  const handleUpdateEmail = useCallback(value => {
    dispatch(updateEmail(value));
  }, [dispatch]);

  const handleUploadPhoto = useCallback(photo => {
    dispatch(uploadProfilePhoto(photo[0]));
  }, [dispatch]);

  const handleDeletePhoto = useCallback(() => {
    dispatch(deleteProfilePhoto());
  }, [dispatch]);

  return (
    <Section
      title={t('page.profile.personalInformation.title')}
      subtitle={t('page.profile.personalInformation.subtitle')}
      inProgress={updateInProgress}
    >
      <Grid container spacing={1}>
        <Grid item container xs={12} sm={6} justify="flex-start" alignItems="center" direction="column">
          <ProfilePhoto size="huge" withDisabledColor />
          <Typography variant="h5" align="center">
            {displayName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Edit
            type="text"
            id="firstName"
            label={t('common::firstName')}
            value={firstName}
            onSubmit={handleUpdateName('firstName')}
            required
          />
          <Edit
            type="text"
            id="lastName"
            label={t('common::lastName')}
            value={lastName}
            onSubmit={handleUpdateName('lastName')}
            required
          />
          <Edit
            type="text"
            id="email"
            label={emailLabel}
            value={email}
            onSubmit={handleUpdateEmail}
            required
          />
          <Edit
            type="file"
            id="photoURL"
            label={t('common::profilePhoto')}
            value={photoName}
            onSubmit={handleUploadPhoto}
            required
            secondaryButton={(
              <Confirmation
                id="delete-profile-photo"
                title={t('page.profile.personalInformation.deletePhoto')}
                description={t('page.profile.personalInformation.deleteDescription')}
                onAgree={handleDeletePhoto}
                toggle={show => (
                  <Tooltip title={t('common::delete')}>
                    <Box>
                      <IconButton onClick={() => show()} disabled={!photoName}>
                        <DeleteTwoToneIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  </Tooltip>
                )}
              />
            )}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default PersonalInformation;
