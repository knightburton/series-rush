import React, { useContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import AppBarDrawerButton from './app-bar-drawer-button';
import AppBarNavigation from './app-bar-navigation';
import AppBarProfileMenu from './app-bar-profile-menu';
import ProjectTitle from '../../commons/project-title';

import ProfileContext from '../../../contexts/profile';
import { APP_PATHS } from '../../../constants/paths';

import useStyles from './styles';

const AppBar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { signedIn } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(null);

  const handleTitleClick = useCallback(() => {
    navigate(APP_PATHS.LANDING.path);
  }, [navigate]);

  const handleSignInClick = useCallback(() => {
    navigate(APP_PATHS.SIGN_IN.path);
  }, [navigate]);

  return (
    <MuiAppBar position="fixed" className={classes.base}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {signedIn && (
            <AppBarDrawerButton />
          )}
          <Hidden smDown>
            <Toolbar
              disableGutters
              onClick={handleTitleClick}
              className={classes.titleLink}
            >
              <ProjectTitle withLogo />
            </Toolbar>
            {signedIn && (
              <AppBarNavigation />
            )}
          </Hidden>
          <Box display="flex" flex={1} />
          {signedIn ? (
            <AppBarProfileMenu
              anchor={profileMenu}
              setAnchor={setProfileMenu}
            />
          ) : (
            <Button
              color="inherit"
              onClick={handleSignInClick}
            >
              {t('common::signIn')}
            </Button>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
