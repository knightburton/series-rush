import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';

// import DeleteIcon from '@material-ui/icons/DeleteOutline';

import Section from '../../commons/section/section.component';
import ProfilePhoto from '../../commons/profile-photo/profile-photo.component';
import Edit from '../../commons/edit/edit.component';
// import Confirmation from '../../widgets/confirmation/confirmation.component';

import ProfileContext from '../../../contexts/profile';

const Profile = () => {
  const { firstName, lastName, email } = useContext(ProfileContext);

  return (
    <Container maxWidth="md">
      <Section title="Personal Information" subtitle="update your personal informaiton">
        <Grid container spacing={1}>
          <Grid item>
            <ProfilePhoto size="huge" withDisabledColor />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Section>
    </Container>
  );
};

export default Profile;
