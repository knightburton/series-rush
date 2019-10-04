import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppBarDrawerButton from './appbar-drawer-button/appbar-drawer-button.container';
import AppBarProfileMenu from './appbar-profile-menu/appbar-profile-menu.container';
import QuickSearch from '../quick-search/quick-search.component';
import ProjectTitle from '../../commons/project-title/project-title.component';

import ProfileContext from '../../../contexts/profile';

import useStyles from './appbar.styles';

const AppBar = ({ isDrawerOpened }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { signedIn } = useContext(ProfileContext);
  const [profileMenu, setProfileMenu] = useState(null);

  const appBar = clsx(classes.base, {
    [classes.appBar]: signedIn,
    [classes.appBarShift]: signedIn && isDrawerOpened,
  });

  return (
    <MuiAppBar position="fixed" className={appBar}>
      <Toolbar>
        {signedIn && (
          <AppBarDrawerButton />
        )}
        {!signedIn && (
          <ProjectTitle withLogo />
        )}
        {signedIn && (
          <QuickSearch />
        )}
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
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  isDrawerOpened: PropTypes.bool.isRequired,
};

export default AppBar;
