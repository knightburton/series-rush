import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import UpIcon from '@material-ui/icons/ArrowUpwardOutlined';

import Header from '../../commons/header/header.component';
import SignUpForm from './sign-up-form/sign-up-form.container';

import useStyles from './sign-up.styles';

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Header icon={UpIcon} title="Sign Up" gutter />

      <SignUpForm />

      <Box className={classes.buttonContainer}>
        <Button
          variant="text"
          color="primary"
          size="small"
          className={classes.signInButton}
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
