import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LockIcon from '@material-ui/icons/LockOutlined';

import Header from '../../commons/header/header.component';
import SignInForm from './sign-in-form/sign-in-form.container';

import useStyles from './sign-in.styles';

const SignIn = ({ inProgress }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth="xs">
      <Header
        icon={LockIcon}
        title={t('page.signIn.title')}
        inProgress={inProgress}
        gutter
      />

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
            {t('button:forgotPassword')}
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
            {t('button:dontHaveAccount')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

SignIn.propTypes = {
  inProgress: PropTypes.bool.isRequired,
};

export default SignIn;
