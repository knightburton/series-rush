import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProfilePhoto from '../../commons/profile-photo/profile-photo.component';
import Edit from '../../commons/edit/edit.component';

import ProfileContext from '../../../contexts/profile';

const Profile = () => {
  const { displayName } = useContext(ProfileContext);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item>
          <ProfilePhoto size="huge" withDisabledColor />
          <Edit
            id="displayName"
            value={displayName}
            valueVariant="h5"
            valueAlign="center"
            onSubmit={() => {}}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
