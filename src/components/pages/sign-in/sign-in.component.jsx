import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LockIcon from '@material-ui/icons/LockOutlined';

import SignInForm from './sign-in-form/sign-in-form.container';
// import SocialButtons from './social-buttons/social-buttons.container';

import useStyles from './sign-in.styles';

const SignIn = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.headerBox}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography align="center" variant="h5">
          Sign In
        </Typography>
      </Box>

      <SignInForm />

      <Grid container>
        <Grid item xs>
          <Button
            color="primary"
            size="small"
            className={classes.textButton}
            component={Link}
            to="/forgot-password"
          >
            Forgot password?
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            size="small"
            className={classes.textButton}
            component={Link}
            to="/sign-up"
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </Grid>
      </Grid>

      <Typography align="center" className={classes.divider}>
        <Typography variant="body2" className={classes.dividerText}>
          or sign in with
        </Typography>
      </Typography>

      {/* <SocialButtons /> */}
    </Container>
  );
};

export default SignIn;
