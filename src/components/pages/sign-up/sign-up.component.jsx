import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import UpIcon from '@material-ui/icons/ArrowUpwardOutlined';

import Header from '../../commons/header/header.component';
import SignUpForm from './sign-up-form/sign-up-form.container';

import useStyles from './sign-up.styles';

const SignUp = ({ inProgress }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Header
        icon={UpIcon}
        title="Sign Up"
        inProgress={inProgress}
        gutter
      />

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

SignUp.propTypes = {
  inProgress: PropTypes.bool.isRequired,
};

export default SignUp;
