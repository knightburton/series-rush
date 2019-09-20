import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import LockIcon from '@material-ui/icons/LockOutlined';

import SignInForm from './sign-in-form/sign-in-form.container';

import useStyles from './sign-in.styles';

const SignIn = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.avatarBox}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
      </Box>

      <SignInForm />
    </Container>
  );
};

export default SignIn;
