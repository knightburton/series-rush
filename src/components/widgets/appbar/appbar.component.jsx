import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import AppBarDrawerButton from './appbar-drawer-button/appbar-drawer-button.container';
import AppBarNavigation from './appbar-navigation/appbar-navigation.component';
import AppBarProfileMenu from './appbar-profile-menu/appbar-profile-menu.container';
import ProjectTitle from '../../commons/project-title/project-title.component';

import ProfileContext from '../../../contexts/profile';

import useStyles from './appbar.styles';

const AppBar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { signedIn } = useContext(ProfileContext);
  const [profileMenu, setProfileMenu] = useState(null);

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
              component={Link}
              to="/"
              className={classes.titleLink}
            >
              <ProjectTitle withLogo />
            </Toolbar>
            {signedIn && (
              <AppBarNavigation />
            )}
          </Hidden>
          <Box className={classes.grow} />
          {signedIn ? (
            <AppBarProfileMenu
              anchor={profileMenu}
              setAnchor={setProfileMenu}
            />
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/sign-in"
            >
              {t('common:signIn')}
            </Button>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
