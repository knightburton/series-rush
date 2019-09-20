import React from 'react';

import Container from '@material-ui/core/Container';

import SignInForm from './sign-in-form/sign-in-form.container';

const SignIn = () => (
  <Container maxWidth="xs">
    <SignInForm />
  </Container>
);

export default SignIn;
