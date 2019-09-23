import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import UpIcon from '@material-ui/icons/ArrowUpwardOutlined';

import SignUpForm from './sign-up-form/sign-up-form.container';

import useStyles from './sign-up.styles';

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.headerBox}>
        <Avatar className={classes.avatar}>
          <UpIcon />
        </Avatar>
        <Typography align="center" variant="h5">
          Sign Up
        </Typography>
      </Box>

      <SignUpForm />

      <Box className={classes.buttonContainer}>
        <Button
          variant="text"
          color="primary"
          size="small"
          className={classes.signInPutton}
          component={Link}
          to="/sign-in"
        >
          Already have an account? Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
