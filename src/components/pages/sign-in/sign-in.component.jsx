import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LockIcon from '@material-ui/icons/LockOutlined';

import SignInForm from './sign-in-form/sign-in-form.container';
import SocialButtons from './social-buttons/social-buttons.container';

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

      <Typography align="center" className={classes.divider}>
        <Typography variant="body2" className={classes.dividerText}>
          or sign-in with
        </Typography>
      </Typography>

      <SocialButtons />
    </Container>
  );
};

export default SignIn;
