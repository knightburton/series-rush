import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
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
  const { displayName, firstName, lastName, email, emailVerified, photoName } = useContext(ProfileContext);

  return (
    <Section
      title="Personal Information"
      subtitle="update your personal informaiton"
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
            label="First Name"
            value={firstName}
            onSubmit={value => updateName('firstName', value)}
            required
          />
          <Edit
            type="text"
            id="lastName"
            label="Last Name"
            value={lastName}
            onSubmit={value => updateName('lastName', value)}
            required
          />
          <Edit
            type="text"
            id="email"
            label={`Email (${emailVerified ? 'Verified' : 'Not Verified'})`}
            value={email}
            onSubmit={updateEmail}
            required
          />
          <Edit
            type="file"
            id="photoURL"
            label="Profile Photo"
            value={photoName}
            onSubmit={photo => uploadProfilePhoto(photo[0])}
            required
            secondaryButton={(
              <Confirmation
                id="delete-profile-photo"
                title="Delete profile photo?"
                description="Your photo will be completely removed from everywhere and will be replaced with the default avatar."
                onAgree={deleteProfilePhoto}
                toggle={show => (
                  <Tooltip title="Delete photo">
                    <IconButton onClick={() => show()} disabled={!photoName}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
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
