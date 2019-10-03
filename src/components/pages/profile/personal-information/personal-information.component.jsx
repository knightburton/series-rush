import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

import Section from '../../../commons/section/section.component';
import ProfilePhoto from '../../../commons/profile-photo/profile-photo.component';
import Edit from '../../../commons/edit/edit.component';
import Tooltip from '../../../commons/tooltip/tooltip.component';
import Confirmation from '../../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../../contexts/profile';

const PersonalInformation = ({ updateInProgress, updateName, updateEmail, uploadProfilePhoto, deleteProfilePhoto }) => {
  const { t } = useTranslation();
  const { displayName, firstName, lastName, email, emailVerified, photoName } = useContext(ProfileContext);

  return (
    <Section
      title={t('page.profile.personalInformation.title')}
      subtitle={t('page.profile.personalInformation.subtitle')}
      inProgress={updateInProgress}
    >
      <Grid container spacing={1}>
        <Grid item container xs={12} sm={4} justify="flex-start" alignItems="center" direction="column">
          <ProfilePhoto size="huge" withDisabledColor />
          <Typography variant="h5" align="center">
            {displayName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Edit
            type="text"
            id="firstName"
            label={t('common:firstName')}
            value={firstName}
            onSubmit={value => updateName('firstName', value)}
            required
          />
          <Edit
            type="text"
            id="lastName"
            label={t('common:lastName')}
            value={lastName}
            onSubmit={value => updateName('lastName', value)}
            required
          />
          <Edit
            type="text"
            id="email"
            label={`${t('common:email')} (${emailVerified ? t('common:verified') : t('common:notVerified')})`}
            value={email}
            onSubmit={updateEmail}
            required
          />
          <Edit
            type="file"
            id="photoURL"
            label={t('common:profilePhoto')}
            value={photoName}
            onSubmit={photo => uploadProfilePhoto(photo[0])}
            required
            secondaryButton={(
              <Confirmation
                id="delete-profile-photo"
                title={t('page.profile.personalInformation.deletePhoto')}
                description={t('page.profile.personalInformation.deleteDescription')}
                onAgree={deleteProfilePhoto}
                toggle={show => (
                  <Tooltip title={t('common:delete')}>
                    <Box>
                      <IconButton onClick={() => show()} disabled={!photoName}>
                        <DeleteIcon fontSize="small" color="error" />
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

PersonalInformation.propTypes = {
  updateInProgress: PropTypes.bool.isRequired,
  updateName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  uploadProfilePhoto: PropTypes.func.isRequired,
  deleteProfilePhoto: PropTypes.func.isRequired,
};

export default PersonalInformation;
