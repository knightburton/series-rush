import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

import Section from '../../commons/section/section.component';
import ProfilePhoto from '../../commons/profile-photo/profile-photo.component';
import Edit from '../../commons/edit/edit.component';
import Confirmation from '../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../contexts/profile';

const Profile = () => {
  const { displayName, firstName, lastName, email, photoURL } = useContext(ProfileContext);

  return (
    <Container maxWidth="md">
      <Section title="Personal Information" subtitle="update your personal informaiton">
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
              onSubmit={() => {}}
              required
            />
            <Edit
              type="text"
              id="lastName"
              label="Last Name"
              value={lastName}
              onSubmit={() => {}}
              required
            />
            <Edit
              type="text"
              id="email"
              label="Email"
              value={email}
              onSubmit={() => {}}
              required
            />
            <Edit
              type="file"
              id="photoURL"
              label="Profile Photo"
              value={photoURL}
              onSubmit={() => {}}
              required
              secondaryButton={(
                <Confirmation
                  id="delete-profile-photo"
                  title="Delete profile photo?"
                  description="Your photo will be completely removed from everywhere and will be replaced with the default avatar."
                  onAgree={() => {}}
                  toggle={show => (
                    <IconButton onClick={() => show()} disabled={!photoURL}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </Section>
    </Container>
  );
};

export default Profile;
