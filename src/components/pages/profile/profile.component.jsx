import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

import ProfilePhoto from '../../commons/profile-photo/profile-photo.component';
import Edit from '../../commons/edit/edit.component';
import Confirmation from '../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../contexts/profile';

const Profile = () => {
  const { displayName, email, photoURL } = useContext(ProfileContext);

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item>
          <ProfilePhoto size="huge" withDisabledColor />
        </Grid>
        <Grid item>
          <Edit
            id="displayName"
            value={displayName}
            valueVariant="h5"
            validationSchema={{ required: true }}
            onSubmit={() => {}}
          />
          <Edit
            id="email"
            value={email}
            valueVariant="body1"
            validationSchema={{ required: true }}
            onSubmit={() => {}}
          />
          <Edit
            type="file"
            id="photo"
            value={photoURL}
            valueVariant="body1"
            validationSchema={{ required: true }}
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
            onSubmit={() => {}}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
